<?php

/**
 * APIStoredController
 * 
 * This class extends the controller to provide specific functionality for the stored API.
 * 
 * @author Chris Cranston + Kess Strongman
 */
class  ApiCustomerQueryController extends Controller
{
    /**
     * setGateway
     *
     * Sets this gateway to the StoredGateway
     */
    protected function setGateway()
    {
        $this->gateway = new CustomerQueryGateway();
    }

    /**
     * processRequest
     *
     * Processes the request, and calls the appropriate gateway method to perform the appropriate actions.
     * 
     * @return object returns the result of the gateway.
     */
    protected function processRequest()
    {
        $datetime = $this->getRequest()->getParameter("datetime");
        $name = $this->getRequest()->getParameter("name");
        $businessindividual = $this->getRequest()->getParameter("businessindividual");
        $email = $this->getRequest()->getParameter("email"); //parameters = the table column fillers
        $phonenumber = $this->getRequest()->getParameter("phonenumber");
        $query = $this->getRequest()->getParameter("query");
        $querytype = $this->getRequest()->getParameter("querytype");

        if ($this->getRequest()->getRequestMethod() == "POST") {
            if (!is_null($email)) { //if they haven't submitted an email 
                $this->getGateway()->addQueryWOEmail($datetime, $name, $businessindividual, $phonenumber, $query, $querytype); 
            } else if (!is_null($phonenumber)) { //if they haven't submitted phone
                    $this->getGateway()->addQueryWOPhonenumber($datetime, $name, $businessindividual, $email, $query, $querytype); 
            } else {
                $this->getGateway()->addQueryWAll($datetime, $name, $businessindividual, $email, $phonenumber, $query, $querytype);
            }
        } else if ($this->getRequest()->getRequestMethod() == "GET") {
                $this->getGateway()->getQueryTypes();
        } else {
            $this->getResponse()->setMessage("Invalid Request Type.");
            $this->getResponse()->setStatusCode(405);
        }
        return $this->getGateway()->getResult();
    }
}
