<?php

/**
 * APIStoredController
 * 
 * This class extends the controller to provide specific functionality for the stored API.
 * 
 * @author Chris Ewart - w18012997
 */
class  ApiAssemblyInteractionReportController extends Controller
{
    /**
     * setGateway
     *
     * Sets this gateway to the StoredGateway
     */
    protected function setGateway()
    {
        $this->gateway = new AssemblyInteractionReportGateway();
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

        $interaction_id = $this->getRequest()->getParameter("interaction_id");
        $user_names = $this->getRequest()->getParameter("user_names");

        if ($this->getRequest()->getRequestMethod() == "GET") {
            if (!is_null($interaction_id)) {
                $this->getGateway()->findOne($interaction_id);
            } elseif ($user_names){
                $this->getGateway()->getUserNames();
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
