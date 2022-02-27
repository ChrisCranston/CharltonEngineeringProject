<?php

/**
 * Controller
 * 
 * The base controller class provides core functionality used by the other controllers.
 * 
 * @author Team 2 - Chris Cranston, Christopher Ewart, Kess Strongman, Stephen Campbell, Matthew Dawson
 */
abstract class Controller
{

    private $request;
    private $reponse;
    protected $gateway;

    /**
     * __construct
     * 
     * Constructs the controller class.
     *
     * @param  object $request - The request created when constructing the controllers.
     * @param  object $response  - The response created when constructing the controllers.
     */
    public function __construct($request, $response)
    {
        $this->setGateway();
        $this->setRequest($request);
        $this->setResponse($response);
        $data = $this->processRequest();
        $this->getResponse()->setData($data);
    }

    /**
     * setRequest
     *
     * Sets the class's request variable.
     * 
     * @param  object $request - The contents to set the variable to.
     * @return object
     */
    private function setRequest($request)
    {
        $this->request = $request;
    }

    /**
     * getRequest
     * 
     * Returns the request stored in the class variable.
     *
     * @return object - The current request stored in the class. 
     */
    protected function getRequest()
    {
        return $this->request;
    }

    /**
     * setResponse
     * 
     * Sets the response variable in the class.
     *
     * @param  object $response - The contents to store in the variable.
     */
    private function setResponse($response)
    {
        $this->response = $response;
    }

    /**
     * getResponse
     * 
     * Returns the request stored in the class variable.
     *
     * @return object - The current response stored in the class. 
     */
    protected function getResponse()
    {
        return $this->response;
    }

    /**
     * setGateway
     * 
     * Abstract function declaration of setGateway to ensure creation by extended classes.
     */
    protected function setGateway()
    {
    }

    /**
     * getGateway
     *
     * Returns the gateway stored in the class variables.
     * @return object - The gateway currently stored in the class variable.
     */
    protected function getGateway()
    {
        return $this->gateway;
    }
}
