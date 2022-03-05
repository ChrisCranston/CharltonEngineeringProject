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
            $modifyStock = $this->getRequest()->getParameter("modifystock");

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
            if (!is_null($id)) {
                $this->getGateway()->findOne($id);
            } elseif (!is_null($serialNumber)) {
                $this->getGateway()->findBySerialNumber($serialNumber);
            } elseif (!is_null($name)) {
                $this->getGateway()->findByPartName($name);
            } elseif (!is_null($create)) {
                $this->getGateway()->createPart($create);
            } elseif (!is_null($edit)) {
                $this->getGateway()->editPart($edit);
            } elseif (!is_null($modifyStock)) {
                // {\"id\": 1, \"quantity\": 20, \"modificationType\": \"add\"}
                // {\"id\": 1, \"quantity\": 20, \"modificationType\": \"remove\"}

                $stockDetails = json_decode(html_entity_decode(stripslashes($modifyStock)), true);
                $this->getGateway()->findOne($stockDetails["id"]);

                if (count($this->getGateway()->getResult()) > 0) {
                    $modificationType = $stockDetails["modificationType"];

                    if ($modificationType === "add") {
                        $this->getGateway()->modifyStock($stockDetails["id"], $stockDetails["quantity"], true);
                        $this->getResponse()->setMessage("Stock added successfully");
                        $this->getResponse()->setStatusCode(201);
                    } elseif ($modificationType === "remove") {
                        $this->getGateway()->modifyStock($stockDetails["id"], $stockDetails["quantity"], false);
                        $this->getResponse()->setMessage("Stock removed successfully");
                        $this->getResponse()->setStatusCode(201);
                    } else {
                        $this->getResponse()->setMessage("Unable to add - invalid stock modification type");
                        $this->getResponse()->setStatusCode(400);
                    }
                } else {
                    $this->getResponse()->setMessage("Unable to add - stock does not exist");
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
