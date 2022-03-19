<?php

/**
 * Request
 * 
 * Request class to perform actions related to requests.
 * 
 * @author Team 2 - Chris Cranston, Christopher Ewart, Kess Strongman, Stephen Campbell, Matthew Dawson
 */
class Request
{
    private $basepath = LOCAL_BASEPATH;
    private $path;
    private $requestMethod;

    /**
     * __construct
     * 
     * Constructs the request class, sets the request method useing the basepath to return correct URL's.
     */
    public function __construct()
    {
        $this->path = parse_url($_SERVER["REQUEST_URI"])['path'];
        $this->path = strtolower(str_replace($this->basepath, "", $this->path));
        $this->path = trim($this->path, "/");
        $this->requestMethod = $_SERVER["REQUEST_METHOD"];
    }

    /**
     * getPath
     * 
     * Gets the path stored in the class variable.
     */
    public function getPath()
    {
        return $this->path;
    }

    /**
     * getRequestMethod
     * 
     * Gets the requestMethod stored in the class variable.
     *
     * @return string $this->requestMethod - The request method stored in the class variable.
     */
    public function getRequestMethod()
    {
        return $this->requestMethod;
    }

    /**
     * getParameter
     * 
     * Sanatizes and formats the request method and returns it. 
     *
     * @param  string $param - The request method to be sanitised and formatted.
     * @return object $param - The param after being formatted to INPUT_post or INPUT_GET
     */
    public function getParameter($param)
    {
        if ($this->getRequestMethod() === "GET") {
            $param = filter_input(INPUT_GET, $param, FILTER_SANITIZE_SPECIAL_CHARS);
        }
        if ($this->getRequestMethod() === "POST") {
            $param = filter_input(INPUT_POST, $param, FILTER_SANITIZE_SPECIAL_CHARS);
        }
        if (!is_null($param)) {
            $param = preg_replace('/\s\s+/', ' ', $param);
            $param = trim($param);
        }

        return $param;
    }
}
