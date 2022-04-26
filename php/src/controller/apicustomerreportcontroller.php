<?php

/**
 * APIstorageController
 * 
 * This class extends the controller to provide specific functionality for the storage API.
 * 
 * @author Chris Ewart - w18012997
 */
class  ApiCustomerReportController extends Controller
{
    /**
     * setGateway
     *
     * Sets this gateway to the storageGateway
     */
    protected function setGateway()
    {
        $this->gateway = new customerReportGateway();
    }

    /**
     * processRequest
     *
     * Processes the request, and calls the appropriate gateway method to perform the appropriate actions.
     * clientTypes
     * @return object returns the result of the gateway.
     */
    protected function processRequest()
    {

        $storage_id = $this->getRequest()->getParameter("query_id");
        $clientTypes = $this->getRequest()->getParameter("clientTypes");
        $queryTypes = $this->getRequest()->getParameter("queryTypes");
        $accessLevel = $this->tokenCheck();
        if ($accessLevel === "manager") {
            if ($this->getRequest()->getRequestMethod() == "POST") {
            if (!is_null($storage_id)) {
                $this->getGateway()->findOne($storage_id);
             } elseif ($clientTypes){
                $this->getGateway()->clientTypes(); 
            } elseif ($queryTypes){
                $this->getGateway()->queryTypes(); 
            } else {
                $this->getGateway()->findAll();
            }
        } else {
            $this->getResponse()->setMessage("Invalid Request Type.");
            $this->getResponse()->setStatusCode(405);
        }
    }
        return $this->getGateway()->getResult();
    }
}
