import React from "react";
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
        let url = "https://charltonengineeringdemo.com/kv6002/php/storagereport"
        let formData = new FormData();
        formData.append("token", this.props.simToken);
        fetch(url, { method: "POST", headers: new Headers(), body: formData })
            .then((response) => {
                if (response.status === 200) {
                    return response.json()
                } else {
                    throw Error(response.statusText);
                }
            })
            .then((data) => {
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
        <div className="reporting_table_wrapper">
       
           
                <table>
                <thead>
                <tr>
                 <th>Quantity</th>
                 <th>Client Name</th>
                 <th>Warehouse Number</th>
                 <th>Location</th>
                 <th>Storage Type</th>
                 <th>Part ID</th>
                 <th>Name</th>
                 <th>Description</th>
                </tr>
                </thead>
                <tbody>
                    {noData}
                    {filteredResults.map((storageLocation, i) => (<StorageLocation simToken={this.props.simToken} className="StorageLocation" key={i} storageLocation={storageLocation} />))}
                    </tbody></table>
        </div> 

        );
        

    }

}

export default StorageLocations;