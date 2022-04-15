import React from "react";


/**
 * @author Christopher Ewart
 */
class AssemblyInteraction extends React.Component {

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
         
              <tr class = "assembly-int-tr">
                <td>{this.props.assemblyInteraction.serial_number}</td>
                <td>{this.props.assemblyInteraction.name}</td>
                <td>{this.props.assemblyInteraction.amount}</td> 
                <td>{this.props.assemblyInteraction.firstname}</td> 
                <td>{this.props.assemblyInteraction.lastname}</td> 
                <td>{this.props.assemblyInteraction.interaction_datetime}</td> 
                <td>{this.props.assemblyInteraction.email_address}</td> 
             </tr>
      

        );
        

        


           
    }

}

export default AssemblyInteraction;