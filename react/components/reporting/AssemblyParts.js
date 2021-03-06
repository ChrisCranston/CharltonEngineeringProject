import React from "react";
import AssemblyPart from './AssemblyPart.js';
import URL from "../url.js"


/**
 * @author Christopher Ewart
 */
class AssemblyParts extends React.Component {

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
        let url = URL+"assemblyreport"
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
                 <th>Notes</th>
                 <th>Quantity</th>
                 <th>Low Warning</th>
                 <th>Order Link</th>
                </tr>
                </thead>
                <tbody>
                    {noData}
                    {filteredResults.map((assemblyPart, i) => (<AssemblyPart className="AssemblyPart" key={i} assemblyPart={assemblyPart} />))}
                    </tbody></table>
        </div> 

        );
        

    }

}

export default AssemblyParts;