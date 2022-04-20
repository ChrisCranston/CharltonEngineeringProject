import React from "react";
import StorageInteraction from './StorageInteraction.js';


/**
 * @author Christopher Ewart
 */
class StorageInteractions extends React.Component {

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
        let url = "https://charltonengineeringdemo.com/kv6002/php/storageinteractionreport"
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
        s.description.toLowerCase().includes(this.props.search.toLowerCase())
        || s.name.toLowerCase().includes(this.props.search.toLowerCase())
        )
    }

    filterByUserName = (storageInteraction) => {
        if (this.props.custType === "No Filter"){
        return (storageInteraction.email_address !== null)
        }else{
        return ((storageInteraction.email_address === this.props.userName) || (this.props.userName===""))
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
                 <th>Amount</th>
                 <th>Description</th>
                 <th>Warehouse Number</th>
                 <th>Location</th>
                 <th>Storage Type</th>
                 <th>Name</th>
                 <th>First Name</th>
                 <th>Last Name</th>
                 <th>Interaction Date/Time</th>
                 <th>Email Address</th>
                </tr>
                </thead>
                <tbody>
                    {noData}
                    {filteredResults.map((storageInteraction, i) => (<StorageInteraction className="storageInteraction" key={i} storageInteraction={storageInteraction} />))}
                    </tbody></table>
        </div> 

        );
        

    }

}

export default StorageInteractions;