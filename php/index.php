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
    case 'assembly-parts':
        $controller = new ApiAssemblyController($request, $response);
        break;
    case 'assemblyreport':
        $controller = new ApiAssemblyReportController($request, $response);
        break;
    case 'assemblyinteractionreport':
        $controller = new ApiAssemblyInteractionReportController($request, $response);
        break;
    case 'customerquery':
        $controller = new ApiCustomerQueryController($request, $response);
        break;
    case 'storageinteractionreport':
        $controller = new ApiStorageInteractionReportController($request, $response);
        break;    
    case 'storagereport':
        $controller = new ApiStorageReportController($request, $response);
        break;
    case "customerquery":
        $controller = new ApiCustomerQueryController($request, $response);
        break;
    case 'customerreport':
        $controller = new ApiCustomerReportController($request, $response);
        break;    
    default:
        $controller = new ErrorController($request, $response);
        break;
}

echo $response->getData();
