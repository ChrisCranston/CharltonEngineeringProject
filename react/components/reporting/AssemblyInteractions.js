import React from "react";
import AssemblyInteraction from './AssemblyInteraction.js';
import URL from "../url.js"

/**
 * @author Christopher Ewart
 */
class AssemblyInteractions extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            results: [],
            custType:"",
            queryType:"",
            userName:""

        }

        
    }



    /**
     * componentDidMount
     * 
     * 
     */
    componentDidMount() {
        let url = URL+"assemblyinteractionreport"
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

    filterSearch = (s) => {
        return (
        s.name.toLowerCase().includes(this.props.search.toLowerCase())
        || s.serial_number.toLowerCase().includes(this.props.search.toLowerCase())
        )
    }

    filterByUserName = (assemblyInteraction) => {
        if (this.props.custType === "No Filter"){
        return (assemblyInteraction.email_address !== null)
        }else{
        return ((assemblyInteraction.email_address === this.props.userName) || (this.props.userName===""))
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
        
        if (this.props.userName !== undefined) {
            filteredResults = filteredResults.filter(this.filterByUserName)
        }

        if ((filteredResults.length > 0) && (this.props.search !== undefined)) {
            filteredResults = filteredResults.filter(this.filterSearch);   
        }

        return(
            
            <div className="reporting_table_wrapper">
                <table>
                <thead>
                <tr>
                 <th>Serial No</th>
                 <th>Name</th>
                 <th>Amount</th>
                 <th>First Name</th>
                 <th>Last Name</th>
                 <th>Interaction Date/Time</th>
                 <th>Email Address</th>
                </tr>
                </thead>
                <tbody>
                {noData}
                    {filteredResults.map((assemblyInteraction, i) => (<AssemblyInteraction className="assemblyInteraction" key={i} assemblyInteraction={assemblyInteraction} />))}
                    </tbody> </table>
        </div> 

        );
        

    }

}

export default AssemblyInteractions;