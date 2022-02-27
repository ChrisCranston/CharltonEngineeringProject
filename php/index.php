<?php
/**
 * The main landing page of the website.
 * 
 * @author Chris Cranston - W18018468
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
    default:
        $controller = new ErrorController($request, $response);
        break;
}

echo $response->getData();
