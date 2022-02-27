<?php

/**
 * jsonExceptionHandler
 *
 * Handles JSON exceptions on API/ pages
 * 
 * @author Team 2 - Chris Cranston, Christopher Ewart, Kess Strongman, Stephen Campbell, Matthew Dawson
 * 
 * @param  object $e The exception containing the message line and file of occurance.
 */
function jsonExceptionHandler($e)
{
   header("Access-Control-Allow-Origin: *");
   header("Access-Control-Allow-Methods:GET");
   header("Access-Control-Max-Age: 3600");
   header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
   header("Content-Type: application/json; charset=UT-8");
   http_response_code(500);
   if (DEVELOPMENT_MODE) {
      $errorArray = array('Error' => 'internal server error!', 'Message' => $e->getMessage(), 'File' => $e->getFile(), 'Line' => $e->getLine());
   } else {
      $errorArray = array('Error' => 'An error has occured please try again.', 'Message' => $e->getMessage());
   }
   echo json_encode($errorArray);
}
