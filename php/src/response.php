<?php


/**
 * Response
 * 
 * Abstract response class used to form the basis of the JSON responses.
 * 
 * @author Team 2 - Chris Cranston, Christopher Ewart, Kess Strongman, Stephen Campbell, Matthew Dawson
 */
abstract class Response
{
    protected $data;
    
    /**
     * __construct
     * 
     * Constructor for the reponse class.
     */
    public function __construct()
    {
        $this->headers();
    }
    
    /**
     * headers
     * 
     * Blank initialisation function to ensure use in extended classes.
     */
    protected function headers()
    {
    }
    
    /**
     * setData
     * 
     * sets the class variable data with the supplied data.
     *
     * @param  object $data - The data to be set in the variable.
     */
    public function setData($data)
    {
        $this->data = $data;
    }
    
    /**
     * getData
     * 
     * Returns the data currently stored in the class's data variable.
     *
     * @return object $this->data - The data currently stored in the class's data variable.
     */
    public function getData()
    {
        return $this->data;
    }
}
