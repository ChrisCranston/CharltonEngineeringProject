import React from "react";
import Query from './Query.js';

/**
 * @author Christopher Ewart
 */
class CustomerQuerys extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            results: []
        }
    }

    

    /**
     * componentDidMount
     * 
     * 
     */
    componentDidMount() {
        let url = "http://unn-w18012997.newnumyspace.co.uk/kv6002/php/customerreport"


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




    /**
     * render
     * 
     * return the required components depensing on the flags 
     * passed into this component
     *  
     */
    render() {

        console.log(this.state.results);    
        let noData = ""

        if (this.state.results.length === 0) {
            noData = <p>No data</p>
        }

        let filteredResults = this.state.results

        return(
            <div>
                <table>
                <tr>
                 <th>Name</th>
                 <th>Email</th>
                 <th>Tel</th>
                 <th>Customer Type</th>
                 <th>Query</th>
                 <th>Query Type</th>
                 <th>Date/Time recived</th>
                </tr>

                    {filteredResults.map((query, i) => (<Query className="Query" key={i} query={query} />))}
                    </table>
        </div> 

        );
        

    }

}

export default CustomerQuerys;