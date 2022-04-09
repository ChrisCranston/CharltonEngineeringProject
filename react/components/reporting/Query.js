import React from "react";


/**
 * @author Christopher Ewart
 */
class Query extends React.Component {

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
                <td>{this.props.query.name}</td>
                <td>{this.props.query.email}</td>
                <td>{this.props.query.phone_number}</td>
                <td>{this.props.query.prospective_client_type}</td> 
                <td>{this.props.query.query}</td> 
                <td>{this.props.query.query_type_name}</td> 
                <td>{this.props.query.date_time}</td> 
             </tr>
      

        );
        

        


           
    }

}

export default Query;