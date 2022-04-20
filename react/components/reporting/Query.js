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

        let phoneNumber = this.props.query.phone_number 
        let email = this.props.query.email

        if (this.props.query.phone_number === null) {
            phoneNumber = "N/A"
        }

        if (this.props.query.email === null ) {
            email = "N/A"
        }
        



    

        return(
         
              <tr class = "query-tr">
                <td>{this.props.query._name}</td>
                <td>{email}</td>
                <td>{phoneNumber}</td>
                <td>{this.props.query.prospective_client_type}</td> 
                <td>{this.props.query._query}</td> 
                <td>{this.props.query.query_type_name}</td> 
                <td>{this.props.query.date_time}</td> 
             </tr>
      

        );
        

        


           
    }

}

export default Query;