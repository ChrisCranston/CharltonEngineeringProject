import React from "react";


/**
 * @author Christopher Ewart
 */
class StorageInteraction extends React.Component {

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
                <td>{this.props.storageInteraction.amount}</td>
                <td>{this.props.storageInteraction.description}</td>
                <td>{this.props.storageInteraction.warehouse_number}</td> 
                <td>{this.props.storageInteraction.location_string}</td> 
                <td>{this.props.storageInteraction.storage_type}</td> 
                <td>{this.props.storageInteraction.name}</td> 
                <td>{this.props.storageInteraction.firstname}</td>
                <td>{this.props.storageInteraction.lastname}</td>
                <td>{this.props.storageInteraction.interaction_datetime}</td> 
                <td>{this.props.storageInteraction.email_address}</td>  
             </tr>
      

        );
        

        


           
    }

}

export default StorageInteraction;