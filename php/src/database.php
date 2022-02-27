<?php


/**
 * Database
 * 
 * Used to connect and interact with a databse.
 * 
 * @author Chris Cranston - W18018468
 */
class Database
{
    private $dbConnection;
    
    /**
     * __construct
     * 
     * Constructs the Database object and sets the database connection with the provided databse name. 
     *
     * @param  mixed $dbName - The databse to connect to.
     * @return void
     */
    public function __construct($dbName)
    {
        $this->setDbConnection($dbName);
    }
    
    /**
     * setDbConnection
     * 
     * Function to set the database connection using PDO
     *
     * @param  mixed $dbName - The database name to connect to. 
     */
    private function setDbConnection($dbName)
    {
        $this->dbConnection = new PDO('sqlite:' . $dbName);
        $this->dbConnection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    }

    
    /**
     * executeSQL
     * 
     * Executes an SQL statement using PDO for security. 
     *
     * @param  mixed $sql - the SQL string to be prepared and executed.
     * @param  mixed $params - Parameters to be substituted in the sql.  
     */
    public function executeSQL($sql, $params = [])
    {
        $stmt = $this->dbConnection->prepare($sql);
        $stmt->execute($params);

        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
}
