<?php

/**
 * JSONResponse
 * 
 * Sets headers for JSON formatted responses and performs other JSON related tasks.
 * 
 * @author Team 2 - Chris Cranston, Christopher Ewart, Kess Strongman, Stephen Campbell, Matthew Dawson
 */
class JSONResponse extends Response
{
    private $message;
    private $statusCode;

    /**
     * headers
     * 
     * Sets the headers to be used in the JSON response.
     */
    protected function headers()
    {
        header("Access-Control-Allow-Origin: *");
        header("Content-Type: application/json; charset=UTF-8");
    }

    /**
     * getData
     * 
     * gets the contents of the data and formats it for JSON displaying. 
     *
     * @return object json_encode($response) - The response encoded to JSON formatting.
     */
    public function getData()
    {
        $data = $this->data ?: [];

        if (is_null($this->message)) {
            if (count($data) > 0) {
                $this->message = "Ok";
                $this->setStatusCode(200);
            } else {
                $this->message = "No Content";
                $this->setStatusCode(204);
            }
        }
        http_response_code($this->statusCode);
        $response['message'] = $this->message;
        $response['count'] = count($data);
        $response['results'] = $data;
        return json_encode($response);
    }

    /**
     * setMessage
     * 
     * Sets the message.
     *
     * @param  string $message - The message to be set.
     */
    public function setMessage($message)
    {
        $this->message = $message;
    }

    /**
     * setStatusCode
     * 
     * Sets the status code. 
     *
     * @param  int $code - The status code to be set. 
     */
    public function setStatusCode($code)
    {
        $this->statusCode = $code;
    }
}
