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
        $sql = "SELECT * FROM storage";
        $result = $this->getDatabase()->executeSQL($sql);
        $this->setResult($result);
    }

    public function findAllLocation()
    {
        $sql = "SELECT storage_location.storage_location_id, storage_location.warehouse_number, storage_location.location_string, storage_location.storage_type, storage.quantity, storage_part.serial_number,  client.client_name, qr_code.qr_code_string FROM storage_location LEFT JOIN storage on (storage_location.storage_location_id = storage.location_id) LEFT JOIN client on (storage.client_id = client.client_id) LEFT JOIN storage_part on (storage.part_id = storage_part.part_id) LEFT JOIN qr_code on (storage_location.qr_id = qr_code.qr_id) ORDER BY storage_location.warehouse_number, storage_location.location_string ";
        $result = $this->getDatabase()->executeSQL($sql);
        $this->setResult($result);
    }
    public function findAllLocationWithEmpty()
    {
        $sql = "SELECT storage_location.storage_location_id, storage_location.warehouse_number, storage_location.location_string, storage_location.storage_type, storage.quantity, storage_part.serial_number,  client.client_name, qr_code.qr_code_string FROM storage_location LEFT JOIN storage on (storage_location.storage_location_id = storage.location_id) LEFT JOIN client on (storage.client_id = client.client_id) LEFT JOIN storage_part on (storage.part_id = storage_part.part_id) LEFT JOIN qr_code on (storage_location.qr_id = qr_code.qr_id) WHERE storage.quantity <= 0 OR storage.quantity IS NULL ORDER BY storage_location.warehouse_number, storage_location.location_string ";
        $result = $this->getDatabase()->executeSQL($sql);
        $this->setResult($result);
    }

    public function findAllLocationWithWarehouse($warehouse)
    {
        $sql = "SELECT storage_location.storage_location_id, storage_location.warehouse_number, storage_location.location_string, storage_location.storage_type, storage.quantity, storage_part.serial_number,  client.client_name, qr_code.qr_code_string FROM storage_location LEFT JOIN storage on (storage_location.storage_location_id = storage.location_id) LEFT JOIN client on (storage.client_id = client.client_id) LEFT JOIN storage_part on (storage.part_id = storage_part.part_id) LEFT JOIN qr_code on (storage_location.qr_id = qr_code.qr_id) WHERE storage_location.warehouse_number = :warehouse ORDER BY storage_location.warehouse_number, storage_location.location_string ";
        $params = ["warehouse" => $warehouse];
        $result = $this->getDatabase()->executeSQL($sql,$params);
        $this->setResult($result);
    }

    public function findAllLocationWithWarehouseWithEmpty($warehouse)
    {
        $sql = "SELECT storage_location.storage_location_id, storage_location.warehouse_number, storage_location.location_string, storage_location.storage_type, storage.quantity, storage_part.serial_number,  client.client_name, qr_code.qr_code_string FROM storage_location LEFT JOIN storage on (storage_location.storage_location_id = storage.location_id) LEFT JOIN client on (storage.client_id = client.client_id) LEFT JOIN storage_part on (storage.part_id = storage_part.part_id) LEFT JOIN qr_code on (storage_location.qr_id = qr_code.qr_id) WHERE (storage.quantity <= 0 OR storage.quantity IS NULL) AND storage_location.warehouse_number = :warehouse  ORDER BY storage_location.warehouse_number, storage_location.location_string ";
        $params = ["warehouse" => $warehouse];
        $result = $this->getDatabase()->executeSQL($sql,$params);
        $this->setResult($result);
    }

    public function findAllPart()
    {
        $sql = "SELECT  storage_part.serial_number, storage_part.name, storage_part.description, storage_part.qr_id,  storage.quantity, qr_code.qr_code_string FROM storage_part LEFT JOIN storage on (storage_part.part_id = storage.part_id) LEFT JOIN qr_code on (storage_part.qr_id = qr_code.qr_id)  ORDER by storage_part.serial_number";
        $result = $this->getDatabase()->executeSQL($sql);
        $this->setResult($result);
    }

    public function addQuantity($location, $quantity)
    {
        $sql = "UPDATE storage SET quantity = quantity + :newQuantity WHERE storage.location_id = :location_id ";
        $params = ["newQuantity" => $quantity, "location_id" => $location];
        $result = $this->getDatabase()->executeSQL($sql, $params);
        $this->setResult($result);
    }

    public function removeQuantity($location, $quantity)
    {
        $sql = "UPDATE storage SET quantity = quantity - :newQuantity WHERE storage.location_id = :location_id ";
        $params = ["newQuantity" => $quantity, "location_id" => $location];
        $result = $this->getDatabase()->executeSQL($sql, $params);
        $this->setResult($result);
    }

    /**
     * findOne
     *
     * Searches the stored table by the supplied stored_id returns one result, and sets the result in the class variable. 
     * @param  int $id - The stored ID to search by. 
     */
    // public function findOneSerialNumber($serialNumber)
    // {
    //     $this->sql .= " WHERE storage_part.serial_number = :serialNumber ORDER by stored.stored_id";
    //     $params = ["serialNumber" => $serialNumber];
    //     $result = $this->getDatabase()->executeSQL($this->sql, $params);
    //     $this->setResult($result);
    // }
}
