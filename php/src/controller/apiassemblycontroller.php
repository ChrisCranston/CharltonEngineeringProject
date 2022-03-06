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
            // $token = $this->getRequest()->getParameter("token");
            $id = $this->getRequest()->getParameter("id");
            $serialNumber = $this->getRequest()->getParameter("serialnumber");
            $name = $this->getRequest()->getParameter("name");

            $create = $this->getRequest()->getParameter("create");
            $edit = $this->getRequest()->getParameter("edit");
            $modifyQuantity = $this->getRequest()->getParameter("quantity");

            // WHERE quantity <= low warning 

            /*
            // PUT THE COMMENTED OUT PARTS INTO A FUNCTION THAT CAN BE REUSABLE ACROSS ALL CONTROLLERS TO AUTHENTICATE BEFORE PROCEEDING

            if (!is_null($token)) {
                $key = SECRET_KEY;

                try {
                    $decoded = JWT::decode($token, new Key($key, 'HS256'));
                    $userID = $decoded->sub;

                    if (!is_null($userID) && $decoded->iss === ISSUER && $decoded->aud === AUDIENCE) {
                        $userGateway = new UserGateway();
                        $userGateway->findAll();
                        $users = $userGateway->getResult();
                        $userIDs = [];

                        if (count($users) > 0) {
                            foreach ($users as $userDetails) {
                                array_push($userIDs, $userDetails["id"]);
                            }
                        }

                        if (in_array($userID, $userIDs)) {
            */

            $userID = 1;        // <--  TEMPORARY, retrieve userID from the token instead and use that

            if (!is_null($id)) {
                $this->getGateway()->findOne($id);
            } elseif (!is_null($serialNumber)) {
                $this->getGateway()->findBySerialNumber($serialNumber);
            } elseif (!is_null($name)) {
                $this->getGateway()->findByPartName($name);
            } elseif (!is_null($create)) {
                // {\"name\": \"rubber washer\", \"serial_number\": \"XX1\", \"quantity\": 364, \"notes\": null, \"low_warning\": 100, \"order_url\": \"https://www.screwfix.com/p/flomasta-fibre-rubber-washers-210-pcs/70837\"}
                // {\"name\": \"blue crimp\", \"serial_number\": \"IA0893\", \"quantity\": 1000, \"notes\": \"for the komatsu job\", \"low_warning\": 200, \"order_url\": \"https://www.screwfix.com/p/insulated-blue-1-5-2-5mm-crimp-butts-100-pack/47402\"}

                $partDetails = json_decode(html_entity_decode(stripslashes($create)), true);

                $findBySerialNumberGateway = new AssemblyGateway();
                $findBySerialNumberGateway->findBySerialNumber($partDetails["serial_number"]);

                if (count($findBySerialNumberGateway->getResult()) === 0) {
                    if ($partDetails["quantity"] > 0) {
                        $this->getGateway()->createPart($partDetails, $userID);
                        $this->getResponse()->setMessage("Part created successfully");
                        $this->getResponse()->setStatusCode(201);
                    } else {
                        $this->getResponse()->setMessage("Unable to create - initial part quantity must be greater than zero");
                        $this->getResponse()->setStatusCode(400);
                    }
                } else {
                    $this->getResponse()->setMessage("Unable to create - part already exists");
                    $this->getResponse()->setStatusCode(400);
                }
            } elseif (!is_null($edit)) {
                // {\"part_id\": 22, \"name\": \"red rubber washer\", \"serial_number\": \"XX1\", \"notes\": null, \"low_warning\": 100, \"order_url\": \"https://www.screwfix.com/p/flomasta-fibre-rubber-washers-210-pcs/70837\"}
                // {\"part_id\": 22, \"name\": \"rubber washer\", \"serial_number\": \"XX1\", \"notes\": null, \"low_warning\": 100, \"order_url\": \"https://www.screwfix.com/p/flomasta-fibre-rubber-washers-210-pcs/70837\"}
                // {\"part_id\": 22, \"name\": \"blue rubber washer\", \"serial_number\": \"XBBX1\", \"notes\": "need to buy 100 more before next month", \"low_warning\": 200, \"order_url\": \"https://www.screwfix.com/p/flomasta-fibre-rubber-washers-210-pcs/70837\"}

                $partDetails = json_decode(html_entity_decode(stripslashes($edit)), true);
                $findByPartIDGateway = new AssemblyGateway();
                $findByPartIDGateway->findOne($partDetails["part_id"]);

                if (count($findByPartIDGateway->getResult()) === 1) {
                    $findBySerialNumberGateway = new AssemblyGateway();
                    $findBySerialNumberGateway->findBySerialNumber($partDetails["serial_number"]);

                    if (count($findBySerialNumberGateway->getResult()) === 0 || (int)$findBySerialNumberGateway->getResult()[0]["part_id"] === $partDetails["part_id"]) {
                        $this->getGateway()->editPartDetails($partDetails);
                        $this->getResponse()->setMessage("Part edited successfully");
                        $this->getResponse()->setStatusCode(201);
                    } else {
                        $this->getResponse()->setMessage("Unable to edit - serial number already exists for a different part");
                        $this->getResponse()->setStatusCode(400);
                    }
                } else {
                    $this->getResponse()->setMessage("Unable to edit - part does not exist");
                    $this->getResponse()->setStatusCode(404);
                }
            } elseif (!is_null($modifyQuantity)) {
                // {\"part_id\": 1, \"quantity\": 20, \"modificationType\": \"add\"}
                // {\"part_id\": 1, \"quantity\": 20, \"modificationType\": \"remove\"}

                $partDetails = json_decode(html_entity_decode(stripslashes($modifyQuantity)), true);
                $findByPartIDGateway = new AssemblyGateway();
                $findByPartIDGateway->findOne($partDetails["part_id"]);

                if (count($findByPartIDGateway->getResult()) > 0) {
                    $modificationType = $partDetails["modificationType"];

                    if ($modificationType === "add" || $modificationType === "remove") {
                        $this->getGateway()->addOrRemoveStock($partDetails, $userID);
                        $this->getResponse()->setMessage("Quantity modified successfully");
                        $this->getResponse()->setStatusCode(201);
                    } else {
                        $this->getResponse()->setMessage("Unable to add - invalid quantity modification type");
                        $this->getResponse()->setStatusCode(400);
                    }
                } else {
                    $this->getResponse()->setMessage("Unable to add - part does not exist");
                    $this->getResponse()->setStatusCode(404);
                }
            } else {
                $this->getGateway()->findAll();
            }
            /* 
                        } else {
                            $this->getResponse()->setMessage("Unauthorised - user does not exist");
                            $this->getResponse()->setStatusCode(401);
                        }
                    } else {
                        $this->getResponse()->setMessage("Unauthorised - invalid token");
                        $this->getResponse()->setStatusCode(401);
                    }
                } catch (\UnexpectedValueException $e) {
                    $this->getResponse()->setMessage("Unauthorised - invalid token: " . strtolower($e->getMessage());
                    $this->getResponse()->setStatusCode(401);
                } catch (\DomainException $e) {
                    $this->getResponse()->setMessage("Unauthorised - domain error: " . strtolower($e->getMessage());
                    $this->getResponse()->setStatusCode(401);
                } catch (\InvalidArgumentException $e) {
                    $this->getResponse()->setMessage("Unauthorised - " . strtolower($e->getMessage());
                    $this->getResponse()->setStatusCode(401);
                }
            } else {
                $this->getResponse()->setMessage("Unauthorised - a token is required to access this resource");
                $this->getResponse()->setStatusCode(401);
            }
            */
        } else {
            $this->getResponse()->setMessage("Invalid Request Type.");
            $this->getResponse()->setStatusCode(405);
            header("Allow: POST");
        }
        return $this->getGateway()->getResult();
    }
}
