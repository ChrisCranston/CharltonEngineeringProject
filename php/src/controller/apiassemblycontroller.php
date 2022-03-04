<?php

/**
 * ApiAssemblyController
 * 
 * This class extends the controller to provide specific functionality for the assembly stock management subsystem.
 * 
 * Retrieves data from and modifies data relating to assembly stock.
 * 
 * @author Matthew Dawson - W18002221
 */
class ApiAssemblyController extends Controller
{
    /**
     * setGateway
     *
     * Sets this gateway to the AssemblyGateway
     */
    protected function setGateway()
    {
        $this->gateway = new AssemblyGateway();
    }

    /**
     * processRequest
     *
     * Processes the request, and calls the appropriate assembly gateway method to perform the appropriate actions.
     * 
     * @return object returns the result of the gateway.
     */
    protected function processRequest()
    {
        $part_id = $this->getRequest()->getParameter("part_id");

        if ($this->getRequest()->getRequestMethod() == "GET") {                // CHANGE TO "POST" once AUTH ///////////////////////////////////////////////
            if (!is_null($part_id)) {
                $this->getGateway()->findOne($part_id);
            } else {
                $this->getGateway()->findAll();
            }
        } else {
            $this->getResponse()->setMessage("Invalid Request Type.");
            $this->getResponse()->setStatusCode(405);
            header("Allow: GET");                                              // CHANGE TO "Allow: POST" ///////////////////////////////////////////////
        }
        return $this->getGateway()->getResult();
    }
}
