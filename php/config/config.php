<?php
/**
 * General configuration parameters for the webpage. 
 * 
 * @author Chris Cranston - W18018468
 */
include 'config/autoloader.php'; 
include 'config/jsonexceptionhandler.php';
include 'config/errorhandler.php';

spl_autoload_register("autoloader");
set_exception_handler('jsonExceptionHandler');
set_error_handler('errorHandler');

define('LOCAL_BASEPATH', '/kv6002/php/');
// define('BASEPATH_ABSOLUTE', 'http://unn-w18018468.newnumyspace.co.uk/kv6002/php/' );
define('DATABASE', 'db/CESDB.sqlite');
define('CUSTOMER_DATABASE', 'db/CESDB_CUST.sqlite');
define('DEVELOPMENT_MODE', True);  