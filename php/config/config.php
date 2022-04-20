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

define('SECRET_KEY', "@'v0^oaO.HfQtc51?i@^|xiO?3yS_x");
define('LOCAL_BASEPATH', '/kv6002/php/');
// define('BASEPATH_ABSOLUTE', 'http://unn-w18018468.newnumyspace.co.uk/kv6002/php/' );
define('DATABASE', 'charlemo_CES');
define('CUSTOMER_DATABASE', 'charlemo_CESCUST');
define('DEVELOPMENT_MODE', True);
