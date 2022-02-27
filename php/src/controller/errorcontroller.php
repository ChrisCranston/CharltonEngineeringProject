<?php

/**
 * ErrorController
 * 
 * Handles the Errors for the webpage when an incorrect page name is typed into the URL bar. 
 * 
 * @author Team 2 - Chris Cranston, Christopher Ewart, Kess Strongman, Stephen Campbell, Matthew Dawson
 */
class ErrorController extends Controller
{    
    /**
     * processRequest
     * 
     * Throws an exception to be handled by the appropriate JSON exception handler.
     */
    protected function processRequest()
    {
        throw new exception("404 - page with that URL not found, please try again");
    }
}
