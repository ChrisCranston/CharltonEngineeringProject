<?php

/**
 * StoredGateway
 * 
 *  Stored gateway extends Gateway and formats and performs SQL queries.
 * 
 * @author Chris Ewart - w18012997
 */
class AssemblyInteractionReportGateway extends Gateway
{
    private $sql = "SELECT interaction_id, serial_number, assembly_part.name, amount, firstname, lastname, interaction_datetime, email_address
    FROM assembly_interaction
    JOIN assembly_part on assembly_interaction.part_id = assembly_part.part_id
    JOIN user on assembly_interaction.user_id = user.user_id";

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

    public function getUserNames()
    {
        $this->sql = "SELECT email_address from user
        ORDER by email_address;";
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
