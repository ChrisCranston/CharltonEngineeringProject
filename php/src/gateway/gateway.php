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
     * Returns the databsae stored in the class variables.
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
}
