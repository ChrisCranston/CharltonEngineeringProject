<?php

/**
 * Gateway
 * 
 * The abstract core Gateway class used as a template for all other gateway's. 
 * 
 * @author Team 2 - Chris Cranston, Christopher Ewart, Kess Strongman, Stephen Campbell, Matthew Dawson
 */
abstract class Gateway
{

    private $database;
    private $result;

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
     * setDatabase
     * 
     * Sets the database to be used in queries. 
     *
     * @param  mixed $database - The target database file
     */
    protected function setDatabase($database)
    {
        $this->database = new Database($database);
    }

    /**
     * getDatabase
     * 
     * Returns the database stored in the class variables.
     *
     * @return object $this->database - The database stored in the class variable.
     */
    protected function getDatabase()
    {
        return $this->database;
    }

    /**
     * setResult
     * 
     * Sets the result variable with the passed in result.
     *
     * @param  mixed $result - The result to be set
     */
    protected function setResult($result)
    {
        $this->result = $result;
    }

    /**
     * getResult
     * 
     * Returns the result stored in the class variable.
     *
     * @return object $this->result - The result currently stored in the variable. 
     */
    public function getResult()
    {
        return $this->result;
    }

    /**
     * executeSQL
     * 
     * Executes the SQL query to select, insert or delete from a table and then sets the result.
     * 
     * @param string $sql    the SQL query to execute
     * @param array  $params the array of params for the SQL PDO prepared statement
     */
    protected function executeSQL($sql, $params)
    {
        $result = $this->getDatabase()->executeSQL($sql, $params);
        $this->setResult($result);
    }
}
