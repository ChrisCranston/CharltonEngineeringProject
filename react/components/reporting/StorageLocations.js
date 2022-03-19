import React,  { useRef } from "react";
import StorageLocation from './StorageLocation.js';




/**
 * @author Christopher Ewart
 */
class StorageLocations extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            results: [],
            warehouseNumber:"",
            clientName:""

        }

        
    }



    /**
     * componentDidMount
     * 
     * 
     */
    componentDidMount() {
        let url = "http://unn-w18012997.newnumyspace.co.uk/kv6002/php/storagereport"


        fetch(url)
            .then((response) => {
                if (response.status === 200) {
                    return response.json()
                } else {
                    throw Error(response.statusText);
                }
            })
            .then((data) => {
                console.log(data)
                this.setState({ results: data.results })
            })
            .catch((err) => {
                console.log("something went wrong ", err)
            });

    }

    filterByWarehouseNumber = (storageLocation) => {
        if (this.props.custType === "No Filter"){
        return (storageLocation.warehouse_number !== null)
        }else{
        return ((storageLocation.warehouse_number === this.props.warehouseNumber) || (this.props.warehouseNumber===""))
        }
    }

    filterByClientName = (storageLocation) => {
        if (this.props.queryType === "No Filter"){
        return (storageLocation.client_name !== null)
        }else{
        return ((storageLocation.client_name === this.props.clientName) || (this.props.clientName===""))
        }
    }
    

    /**
     * render
     * 
     * return the required components depending on the flags 
     * passed into this component
     *  
     */
    render() {

        let noData = ""

        if (this.state.results.length === 0) {
            noData = <p>No data</p>
        }

        let filteredResults = this.state.results
        
        if (this.props.warehouseNumber !== undefined) {
            filteredResults = filteredResults.filter(this.filterByWarehouseNumber)
        }  
      
        if (this.props.clientName !== undefined) {
            filteredResults = filteredResults.filter(this.filterByClientName)
        } 
       

        return(
        <div>
       
           
                <table>
                <tr>
                 <th>Storage ID</th>
                 <th>Quantity</th>
                 <th>Client Name</th>
                 <th>Warehouse Number</th>
                 <th>Location</th>
                 <th>Storage Type</th>
                 <th>Part ID</th>
                 <th>Name</th>
                 <th>Description</th>
                </tr>

                    {filteredResults.map((storageLocation, i) => (<StorageLocation className="StorageLocation" key={i} storageLocation={storageLocation} />))}
                    </table>
        </div> 

        );
        

    }

}

export default StorageLocations;