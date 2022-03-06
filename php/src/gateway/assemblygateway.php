<?php

/**
 * AssemblyGateway
 * 
 *  Assembly gateway extends Gateway and formats and performs SQL queries for the assembly_part and assembly_interaction tables.
 * 
 * @author Matthew Dawson - W18002221
 */
class AssemblyGateway extends Gateway
{
    private $selectPartSQL = "SELECT assembly_part.part_id, assembly_part.serial_number, assembly_part.name,
        assembly_part.notes, assembly_part.quantity, assembly_part.low_warning, assembly_part.order_url
        FROM assembly_part";

    private $createPartSQL = "INSERT INTO assembly_part (name, serial_number, quantity, notes, low_warning, order_url)
        VALUES (:name, :serial_number, :quantity, :notes, :low_warning, :order_url)";

    private $editPartSQL = "UPDATE assembly_part";

    private $deletePartSQL = "DELETE FROM assembly_part WHERE assembly_part.part_id = :partID";

    private $createInteractionSQL = "INSERT INTO assembly_interaction (part_id, user_id, amount, interaction_datetime)
        VALUES (:partID, :userID, :amount, datetime())";

    private $deleteInteractionSQL = "DELETE FROM assembly_interaction WHERE assembly_interaction.part_id = :partID";

    /**
     * setSelectPartSQL
     * 
     * Appends content to the end of the select part SQL query.
     * 
     * @param string $selectPartSQL the sql to be appended
     */
    private function setSelectPartSQL($selectPartSQL)
    {
        $this->selectPartSQL .= $selectPartSQL;
    }

    /**
     * setEditPartSQL
     * 
     * Appends content to the end of the edit part SQL query
     * 
     * @param string $editPartSQL the sql to be appended
     */
    private function setEditPartSQL($editPartSQL)
    {
        $this->editPartSQL .= $editPartSQL;
    }

    /**
     * getSelectPartSQL
     * 
     * Gets the select part SQL query.
     * 
     * @return string the select part SQL query.
     */
    private function getSelectPartSQL()
    {
        return $this->selectPartSQL;
    }

    /**
     * getCreatePartSQL
     * 
     * Gets the create part SQL query.
     * 
     * @return string the create part SQL query.
     */
    private function getCreatePartSQL()
    {
        return $this->createPartSQL;
    }


    /**
     * getEditPartSQL
     * 
     * Gets the edit part SQL query
     * 
     * @return string the edit part SQL query
     */
    private function getEditPartSQL()
    {
        return $this->editPartSQL;
    }

    /**
     * getDeletePartSQL
     * 
     * Gets the delete part SQL query
     * 
     * @return string the delete part SQL query
     */
    private function getDeletePartSQL()
    {
        return $this->deletePartSQL;
    }

    /**
     * getCreateInteractionSQL
     * 
     * Gets the Create Interaction Insert SQL query.
     * 
     * @return string the Interaction Insert SQL query
     */
    private function getCreateInteractionSQL()
    {
        return $this->createInteractionSQL;
    }

    /**
     * getDeleteInteractionSQL
     * 
     * Gets the Delete Interaction Insert SQL query.
     * 
     * @return string the Interaction Insert SQL query
     */
    private function getDeleteInteractionSQL()
    {
        return $this->deleteInteractionSQL;
    }


    /**
     * retrieveAssemblyParts
     * 
     * Adds the ORDER BY clause to the end of the constructed Assembly Part Select SQL query,
     * executes the constructed Assembly Part Select SQL query,
     * and then returns the result.
     * 
     * The ORDER BY is not hardcoded into setAssemblyPartSQL to improve modularity and allow
     * for future modifications. The ORDER BY is instead added at the end before execution
     * to ensure it comes after any WHERE clauses.
     * 
     * A default empty $params array is present for executions with no parameters.
     * A default $orderBy column name is provided, which is used for most queries, but allows
     * change if necessary.
     * 
     * @param array  $params the array of params for the Assembly Part Select SQL PDO prepared statement
     * @param string $orderBy the column to order the results by
     */
    private function retrieveAssemblyParts($params = [], $orderBy = "assembly_part.part_id")
    {
        $this->setSelectPartSQL(" ORDER BY $orderBy");
        $this->executeSQL($this->getSelectPartSQL(), $params);
    }

    /**
     * editPart
     * 
     * Adds the WHERE clause to the end of the constructed edit part SQL query so that the
     * specific part can be modified, executes the constructed query, and then returns the result.
     * 
     * @param array $params the array of params for the edit part SQL PDO prepared statement
     */
    private function editPart($params)
    {
        $this->setEditPartSQL(" WHERE assembly_part.part_id = :part_id");
        $this->executeSQL($this->getEditPartSQL(), $params);
    }

    /**
     * insertInteraction
     * 
     * Inserts a new interaction into the assembly_interaction table to record which user has
     * added or removed stock, how much they have added or removed, and the datetime that
     * it was added/removed.
     * 
     * @param int    $partID the array of params for the Assembly Part Select SQL PDO prepared statement
     * @param string $orderBy the column to order the results by
     */
    private function insertInteraction($partID, $userID, $amount)
    {
        $params = ["partID" => $partID, "userID" => $userID, "amount" => $amount];
        $this->executeSQL($this->getCreateInteractionSQL(), $params);
    }

    /**
     * findAll
     *
     * Finds all part items in the assembly_part table, ordered by serial_number and sets the result in the class variable. 
     */
    public function findAll()
    {
        $this->retrieveAssemblyParts();
    }

    /**
     * findOne
     *
     * Searches the assembly_part table using the supplied part_id, returns a single assembly part, and sets the result.
     *  
     * @param int $id The assembly part ID to search by. 
     */
    public function findOne($id)
    {
        $this->setSelectPartSQL(" WHERE assembly_part.part_id = :id");
        $this->retrieveAssemblyParts(["id" => $id]);
    }

    /**
     * findBySerialNumber
     * 
     * Retrieves assembly parts that match a provided serial number search string.
     * 
     * The query uses LIKE with % to check for partial matches to the search string.
     * 
     * @param string $serialNumber the serial number string used to find the paper
     */
    public function findBySerialNumber($serialNumber)
    {
        $this->setSelectPartSQL(" WHERE assembly_part.serial_number LIKE :serialNumber");
        $this->retrieveAssemblyParts(["serialNumber" => "%$serialNumber%"]);
    }

    /**
     * findByPartName
     * 
     * Retrieves assembly parts that match a provided part name search string.
     * 
     * The query uses LIKE with % to check for partial matches to the search string.
     * 
     * @param string $name the part name string used to find the paper
     */
    public function findByPartName($name)
    {
        $this->setSelectPartSQL(" WHERE assembly_part.name LIKE :name");
        $this->retrieveAssemblyParts(["name" => "%$name%"]);
    }

    /**
     * createPart
     * 
     * Creates a new part with a base stock value and adds it to the database.
     * 
     * @param array $partDetails array of part details used to create the new part
     * @param int   $userID      the user ID of the user who is creating the new part
     */
    public function createPart($partDetails, $userID)
    {
        $serialNumber = $partDetails["serial_number"];
        $this->executeSQL($this->getCreatePartSQL(), $partDetails);

        $findBySerialNumberGateway = new AssemblyGateway();
        $findBySerialNumberGateway->findBySerialNumber($serialNumber);
        $createdPart = $findBySerialNumberGateway->getResult()[0];

        $this->insertInteraction($createdPart["part_id"], $userID, $createdPart["quantity"]);
    }

    /**
     * editPartDetails
     * 
     * Edits an existing part's details.
     * 
     * @param array $partDetails array of part details used to edit the part
     */
    public function editPartDetails($partDetails)
    {
        $this->setEditPartSQL(" SET name = :name, serial_number = :serial_number, notes = :notes, low_warning = :low_warning, order_url = :order_url");
        $this->editPart($partDetails);
    }

    /**
     * deletePart
     * 
     * Deletes a part from the database.
     * 
     * @param int $partID the part ID of the part to be deleted
     */
    public function deletePart($partID)
    {
        $params = ["partID" => $partID];
        $this->executeSQL($this->getDeletePartSQL(), $params);
        $this->executeSQL($this->getDeleteInteractionSQL(), $params);
    }


    /**
     * addOrRemoveStock
     * 
     * Adds or subtracts stock quantity for a specific assembly part id and adds an interaction to the assembly_interaction database.
     * 
     * @param array $stockDetails array featuring the part ID the quantity, and the modification type ("add" or "remove")
     * @param int   $userID   the user ID of the user who is modifying the stock
     */
    public function addOrRemoveStock($stockDetails, $userID)
    {
        $isAdd = $stockDetails["modificationType"] === "add";

        $partID = $stockDetails["part_id"];
        $quantity = $stockDetails["quantity"];

        if ($isAdd) {
            $this->setEditPartSQL(" SET quantity = quantity + :quantity");
        } else {
            $this->setEditPartSQL(" SET quantity = quantity - :quantity");
        }

        $params = ["quantity" => $quantity, "part_id" => $partID];
        $this->editPart($params);
        $this->insertInteraction($partID, $userID, $isAdd ? $quantity : -$quantity);
    }
}
