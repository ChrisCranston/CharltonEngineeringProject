<?php

/**
 * APIStoredController
 * 
 * This class extends the controller to provide specific functionality for the stored API.
 * 
 * @author Chris Cranston - W18018468
 */
class  ApiStoredController extends Controller
{
    /**
     * setGateway
     *
     * Sets this gateway to the StoredGateway
     */
    protected function setGateway()
    {
        $this->gateway = new StoredGateway();
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

        $part_search = $this->getRequest()->getParameter("part_search");
        $location_search = $this->getRequest()->getParameter("location_search");
        $serial_number = $this->getRequest()->getParameter("serial_number");
        $location = $this->getRequest()->getParameter("serial_number");


        if ($this->getRequest()->getRequestMethod() == "GET") {
            if (!is_null($part_search)) {
                $this->getGateway()->findAllPart();
            } elseif (!is_null($location_search)) {
                $this->getGateway()->findAllLocation();
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
