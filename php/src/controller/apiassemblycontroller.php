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
        if ($this->getRequest()->getRequestMethod() == "POST") {
            $id = $this->getRequest()->getParameter("id");
            $serialNumber = $this->getRequest()->getParameter("serialnumber");
            $name = $this->getRequest()->getParameter("name");

            $create = $this->getRequest()->getParameter("create");
            $edit = $this->getRequest()->getParameter("edit");
            $delete = $this->getRequest()->getParameter("delete");
            $quantity = $this->getRequest()->getParameter("quantity");

            $accessLevel = $this->tokenCheck();
            $userID = 1; // <--  TEMPORARY until authentication is completed
            $datetime = date("Y/m/d H:i");//current time

            if (($accessLevel === "worker" || $accessLevel === "manager")) {
                if (!is_null($id)) {
                    $this->getGateway()->findOne($id);
                } elseif (!is_null($serialNumber)) {
                    $this->getGateway()->findBySerialNumber($serialNumber);
                } elseif (!is_null($name)) {
                    $this->getGateway()->findByPartName($name);
                } elseif (!is_null($create)) {
                    $partDetails = json_decode(html_entity_decode(stripslashes($create)), true);

                    if (!empty($partDetails["serial_number"])) {
                        $findBySerialNumberGateway = new AssemblyGateway();
                        $findBySerialNumberGateway->findBySerialNumber($partDetails["serial_number"]);

                        if (count($findBySerialNumberGateway->getResult()) === 0) {
                            if (!empty($partDetails["quantity"])) {
                                if ($partDetails["quantity"] > 0) {
                                    if (!empty($partDetails["name"])) {
                                        if ($partDetails["low_warning"] > 0) {
                                            $this->getGateway()->createPart($partDetails, $userID, $datetime);
                                            $this->getResponse()->setMessage("Part created successfully");
                                            $this->getResponse()->setStatusCode(201);
                                        } else {
                                            $this->getResponse()->setMessage("Unable to create - low warning must be greater than zero");
                                            $this->getResponse()->setStatusCode(400);
                                        }
                                    } else {
                                        $this->getResponse()->setMessage("Unable to create - missing part name");
                                        $this->getResponse()->setStatusCode(400);
                                    }
                                } else {
                                    $this->getResponse()->setMessage("Unable to create - initial part quantity must be greater than zero");
                                    $this->getResponse()->setStatusCode(400);
                                }
                            } else {
                                $this->getResponse()->setMessage("Unable to create - missing quantity");
                                $this->getResponse()->setStatusCode(400);
                            }
                        } else {
                            $this->getResponse()->setMessage("Unable to create - part with serial number '" . $partDetails["serial_number"] . "' already exists");
                            $this->getResponse()->setStatusCode(400);
                        }
                    } else {
                        $this->getResponse()->setMessage("Unable to create - missing serial number");
                        $this->getResponse()->setStatusCode(400);
                    }
                } elseif (!is_null($edit)) {
                    $partDetails = json_decode(html_entity_decode(stripslashes($edit)), true);

                    if (!empty($partDetails["part_id"])) {
                        $findByPartIDGateway = new AssemblyGateway();
                        $findByPartIDGateway->findOne($partDetails["part_id"]);

                        if (count($findByPartIDGateway->getResult()) === 1) {
                            if (!empty($partDetails["serial_number"])) {

                                $findBySerialNumberGateway = new AssemblyGateway();
                                $findBySerialNumberGateway->findBySerialNumber($partDetails["serial_number"]);

                                if (count($findBySerialNumberGateway->getResult()) === 0 || $findBySerialNumberGateway->getResult()[0]["part_id"] === $partDetails["part_id"]) {
                                    if (!empty($partDetails["name"])) {
                                        if ($partDetails["low_warning"] > 0) {
                                            $this->getGateway()->editPartDetails($partDetails);
                                            $this->getResponse()->setMessage("Part edited successfully");
                                            $this->getResponse()->setStatusCode(200);
                                        } else {
                                            $this->getResponse()->setMessage("Unable to edit - low warning must be greater than zero");
                                            $this->getResponse()->setStatusCode(400);
                                        }
                                    } else {
                                        $this->getResponse()->setMessage("Unable to edit - missing part name");
                                        $this->getResponse()->setStatusCode(400);
                                    }
                                } else {
                                    $this->getResponse()->setMessage("Unable to edit - serial number already exists for a different part");
                                    $this->getResponse()->setStatusCode(400);
                                }
                            } else {
                                $this->getResponse()->setMessage("Unable to edit - missing serial number");
                                $this->getResponse()->setStatusCode(400);
                            }
                        } else {
                            $this->getResponse()->setMessage("Unable to edit - part does not exist");
                            $this->getResponse()->setStatusCode(404);
                        }
                    } else {
                        $this->getResponse()->setMessage("Unable to edit - missing part ID");
                        $this->getResponse()->setStatusCode(404);
                    }
                } elseif (!is_null($quantity)) {
                    $partDetails = json_decode(html_entity_decode(stripslashes($quantity)), true);
                    if (!empty($partDetails["part_id"])) {
                        $findByPartIDGateway = new AssemblyGateway();
                        $findByPartIDGateway->findOne($partDetails["part_id"]);

                        if (count($findByPartIDGateway->getResult()) > 0) {
                            if (!empty($partDetails["modificationType"])) {
                                $modificationType = $partDetails["modificationType"];

                                if ($modificationType === "add" || $modificationType === "remove") {
                                    if (!empty($partDetails["quantity"])) {
                                        $this->getGateway()->addOrRemoveStock($partDetails, $userID, $datetime);
                                        $this->getResponse()->setMessage("Quantity modified successfully");
                                        $this->getResponse()->setStatusCode(200);
                                    } else {
                                        $this->getResponse()->setMessage("Unable to $modificationType - missing quantity");
                                        $this->getResponse()->setStatusCode(400);
                                    }
                                } else {
                                    $this->getResponse()->setMessage("Unable to modify quantity - invalid quantity modification type");
                                    $this->getResponse()->setStatusCode(400);
                                }
                            } else {
                                $this->getResponse()->setMessage("Unable to modify quantity - missing modification type");
                                $this->getResponse()->setStatusCode(404);
                            }
                        } else {
                            $this->getResponse()->setMessage("Unable to modify quantity - part does not exist");
                            $this->getResponse()->setStatusCode(404);
                        }
                    } else {
                        $this->getResponse()->setMessage("Unable to modify quantity - missing part ID");
                        $this->getResponse()->setStatusCode(404);
                    }
                } elseif (!is_null($delete)) {
                    $partDetails = json_decode(html_entity_decode(stripslashes($delete)), true);

                    if (!empty($partDetails["part_id"])) {
                        $partID = $partDetails["part_id"];

                        $findByPartIDGateway = new AssemblyGateway();
                        $findByPartIDGateway->findOne($partID);

                        if (count($findByPartIDGateway->getResult()) === 1) {
                            $this->getGateway()->deletePart($partID);
                            $this->getResponse()->setMessage("Part deleted successfully");
                            $this->getResponse()->setStatusCode(200);
                        } else {
                            $this->getResponse()->setMessage("Unable to delete - part does not exist");
                            $this->getResponse()->setStatusCode(404);
                        }
                    } else {
                        $this->getResponse()->setMessage("Unable to modify quantity - missing part ID");
                        $this->getResponse()->setStatusCode(404);
                    }
                } else {
                    $this->getGateway()->findAll();
                }
            }
        } else {
            $this->getResponse()->setMessage("Invalid Request Type.");
            $this->getResponse()->setStatusCode(405);
            header("Allow: POST");
        }
        return $this->getGateway()->getResult();
    }
}
