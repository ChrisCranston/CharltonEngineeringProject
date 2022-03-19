<?php

/**
 * StoredGateway
 * 
 *  Stored gateway extends Gateway and formats and performs SQL queries.
 * 
 * @author Chris Cranston + Kess Strongman
 */
class CustomerQueryGateway extends Gateway
{
    private $pcqsql = "INSERT INTO  prospective_client_query (date_time, _name, prospective_client_type_id, email, phone_number, _query, query_type_id)";
    private $pcqsql_nE = "INSERT INTO  prospective_client_query (date_time, _name, prospective_client_type_id, phone_number, _query, query_type_id)";
    private $pcqsql_nP = "INSERT INTO  prospective_client_query (date_time, _name, prospective_client_type_id, email, _query, query_type_id)";
  
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
     * GetQueryTypes
     *
     * Finds all stored items on the stored table, ordered by surname and sets the result in the class variable. 
     */
    public function getQueryTypes()
    {
        $this->sql = "SELECT query_type_id, query_type_name FROM query_type";
        $result = $this->getDatabase()->executeSQL($this->sql);
        $this->setResult($result);
    }

    public function getClientTypes()
    {
        $this->sql = "SELECT prospective_client_type_id, prospective_client_type FROM prospective_client_type";
        $result = $this->getDatabase()->executeSQL($this->sql);
        $this->setResult($result);
    }

    public function getEverything()
    {
        $this->sql = "SELECT * FROM prospective_client_query";
        $result = $this->getDatabase()->executeSQL($this->sql);
        $this->setResult($result);
    }



    /**
     * addQueryWAll
     *
     * This will add the query with if all the fields have been filled
     * @param  int $id -  
     */
    public function addQueryWAll($datetime, $name, $businessoption, $email, $phonenumber, $query, $querytypeid)
    {
        $this->pcqsql .= " VALUES (:date_time, :name, :business_individual, :email, :phone_number, :query, :query_type_id)";
        $params = ["date_time" => $datetime, "name" => $name, "business_individual" => $businessoption, "email" => $email, "phone_number" => $phonenumber, "query" => $query, "query_type_id" => $querytypeid];
        $result = $this->getDatabase()->executeSQL($this->pcqsql, $params);
        $this->setResult($result);
    }

     /**
     * addQueryWOEmail
     *
     * This will add the query with if all the fields except Email have been submitted
     * @param  int $id -  
     */
    public function addQueryWOEmail($datetime, $name, $businessoption, $phonenumber, $query, $querytypeid)
    {
        $this->pcqsql_nE .= " VALUES (:date_time, :name, :business_individual, :phone_number, :query, :query_type_id)";
        $params = ["date_time" => $datetime, "name" => $name, "business_individual" => $businessoption, "phone_number" => $phonenumber, "query" => $query, "query_type_id" => $querytypeid];
        $result = $this->getDatabase()->executeSQL($this->pcqsql_nE, $params);
    }

     /**
     * addQueryWOphonenumber
     *
     * This will add the query with if all the fields except phonenumber have been filled
     * @param  int $id -  
     */
    public function addQueryWOPhonenumber($datetime, $name, $businessoption, $email, $query, $querytypeid)
    {
        $this->pcqsql_np .= " VALUES (:date_time, :name, :business_individual, :email, :query, :query_type_id)";
        $params = ["date_time" => $datetime, "name" => $name, "business_individual" => $businessoption, "email" => $email, "query" => $query, "query_type_id" => $querytypeid];
        $result = $this->getDatabase()->executeSQL($this->pcqsql_nP, $params);
    }
}
