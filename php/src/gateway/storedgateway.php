<?php

/**
 * StoredGateway
 * 
 *  Stored gateway extends Gateway and formats and performs SQL queries.
 * 
 * @author Chris Cranston - W18018468
 */
class StoredGateway extends Gateway
{
    private $sql = "SELECT stored.stored_id , stored.quantity, stored.serial_number, client.client_name, storage_location.warehouse_number, storage_location.location_string, storage_location.storage_type FROM stored  LEFT JOIN client on (stored.client_id = client.client_id) LEFT JOIN storage_location on (stored.location_id = storage_location.storage_location_id) ";

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
        $this->sql .= " ORDER by stored.stored_id";
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
        $this->sql .= " WHERE stored_id = :id ORDER by stored.stored_id";
        $params = ["id" => $id];
        $result = $this->getDatabase()->executeSQL($this->sql, $params);
        $this->setResult($result);
    }
}
