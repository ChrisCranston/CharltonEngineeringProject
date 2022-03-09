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
     * 
     * @return object returns the result of the gateway.
     */
    protected function processRequest()
    {

        $storage_id = $this->getRequest()->getParameter("query_id");

        if ($this->getRequest()->getRequestMethod() == "GET") {
            if (!is_null($storage_id)) {
                $this->getGateway()->findOne($storage_id);
            } else {
                $this->getGateway()->findAll();
            }
        } else {
            $this->getResponse()->setMessage("Invalid Request Type.");
            $this->getResponse()->setStatusCode(405);
        }
        return $this->getGateway()->getResult();
    }
}
