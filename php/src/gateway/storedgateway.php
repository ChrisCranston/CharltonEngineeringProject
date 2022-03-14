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
        $sql = "SELECT storage_location.storage_location_id, storage_location.storage_location_id, storage_location.warehouse_number, storage_location.location_string, storage_location.storage_type, storage.quantity, storage_part.serial_number,  client.client_name, qr_code.qr_code_string FROM storage_location LEFT JOIN storage on (storage_location.storage_location_id = storage.location_id) LEFT JOIN client on (storage.client_id = client.client_id) LEFT JOIN storage_part on (storage.part_id = storage_part.part_id) LEFT JOIN qr_code on (storage_location.qr_id = qr_code.qr_id) ORDER BY storage_location.warehouse_number, storage_location.location_string ";
        $result = $this->getDatabase()->executeSQL($sql);
        $this->setResult($result);
    }
    public function findAllLocationWithEmpty()
    {
        $sql = "SELECT storage_location.storage_location_id, storage_location.storage_location_id, storage_location.warehouse_number, storage_location.location_string, storage_location.storage_type, storage.quantity, storage_part.serial_number,  client.client_name, qr_code.qr_code_string FROM storage_location LEFT JOIN storage on (storage_location.storage_location_id = storage.location_id) LEFT JOIN client on (storage.client_id = client.client_id) LEFT JOIN storage_part on (storage.part_id = storage_part.part_id) LEFT JOIN qr_code on (storage_location.qr_id = qr_code.qr_id) WHERE storage.quantity <= 0 OR storage.quantity IS NULL ORDER BY storage_location.warehouse_number, storage_location.location_string ";
        $result = $this->getDatabase()->executeSQL($sql);
        $this->setResult($result);
    }

    public function findAllLocationWithWarehouse($warehouse)
    {
        $sql = "SELECT storage_location.storage_location_id, storage_location.storage_location_id, storage_location.warehouse_number, storage_location.location_string, storage_location.storage_type, storage.quantity, storage_part.serial_number,  client.client_name, qr_code.qr_code_string FROM storage_location LEFT JOIN storage on (storage_location.storage_location_id = storage.location_id) LEFT JOIN client on (storage.client_id = client.client_id) LEFT JOIN storage_part on (storage.part_id = storage_part.part_id) LEFT JOIN qr_code on (storage_location.qr_id = qr_code.qr_id) WHERE storage_location.warehouse_number = :warehouse ORDER BY storage_location.warehouse_number, storage_location.location_string ";
        $params = ["warehouse" => $warehouse];
        $result = $this->getDatabase()->executeSQL($sql,$params);
        $this->setResult($result);
    }

    public function findAllLocationWithWarehouseWithEmpty($warehouse)
    {
        $sql = "SELECT storage_location.storage_location_id, storage_location.storage_location_id, storage_location.warehouse_number, storage_location.location_string, storage_location.storage_type, storage.quantity, storage_part.serial_number,  client.client_name, qr_code.qr_code_string FROM storage_location LEFT JOIN storage on (storage_location.storage_location_id = storage.location_id) LEFT JOIN client on (storage.client_id = client.client_id) LEFT JOIN storage_part on (storage.part_id = storage_part.part_id) LEFT JOIN qr_code on (storage_location.qr_id = qr_code.qr_id) WHERE (storage.quantity <= 0 OR storage.quantity IS NULL) AND storage_location.warehouse_number = :warehouse  ORDER BY storage_location.warehouse_number, storage_location.location_string ";
        $params = ["warehouse" => $warehouse];
        $result = $this->getDatabase()->executeSQL($sql,$params);
        $this->setResult($result);
    }

    public function findAllPart()
    {
        $sql = "SELECT storage_part.part_id, storage_part.serial_number, storage_part.name, storage_part.description, storage_part.qr_id,  storage.quantity, qr_code.qr_code_string FROM storage_part LEFT JOIN storage on (storage_part.part_id = storage.part_id) LEFT JOIN qr_code on (storage_part.qr_id = qr_code.qr_id)  ORDER by storage_part.serial_number";
        $result = $this->getDatabase()->executeSQL($sql);
        $this->setResult($result);
    }
    public function findPartToAdd()
    {
        $sql = "SELECT  storage_part.part_id, storage_part.serial_number  FROM storage_part";
        $result = $this->getDatabase()->executeSQL($sql);
        $this->setResult($result);
    }
    public function findClientToAdd()
    {
        $sql = "SELECT  client.client_name FROM client";
        $result = $this->getDatabase()->executeSQL($sql);
        $this->setResult($result);
    }


    public function addPartToLocation($addLocation, $addClient, $addSerial, $addQuantity, $user_id)
    {

        $sql1 = "SELECT client_id from client WHERE client_name = :client";
        $params1 = ["client" => $addClient];
        $result1 = $this->getDatabase()->executeSQL2($sql1, $params1);
        $clientToAdd = (string)$result1[0][0];
        

        $sql2 = "SELECT part_id from storage_part WHERE serial_number = :serial";
        $params2 = ["serial" => $addSerial];
        $result2 = $this->getDatabase()->executeSQL2($sql2, $params2);
        $partToAdd = (string)$result2[0][0];

        $sql2 = "SELECT storage_id from storage WHERE location_id = :location_id";
        $params2 = ["location_id" => $addLocation];
        $result2 = $this->getDatabase()->executeSQL2($sql2, $params2);
        

        if(!empty($result2)) {
        $storage_id = (string)$result2[0][0];
        $sql3 = "UPDATE storage SET quantity = :addQuantity,  client_id= :addClient, part_id= :addPart WHERE storage.location_id = :addLocation ";
        $params3 = ["addQuantity" => $addQuantity, "addLocation" => $addLocation, "addClient" => $clientToAdd, "addPart" => $partToAdd ];
        $result3 = $this->getDatabase()->executeSQL($sql3, $params3);
        } else {
        $sql3 = "INSERT INTO storage ( quantity, client_id, part_id, location_id)  VALUES (:addQuantity, :addClient, :addPart, :addLocation)";
        $params3 = ["addQuantity" => $addQuantity, "addLocation" => $addLocation, "addClient" => $clientToAdd, "addPart" => $partToAdd ];
        $result3 = $this->getDatabase()->executeSQL($sql3, $params3);
        }

        
        $sql2 = "SELECT storage_id from storage WHERE location_id = :location_id";
        $params2 = ["location_id" => $addLocation];
        $result2 = $this->getDatabase()->executeSQL2($sql2, $params2);
        $storage_id = (string)$result2[0][0];
        

        $sql4 = "INSERT INTO storage_interaction (storage_id, user_id, amount, interaction_datetime) VALUES (:storageID,:user_id, :amount, datetime() )";
        $params4 = ["storageID" => $storage_id, "user_id" => $user_id, "amount" => $addQuantity ];
        $result4 = $this->getDatabase()->executeSQL($sql4, $params4);
        $this->setResult($result4);

    }

    public function addQuantity($location, $quantity, $user_id)
    {
        $sql = "UPDATE storage SET quantity = quantity + :newQuantity WHERE storage.location_id = :location_id ";
        $params = ["newQuantity" => $quantity, "location_id" => $location];
        $result = $this->getDatabase()->executeSQL($sql, $params);
        
        $sql2 = "SELECT storage_id from storage WHERE location_id = :location_id";
        $params2 = ["location_id" => $location];
        $result2 = $this->getDatabase()->executeSQL2($sql2, $params2);
        $storage_id = (string)$result2[0][0];
        

        $sql3 = "INSERT INTO storage_interaction (storage_id, user_id, amount, interaction_datetime) VALUES (:storageID,:user_id, :amount, datetime() )";
        $params3 = ["storageID" => $storage_id, "user_id" => $user_id, "amount" => $quantity ];
        $result3 = $this->getDatabase()->executeSQL($sql3, $params3);
        $this->setResult($result);

    }

    public function removeQuantity($location, $quantity, $user_id)
    {
        $sql = "UPDATE storage SET quantity = quantity - :newQuantity WHERE storage.location_id = :location_id ";
        $params = ["newQuantity" => $quantity, "location_id" => $location];
        $result = $this->getDatabase()->executeSQL($sql, $params);

        $sql2 = "SELECT storage_id from storage WHERE location_id = :location_id";
        $params2 = ["location_id" => $location];
        $result2 = $this->getDatabase()->executeSQL2($sql2, $params2);
        $storage_id = (string)$result2[0][0];

        $quantity = $quantity - $quantity - $quantity;

        $sql3 = "INSERT INTO storage_interaction (storage_id, user_id, amount, interaction_datetime) VALUES (:storageID,:user_id, :amount, datetime() )";
        $params3 = ["storageID" => $storage_id, "user_id" => $user_id, "amount" => $quantity ];
        $result3 = $this->getDatabase()->executeSQL($sql3, $params3);
        $this->setResult($result);
    }
    public function addPart($name, $serialNumber, $description)
    {
        $sql1 = "SELECT MAX(qr_id)+1 from qr_code";
        $result1 = $this->getDatabase()->executeSQL2($sql1);
        $resultaltered = (int)$result1[0][0];

        $sql2 = "INSERT INTO storage_part (serial_number, name, description, qr_id) VALUES (:serialnumber, :name, :description, :qr_id)";
        $params = ["serialnumber" => $serialNumber, "name" => $name, "description" => $description, "qr_id" => $resultaltered];
        $result2 = $this->getDatabase()->executeSQL($sql2, $params);

        $sql3 = "SELECT part_id from storage_part WHERE serial_number = :serialnumber";
        $params2 = ["serialnumber" => $serialNumber];
        $result3 = $this->getDatabase()->executeSQL2($sql3, $params2);
        $prefix = "serial_number=";
        $suffix = (string)$result3[0][0];
        $prefixaltered = $prefix . $suffix ;

        $sql4 = "INSERT INTO qr_code (qr_code_string) VALUES (:qrcodestring)";
        $params3 = ["qrcodestring" => $prefixaltered];
        $result4 = $this->getDatabase()->executeSQL($sql4, $params3);
        $this->setResult($result4);   
          
    }

    public function addLocation($warehouse, $location, $type)
    {
        $sql1 = "SELECT MAX(qr_id)+1 from qr_code";
        $result1 = $this->getDatabase()->executeSQL2($sql1);
        $resultaltered = (int)$result1[0][0];

        $sql2 = "INSERT INTO storage_location (warehouse_number, Location_string, storage_type, qr_id) VALUES (:warehouse, :location, :type, :qr_id)";
        $params = ["warehouse" => $warehouse, "location" => $location, "type" => $type, "qr_id" => $resultaltered];
        $result2 = $this->getDatabase()->executeSQL($sql2, $params);

        $sql3 = "SELECT storage_location_id from storage_location WHERE warehouse_number = :warehouse AND location_string = :location AND storage_type = :type";
        $params2 = ["warehouse" => $warehouse, "location" => $location, "type" => $type];
        $result3 = $this->getDatabase()->executeSQL2($sql3, $params2);
        $prefix = "location=";
        $suffix = (string)$result3[0][0];
        $prefixaltered = $prefix . $suffix ;

        $sql4 = "INSERT INTO qr_code (qr_code_string) VALUES (:qrcodestring)";
        $params3 = ["qrcodestring" => $prefixaltered];
        $result4 = $this->getDatabase()->executeSQL($sql4, $params3);
        $this->setResult($result4);   
          
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
