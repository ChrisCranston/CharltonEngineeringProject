<?php

/**
 * ApiCustomerQueryController
 * 
 * This class extends the controller to provide specific functionality for the customer query APIs.
 * 
 * @author Kess Strongman
 */
class  ApiCustomerQueryController extends Controller
{
    /**
     * setGateway
     *
     * Sets this gateway
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
        $token = true;
        
        //post request parameters
        $token_in = $this->getRequest()->getParameter("token");
        $name = $this->getRequest()->getParameter("name");
        $businessindividual = $this->getRequest()->getParameter("businessindividual");
        $email = $this->getRequest()->getParameter("email"); //parameters = the table column fillers
        $phonenumber = $this->getRequest()->getParameter("phonenumber");
        $query = $this->getRequest()->getParameter("query");
        $querytype = $this->getRequest()->getParameter("querytype");

        //GET request parameters
        $tableToGet = $this->getRequest()->getParameter("tabletoget");
        

        //Check the POST request has been sent with the website token
        if ($this->getRequest()->getRequestMethod() == "POST" && $token_in !== "SiteToken-7874857973") {
            $token = false;
        }

        if ($token) {
            //Respondes to the request type
            if ($this->getRequest()->getRequestMethod() == "POST") {
                date_default_timezone_set("United Kingdom/London");
                $datetime = date("Y/m/d H:i");//current time
                if (is_null($email)) { //if they haven't submitted an email 
                    $this->getGateway()->addQueryWOEmail($datetime, $name, $businessindividual, $phonenumber, $query, $querytype); 
                } else if (is_null($phonenumber)) { //if they haven't submitted phone
                        $this->getGateway()->addQueryWOPhonenumber($datetime, $name, $businessindividual, $email, $query, $querytype); 
                } else {
                    //If all the fields have been submitted
                    $this->getGateway()->addQueryWAll($datetime, $name, $businessindividual, $email, $phonenumber, $query, $querytype);
                }
            } else if ($this->getRequest()->getRequestMethod() == "GET") {
                    //choses a function dependant on the table that needs to be pulled back
                    if ($tableToGet == "clientType") { 
                        $this->getGateway()->getClientTypes();
                    } else  if ($tableToGet == "queryType"){
                        $this->getGateway()->getQueryTypes();
                    }else  if ($tableToGet == "reviews"){
                        $this->getGateway()->getReviews();
                    } else {
                        $this->getGateway()->getEverything(); //default
                    }
            } else {
                $this->getResponse()->setMessage("Invalid Request Type. put a type");
                $this->getResponse()->setStatusCode(405);
            } 
        } else{
            //If the token is incorrect then it is assumed the request has not been sent from a valid source
            //therefore the request is denied to prevent bot inputsd
            $this->getResponse()->setMessage("Origin of this request is invalid");
            $this->getResponse()->setStatusCode(403);
        }
        return $this->getGateway()->getResult();
        
    }
}
