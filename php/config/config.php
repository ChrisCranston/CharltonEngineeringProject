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

define('LOCAL_BASEPATH', '/kv6002/php/');
// define('BASEPATH_ABSOLUTE', 'http://unn-w18018468.newnumyspace.co.uk/kv6002/php/' );
define('DATABASE', 'db/CES.sqlite');
define('CUSTOMER_DATABASE', 'db/CESCUST.sqlite');
define('DEVELOPMENT_MODE', True);  