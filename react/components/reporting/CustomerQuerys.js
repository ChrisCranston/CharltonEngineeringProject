import React from "react";
import Query from './Query.js';
import URL from "../url.js"


/**
 * @author Christopher Ewart
 */
class CustomerQuerys extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            results: [],
            custType:"",
            queryType:""

        }

        
    }



    /**
     * componentDidMount
     * 
     * 
     */
    componentDidMount() {
        let url = URL+"customerreport"
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

    filterByCustType = (query) => {
        if (this.props.custType === "No Filter"){
        return (query.prospective_client_type !== null)
        }else{
        return ((query.prospective_client_type === this.props.custType) || (this.props.custType===""))
        }
    }

    filterByQueryType = (query) => {
        if (this.props.queryType === "No Filter"){
        return (query.query_type_name !== null)
        }else{
        return ((query.query_type_name === this.props.queryType) || (this.props.queryType===""))
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
        
        
        if (this.props.custType !== undefined) {
            filteredResults = filteredResults.filter(this.filterByCustType)
        }  
      
        if (this.props.queryType !== undefined) {
            filteredResults = filteredResults.filter(this.filterByQueryType)
        } 


        return(
            <div className="reporting_table_wrapper">
                <table>
                <thead>
                <tr>
                 <th>Name</th>
                 <th>Email</th>
                 <th>Tel</th>
                 <th>Customer Type</th>
                 <th>Query</th>
                 <th>Query Type</th>
                 <th>Date/Time recived</th>
                </tr>
                </thead>
                <tbody>
                    {noData}
                    {filteredResults.map((query, i) => (<Query className="Query" key={i} query={query} />))}
                    </tbody></table>
        </div> 

        );
        

    }

}

export default CustomerQuerys;