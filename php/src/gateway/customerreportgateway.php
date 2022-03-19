<?php

/**
 * storageGateway
 * 
 *  storage gateway extends Gateway and formats and performs SQL queries.
 * 
 * @author Chris Ewart - w18012997
 */
class customerReportGateway extends Gateway
{
    private $sql = "SELECT query_id, date_time, name, prospective_client_type, query_type_name, email, phone_number, query
        FROM prospective_client_query 
        JOIN prospective_client_type on prospective_client_query.prospective_client_type_id = prospective_client_type.prospective_client_type_id
        JOIN query_type on prospective_client_query.query_type_id = query_type.query_type_id";

    /**
     * __construct
     *
     * Constructor of the gateway, set's the database value
     */
    public function __construct()
    {
        $this->setDatabase(CUSTOMER_DATABASE);
    }

    /**
     * findAll
     *
     * Finds all storage items on the storage table, ordered by surname and sets the result in the class variable. 
     */
    public function findAll()
    {
        $this->sql .= " ORDER by query_id";
        $result = $this->getDatabase()->executeSQL($this->sql);
        $this->setResult($result);
    }

    public function clientTypes()
    {
        $this->sql = "SELECT prospective_client_type FROM prospective_client_type";
        $result = $this->getDatabase()->executeSQL($this->sql);
        $this->setResult($result);
    }

    public function queryTypes()
    {
        $this->sql = "SELECT query_type_name FROM query_type;";
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
        $this->sql .= " WHERE query_id = :id ORDER by query_id;";
        $params = ["id" => $id];
        $result = $this->getDatabase()->executeSQL($this->sql, $params);
        $this->setResult($result);
    }
}
