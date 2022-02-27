<?php


/**
 * errorHandler
 * 
 * Handles errors for the website.
 * 
 * @author Team 2 - Chris Cranston, Christopher Ewart, Kess Strongman, Stephen Campbell, Matthew Dawson
 *
 * @param  int $errno - The error number associated with the error.
 * @param  string $errstr - The error string containing the error message.
 * @param  string $errfile - The file in which the error occured.
 * @param  string $errline - The line in which the error occurred.
 */
function errorHandler($errno, $errstr, $errfile, $errline)
{

    if ($errno != 2 && $errno != 8 || DEVELOPMENT_MODE == True) {
        throw new Exception("Error Detected: [$errno] $errstr file: $errfile line: $errline", 1);
    }
}
