<?php

/**
 * CustomerQueryGateway
 * 
 *  This gateway extends Gateway and formats and performs SQL queries.
 * 
 * @author Kess Strongman
 */
class CustomerQueryGateway extends Gateway
{

    //variations of the SQL query to insert
    private $pcqsql = "INSERT INTO  prospective_client_query (date_time, _name, prospective_client_type_id, email, phone_number, _query, query_type_id)";
    
    //Excludes Email
    private $pcqsql_nE = "INSERT INTO  prospective_client_query (date_time, _name, prospective_client_type_id, phone_number, _query, query_type_id)";
   
    //Excludes Phone number
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
     * searches the query_type table to return all the different types, aka enquiry or review.
     */
    public function getQueryTypes()
    {
        $this->sql = "SELECT query_type_id, query_type_name FROM query_type";
        $result = $this->getDatabase()->executeSQL($this->sql);
      
        $this->setResult($result);
    }
    /**
     * GetClientTypes
     *
     * Finds the different types of client, aka business or individual
     */
    public function getClientTypes()
    {
        $this->sql = "SELECT prospective_client_type_id, prospective_client_type FROM prospective_client_type";
        $result = $this->getDatabase()->executeSQL($this->sql);
        $this->setResult($result);
    }
    /**
     * GetReviews
     *
     * Returns the date and querys where the query type is review
     * The idea is that there could be a section on the site that shows previous customer reviews
     */
    public function getReviews()
    {
        $this->sql = "SELECT date_time, _query FROM prospective_client_query WHERE query_type_id = 3";
        $result = $this->getDatabase()->executeSQL($this->sql);
        $this->setResult($result);
    }

     /**
     * GetEverything
     *
     * This returns all the data in the main table.
     * Mostly this was helpful for development.
     */
    public function getEverything()
    {
        $this->sql = "SELECT * FROM prospective_client_query";
        $result = $this->getDatabase()->executeSQL($this->sql);
        $this->setResult($result);
    }



    /**
     * addQueryWAll
     *
     * This will add a query where all the fields have been filled by the customer
     * @param  int $querytypeid -  the type of query the user is submitting
     * @param string $query - the query submitted by the customer
     * @param string $phonenumber - including the country code
     * @param string $email - the user's email, checked to be in the correct format
     * @param int $businessoption - the client type
     * @param string $name - the user's input name
     * @param string $datatime - the current time at which the query has been submitted
     * 
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
     * This will add the query where all the fields except Email have been submitted
     * @param  int $querytypeid -  the type of query the user is submitting
     * @param string $query - the query submitted by the customer
     * @param string $phonenumber - including the country code
     * @param int $businessoption - the client type
     * @param string $name - the user's input name
     * @param string $datatime - the current time at which the query has been submitted
     *  
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
     * This will add the query where all the fields except phonenumber have been filled
     * @param  int $querytypeid -  the type of query the user is submitting
     * @param string $query - the query submitted by the customer
     * @param string $email - the user's email, checked to be in the correct format
     * @param int $businessoption - the client type
     * @param string $name - the user's input name
     * @param string $datatime - the current time at which the query has been submitted
     *  
     */
    public function addQueryWOPhonenumber($datetime, $name, $businessoption, $email, $query, $querytypeid)
    {
        $this->pcqsql_np .= " VALUES (:date_time, :name, :business_individual, :email, :query, :query_type_id)";
        $params = ["date_time" => $datetime, "name" => $name, "business_individual" => $businessoption, "email" => $email, "query" => $query, "query_type_id" => $querytypeid];
        $result = $this->getDatabase()->executeSQL($this->pcqsql_nP, $params);
    }
}
