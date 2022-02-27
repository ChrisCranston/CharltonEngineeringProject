<?php

/**
 * autoloader
 * 
 * Automatically loads classes from appropriate file using classname.
 * 
 * @author Team 2 - Chris Cranston, Christopher Ewart, Kess Strongman, Stephen Campbell, Matthew Dawson
 *
 * @param string $className The class for the autoloader to load.
 */
function autoloader($className)
{
    $className =  strtolower($className);
    $baseStruct = "src\\";
    $folders = array('', 'gateway', 'controller', 'config');
    $found = False;
    foreach ($folders as $folder) {
        if ($folder == '') {
            $path = $baseStruct .  $className . ".php";
            $path = str_replace('\\', DIRECTORY_SEPARATOR, $path);
        } else {
            $path =  $baseStruct . $folder . DIRECTORY_SEPARATOR . $className . ".php";
            $path = str_replace('\\', DIRECTORY_SEPARATOR, $path);
        }

        if (is_readable($path)) {
            $found = true;
            include_once($path);
        }
    }

    if ($found == False) {
        throw new exception("Class: $className unable to load");
    }
}
