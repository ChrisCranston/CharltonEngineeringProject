import React from "react";


/**
 * @author Christopher Ewart
 */
class AssemblyPart extends React.Component {

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
         
              <tr class="assembly-tr">
                <td>{this.props.assemblyPart.serial_number}</td>
                <td>{this.props.assemblyPart.name}</td>
                <td>{this.props.assemblyPart.notes}</td> 
                <td>{this.props.assemblyPart.quantity}</td> 
                <td>{this.props.assemblyPart.low_warning}</td> 
                <td><a href={this.props.assemblyPart.order_url}>{this.props.assemblyPart.order_url}</a></td> 
             </tr>
      

        );
        

        


           
    }

}

export default AssemblyPart;