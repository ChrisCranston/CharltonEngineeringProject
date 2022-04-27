<?php

/**
 * General configuration parameters for the webpage. 
 * 
 * @author Team 2 - Chris Cranston, Christopher Ewart, Kess Strongman, Stephen Campbell, Matthew Dawson
 */
include 'config/autoloader.php';
include 'config/jsonexceptionhandler.php';
include 'config/errorhandler.php';

spl_autoload_register("autoloader");
set_exception_handler('jsonExceptionHandler');
set_error_handler('errorHandler');

date_default_timezone_set("Europe/London");
define('SECRET_KEY', "@'v0^oaO.HfQtc51?i@^|xiO?3yS_x");
# HOSTING SETUP:
define('LOCAL_BASEPATH', '/kv6002/php/');
define('DATABASE', 'charlemo_CES');
define('CUSTOMER_DATABASE', 'charlemo_CESCUST');
define('DEVELOPMENT_MODE', True);
define('DB_USER', 'charlemo');
define('DB_PASS','charltonEngineering');
define('DB_HOST','localhost');
