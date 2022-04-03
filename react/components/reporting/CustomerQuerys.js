import React from "react";
import Query from './Query.js';


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
        let url = "http://unn-w18018468.newnumyspace.co.uk/kv6002/php/customerreport"


        fetch(url)
            .then((response) => {
                if (response.status === 200) {
                    return response.json()
                } else {
                    throw Error(response.statusText);
                }
            })
            .then((data) => {
                console.log(data)
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
            <div>
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

                    {filteredResults.map((query, i) => (<Query className="Query" key={i} query={query} />))}
                    </table>
        </div> 

        );
        

    }

}

export default CustomerQuerys;