<?php
/**
 * The main landing page of the website.
 * 
 * @author Team 2 - Chris Cranston, Christopher Ewart, Kess Strongman, Stephen Campbell, Matthew Dawson
 */
include "config/config.php";

$request = new Request();

$response = new JSONResponse();

switch ($request->getPath()) {
    case '':
        $controller = new ErrorController($request, $response);
        break;
    case 'stored':
        $controller = new ApiStoredController($request, $response);
        break;
    // case 'customer':
    //         $controller = new ApiCustomerController($request, $response);
    //     break;
    default:
        $controller = new ErrorController($request, $response);
        break;
}

echo $response->getData();
