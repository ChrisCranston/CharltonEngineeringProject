<?php

/**
 * StoredGateway
 * 
 *  Stored gateway extends Gateway and formats and performs SQL queries.
 * 
 * @author Chris Ewart - w18012997
 */
class AssemblyReportGateway extends Gateway
{
    private $sql = "SELECT part_id, serial_number, name, notes, quantity, low_warning, order_url
    FROM assembly_part";

    /**
     * __construct
     *
     * Constructor of the gateway, set's the database value
     */
    public function __construct()
    {
        $this->setDatabase(DATABASE);
    }

    /**
     * findAll
     *
     * Finds all stored items on the stored table, ordered by surname and sets the result in the class variable. 
     */
    public function findAll()
    {
        $this->sql .= " ORDER by name;";
        $result = $this->getDatabase()->executeSQL($this->sql);
        $this->setResult($result);
    }

    /**
     * findOne
     *
     * Searches the stored table by the supplied stored_id returns one result, and sets the result in the class variable. 
     * @param  int $id - The stored ID to search by. 
     */
    public function findOne($id)
    {
        $this->sql .= " WHERE part_id = :id ORDER by name;";
        $params = ["id" => $id];
        $result = $this->getDatabase()->executeSQL($this->sql, $params);
        $this->setResult($result);
    }
}
