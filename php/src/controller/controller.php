<?php

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

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
    protected $accessLevel;

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

    /**
     * setAccessLevel
     * 
     * Sets the user's access level.
     * 
     * @param string $accessLevel the user's access level
     */
    protected function setAccessLevel($accessLevel)
    {
        $this->accessLevel = $accessLevel;
    }

    /**
     * getAccessLevel
     * 
     * Gets the user's access level.
     * 
     * @return string the user's access level
     */
    protected function getAccessLevel()
    {
        return $this->accessLevel;
    }

    /**
     * handleJWTException
     * 
     * Handles exceptions deriving from the JWT class.
     * This allows a 401 error to be returned for these exceptions while other exceptions can be returned as a 
     * 500 error by the exception handler function.
     * The client-facing exception message is delivered as a parameter and returned alongside the 401 status code.
     * 
     * @param string $message the exception message to return
     */
    private function handleJWTException($message)
    {
        $this->getResponse()->setMessage("Unauthorised - " . $message);
        $this->getResponse()->setStatusCode(401);
    }

    /**
     * tokenCheck
     * 
     * Used by controllers to check that the token is authentic. 
     *
     * Retrieves the user details and sets as a variable after authentication passed
     * for use in other controllers, or sets an error message if the token is not authenticated.
     */
    protected function tokenCheck()
    {
        $token = $this->getRequest()->getParameter("token");

        if (!is_null($token)) {

            $key = SECRET_KEY;

            try {
                $decoded = JWT::decode($token, new Key($key, 'HS256'));
                $accessLevel = $decoded->sub;

                if (!is_null($accessLevel) && ($accessLevel === "worker" || $accessLevel === "manager")) {
                    return $accessLevel;
                } else {
                    $this->getResponse()->setMessage("Unauthorised - invalid token");
                    $this->getResponse()->setStatusCode(401);
                }
            } catch (\UnexpectedValueException $e) {
                $this->handleJWTException("invalid token: " . strtolower($e->getMessage()));
            } catch (\DomainException $e) {
                $this->handleJWTException("domain error: " . strtolower($e->getMessage()));
            } catch (\InvalidArgumentException $e) {
                $this->handleJWTException(strtolower($e->getMessage()));
            }
        } else {
            $this->getResponse()->setMessage("Unauthorised - a token is required to access this resource");
            $this->getResponse()->setStatusCode(401);
        }
    }
}
