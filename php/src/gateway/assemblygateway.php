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
    private $selectSQL = "SELECT assembly_part.part_id, assembly_part.serial_number, assembly_part.name, assembly_part.notes, assembly_part.quantity, assembly_part.low_warning, assembly_part.order_url
        FROM assembly_part";

    /**
     * setSelectSQL
     * 
     * Appends content to the end of the Assembly Part Select SQL query.
     * 
     * @param string $selectSQL the sql to be appended
     */
    private function setSelectSQL($selectSQL)
    {
        $this->selectSQL .= $selectSQL;
    }

    /**
     * getSelectSQL
     * 
     * Gets the Assembly Part Select SQL query.
     * 
     * @return string the Assembly Part Select SQL query
     */
    private function getSelectSQL()
    {
        return $this->selectSQL;
    }

    /**
     * queryAssemblyParts
     * 
     * Executes the SQL query to select, insert or delete from the assembly part table then sets the result.
     * 
     * @param string $sql    the SQL query to execute
     * @param array  $params the array of params for the SQL PDO prepared statement
     */
    private function queryAssemblyParts($sql, $params)
    {
        $result = $this->getDatabase()->executeSQL($sql, $params);
        $this->setResult($result);
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
        $this->setSelectSQL(" ORDER BY $orderBy");
        $this->queryAssemblyParts($this->getSelectSQL(), $params);
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
        $this->setSelectSQL(" WHERE assembly_part.part_id = :id");
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
        $this->setSelectSQL(" WHERE assembly_part.serial_number LIKE :serialNumber");
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
        $this->setSelectSQL(" WHERE assembly_part.name LIKE :name");
        $this->retrieveAssemblyParts(["name" => "%$name%"]);
    }

    /**
     * addStock
     * 
     * Adds stock quantity for a specific assembly part id.
     * 
     * @param string $partID   the part ID whose quantity value is to be added to
     * @param string $quantity the amount of stock to add to the current stock level
     */
    public function addStock($partID, $quantity)
    {
        $sql = "UPDATE assembly_part SET quantity = quantity + :quantity WHERE part_id = :partID";
        $params = [":quantity" => $quantity, ":partID" => $partID];
        $this->queryAssemblyParts($sql, $params);
    }

    /**
     * removeStock
     * 
     * Subtracts stock quantity for a specific assembly part id.
     * 
     * @param string $partID   the part ID whose quantity value is to be subtracted
     * @param string $quantity the amount of stock to subtract from the current stock level
     */
    public function removeStock($partID, $quantity)
    {
        $sql = "UPDATE assembly_part SET quantity = quantity - :quantity WHERE part_id = :partID";
        $params = [":quantity" => $quantity, ":partID" => $partID];
        $this->queryAssemblyParts($sql, $params);
    }

    /**
     * modifyStock
     * 
     * Adds or subtracts stock quantity for a specific assembly part id.
     * 
     * @param string $partID   the part ID whose quantity value is to be modified
     * @param string $quantity the amount of stock to add or subtract from the current stock level
     * @param bool   $isAdd    boolean to state whether the modification type is "add" or not ("remove")
     */
    public function modifyStock($partID, $quantity, $isAdd)
    {
        $sql = "UPDATE assembly_part";

        if ($isAdd) {
            $sql .= " SET quantity = quantity + :quantity";
        } else {
            $sql .= " SET quantity = quantity - :quantity";
        }

        $sql .= " WHERE part_id = :partID";
        $params = [":quantity" => $quantity, ":partID" => $partID];
        $this->queryAssemblyParts($sql, $params);
    }
}
