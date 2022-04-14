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
        let notes = this.props.assemblyPart.notes
        if (this.props.assemblyPart.notes === null) {
            notes = "N/A"
        }


        return(
         
              <tr class="assembly-tr">
                <td>{this.props.assemblyPart.serial_number}</td>
                <td>{this.props.assemblyPart.name}</td>
                <td>{notes}</td> 
                <td>{this.props.assemblyPart.quantity}</td> 
                <td>{this.props.assemblyPart.low_warning}</td> 
                <td><a href={this.props.assemblyPart.order_url} target="_blank">{this.props.assemblyPart.order_url}</a></td> 
             </tr>
      

        );
        

        


           
    }

}

export default AssemblyPart;