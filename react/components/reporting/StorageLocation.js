import React from "react";


/**
 * @author Christopher Ewart
 */
class StorageLocation extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            
        }
    }

    

 


    /**
     * render
     * 
     * return the required components depensing on the flags 
     * passed into this component
     *  
     */
    render() {
        let quantity = this.props.storageLocation.quantity
        let clientName = this.props.storageLocation.client_name
        let partID = this.props.storageLocation.part_id
        let name = this.props.storageLocation.name
        let description = this.props.storageLocation.description

        if (this.props.storageLocation.quantity === null || this.props.storageLocation.quantity === "0") {
            quantity = "Empty"
        }

        if (this.props.storageLocation.client_name === null || this.props.storageLocation.quantity === "0") {
            clientName = "N/A"
        }

        if (this.props.storageLocation.part_id === null || this.props.storageLocation.quantity === "0") {
            partID = "N/A"
        }

        if (this.props.storageLocation.name === null ||  this.props.storageLocation.quantity === "0") {
            name = "N/A"
        }

        if (this.props.storageLocation.description === null || this.props.storageLocation.quantity === "0") {
            description = "N/A"
        }
        


        return(
         
              <tr class="storage-loc-tr">
                <td>{quantity}</td>
                <td>{clientName}</td>
                <td>{this.props.storageLocation.warehouse_number}</td> 
                <td>{this.props.storageLocation.location_string}</td> 
                <td>{this.props.storageLocation.storage_type}</td>
                <td>{partID}</td>
                <td>{name}</td>
                <td>{description}</td> 
             </tr>
      

        );
        

        


           
    }

}

export default StorageLocation;