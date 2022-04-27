<?php

/**
 * APIStoredController
 * 
 * This class extends the controller to provide specific functionality for the stored API.
 * 
 * @author Chris Cranston - W18018468
 */
class ApiStoredController extends Controller
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
        $edit = $this->getRequest()->getParameter("edit");
        $location = $this->getRequest()->getParameter("location");
        $quantity = $this->getRequest()->getParameter("quantity");
        $empty = $this->getRequest()->getParameter("empty");
        $warehouse = $this->getRequest()->getParameter("warehouse");
        $name = $this->getRequest()->getParameter("name");
        $serialNumber = $this->getRequest()->getParameter("serialNumber");
        $description = $this->getRequest()->getParameter("description");
        $warehouse = $this->getRequest()->getParameter("warehouse");
        $location = $this->getRequest()->getParameter("location");
        $type = $this->getRequest()->getParameter("type");
        $user_id = $this->getRequest()->getParameter("user_id");
        $part_add = $this->getRequest()->getParameter("part_add");
        $client_add = $this->getRequest()->getParameter("client_add");
        $addClient = $this->getRequest()->getParameter("addClient");
        $addSerial = $this->getRequest()->getParameter("addSerial");
        $addQuantity = $this->getRequest()->getParameter("addQuantity");
        $addLocation = $this->getRequest()->getParameter("addLocation");
        $simulateGet = $this->getRequest()->getParameter("simulate_get");

        $accessLevel = $this->tokenCheck();
        if ($accessLevel === "worker" || $accessLevel === "manager") {
            if ($simulateGet == "GET") {
                if (!is_null($part_search)) {
                    $this->getGateway()->findAllPart();
                } elseif (!is_null($location_search)) {
                    if (!is_null($warehouse)) {
                        $this->getGateway()->findAllLocationWithWarehouse($warehouse);
                        if (!is_null($empty)) {
                            $this->getGateway()->findAllLocationWithWarehouseWithEmpty($warehouse);
                        }
                    } else {
                        if (!is_null($empty)) {
                            $this->getGateway()->findAllLocationWithEmpty();
                        } else {
                            $this->getGateway()->findAllLocation();
                        }
                    }
                } elseif (!is_null($part_add)) {
                    $this->getGateway()->findPartToAdd();
                } elseif (!is_null($client_add)) {
                    $this->getGateway()->findClientToAdd();
                } else {
                    $this->getGateway()->findAll();
                }
            } else {
                $datetime = date("Y/m/d H:i");//current time
                if ($edit == "add") {
                    $this->getGateway()->addQuantity($location, $quantity, $user_id, $datetime);
                } elseif ($edit == "remove") {
                    $this->getGateway()->removeQuantity($location, $quantity, $user_id, $datetime);
                } elseif ($edit == "addPart") {
                    $this->getGateway()->addPart($name, $serialNumber, $description);
                } elseif ($edit == "addLocation") {
                    $this->getGateway()->addLocation($warehouse, $location, $type);
                } elseif ($edit == "checklocation") {
                    $this->getGateway()->checkLocation($warehouse, $location);
                } elseif ($edit == "addPartToLocation") {
                    $this->getGateway()->addPartToLocation($addLocation, $addClient, $addSerial, $addQuantity, $user_id, $datetime);
                }
            }
        }
        return $this->getGateway()->getResult();
    }
}
