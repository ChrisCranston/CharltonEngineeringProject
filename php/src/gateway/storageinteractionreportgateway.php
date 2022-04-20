<?php

/**
 * StoredGateway
 * 
 *  Stored gateway extends Gateway and formats and performs SQL queries.
 * 
 * @author Chris Ewart - w18012997
 */
class StorageInteractionReportGateway extends Gateway
{
    private $sql = "SELECT interaction_id, storage_interaction.amount, storage_part.description, warehouse_number, location_string, storage_type, storage_part.name, firstname, lastname, storage_interaction.interaction_datetime, email_address
    FROM storage_interaction
    JOIN storage ON storage_interaction.storage_id = storage.storage_id
    JOIN storage_location ON storage.location_id = storage_location.storage_location_id
    JOIN storage_part on storage.part_id = storage_part.part_id
    JOIN user ON storage_interaction.user_id = user.user_id";

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
        $this->sql .= " ORDER by interaction_datetime;";
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
        $this->sql .= " WHERE interaction_id = :id ORDER by interaction_datetime;";
        $params = ["id" => $id];
        $result = $this->getDatabase()->executeSQL($this->sql, $params);
        $this->setResult($result);
    }
}
