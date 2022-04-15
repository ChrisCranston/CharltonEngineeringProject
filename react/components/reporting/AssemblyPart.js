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
        let orderURL = <a href={this.props.assemblyPart.order_url} target="_blank">{this.props.assemblyPart.order_url}</a>
        if (this.props.assemblyPart.notes === null || this.props.assemblyPart.notes === "") {
            notes = "N/A"
        }

        if (this.props.assemblyPart.order_url === null || this.props.assemblyPart.order_url === ""){
            orderURL = "N/A"
        }


        return(
         
              <tr class="assembly-tr">
                <td>{this.props.assemblyPart.serial_number}</td>
                <td>{this.props.assemblyPart.name}</td>
                <td>{notes}</td> 
                <td>{this.props.assemblyPart.quantity}</td> 
                <td>{this.props.assemblyPart.low_warning}</td> 
                <td>{orderURL}</td> 
             </tr>
      

        );
        

        


           
    }

}

export default AssemblyPart;