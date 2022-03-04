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
    private $assemblyPartSQL = "SELECT assembly_part.part_id, assembly_part.serial_number, assembly_part.name, assembly_part.notes, assembly_part.quantity, assembly_part.low_warning, assembly_part.order_url
        FROM assembly_part";

    /**
     * setAssemblyPartSQL
     * 
     * Appends content to the end of the Assembly Part SQL query.
     * 
     * @param string $assemblyPartSQL the sql to be appended
     */
    private function setAssemblyPartSQL($assemblyPartSQL)
    {
        $this->assemblyPartSQL .= $assemblyPartSQL;
    }

    /**
     * getAssemblySQL
     * 
     * Gets the Assembly Part SQL query.
     * 
     * @return string the Assembly Part SQL query
     */
    private function getAssemblyPartSQL()
    {
        return $this->assemblyPartSQL;
    }

    /**
     * retrieveAssemblyParts
     * 
     * Adds the ORDER BY clause to the end of the constructed Assembly Part SQL query,
     * Executes the constructed Assembly Part SQL query,
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
     * @param array  $params the array of params for the Assembly Part SQL PDO prepared statement
     * @param string $orderBy the column to order the results by
     */
    private function retrieveAssemblyParts($params = [], $orderBy = "assembly_part.part_id")
    {
        $this->setAssemblyPartSQL(" ORDER BY $orderBy");
        $result = $this->getDatabase()->executeSQL($this->getAssemblyPartSQL(), $params);
        $this->setResult($result);
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
        $this->setAssemblyPartSQL(" WHERE assembly_part_id = :id");
        $this->retrieveAssemblyParts(["id" => $id]);
    }
}
