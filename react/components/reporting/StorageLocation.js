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



        return(
         
              <tr>
                <td>{this.props.storageLocation.storage_id}</td>
                <td>{this.props.storageLocation.quantity}</td>
                <td>{this.props.storageLocation.client_name}</td>
                <td>{this.props.storageLocation.warehouse_number}</td> 
                <td>{this.props.storageLocation.location_string}</td> 
                <td>{this.props.storageLocation.storage_type}</td> 
             </tr>
      

        );
        

        


           
    }

}

export default StorageLocation;