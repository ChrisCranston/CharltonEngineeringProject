<?php

/**
 * storageGateway
 * 
 *  storage gateway extends Gateway and formats and performs SQL queries.
 * 
 * @author Chris Ewart - w18012997
 */
class storageReportGateway extends Gateway
{
    private $sql = "SELECT storage.storage_id , storage.quantity, client.client_name, storage_location.warehouse_number, storage_location.location_string, storage_location.storage_type, storage_part.part_id, storage_part.name, storage_part.description 
    FROM storage  
    LEFT JOIN client on (storage.client_id = client.client_id) 
    LEFT JOIN storage_location on (storage.location_id = storage_location.storage_location_id) 
    LEFT JOIN storage_part on (storage_part.part_id = storage.part_id)";

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
     * Finds all storage items on the storage table, ordered by surname and sets the result in the class variable. 
     */
    public function findAll()
    {
        $this->sql .= " ORDER by storage.storage_id;";
        $result = $this->getDatabase()->executeSQL($this->sql);
        $this->setResult($result);
    }

    public function getWareHouseNumbers()
    {
        $this->sql = "SELECT DISTINCT warehouse_number from storage_location
        ORDER by warehouse_number;";
        $result = $this->getDatabase()->executeSQL($this->sql);
        $this->setResult($result);
    }

    public function getClientNames()
    {
        $this->sql = "SELECT client_name from client
        Order by client_name;";
        $result = $this->getDatabase()->executeSQL($this->sql);
        $this->setResult($result);
    }
    /**
     * findOne
     *
     * Searches the storage table by the supplied storage_id returns one result, and sets the result in the class variable. 
     * @param  int $id - The storage ID to search by. 
     */
    public function findOne($id)
    {
        $this->sql .= " WHERE storage_id = :id ORDER by storage.storage_id;";
        $params = ["id" => $id];
        $result = $this->getDatabase()->executeSQL($this->sql, $params);
        $this->setResult($result);
    }
}
