import React from "react";
import CustomerQuerys from './CustomerQuerys.js';
import "./reporting.css";
import Filter from './Filter.js';

/**
 *
 * @author Chris Ewart - W18012997
 */
class CustomerReportPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [],
      custType:"",
      queryType:""
    }

    this.handleCustTypeSelect = this.handleCustTypeSelect.bind(this);
    this.handleQueryTypeSelect = this.handleQueryTypeSelect.bind(this);
  }


  handleCustTypeSelect = (e) => {
    this.setState({custType:e.target.value})   
}

handleQueryTypeSelect = (e) => {
  this.setState({queryType:e.target.value})   
}
  componentDidMount() {
   
    let url = "http://unn-w18012997.newnumyspace.co.uk/kv6002/php/customerreport?clientTypes=true"


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
            this.setState({ clientTypes: data.results })
        })
        .catch((err) => {
            console.log("something went wrong ", err)
        });

     let url2 = "http://unn-w18012997.newnumyspace.co.uk/kv6002/php/customerreport?queryTypes=true"


    fetch(url2)
        .then((response) => {
            if (response.status === 200) {
                return response.json()
            } else {
                throw Error(response.statusText);
            }
        })
        .then((data) => {
            console.log(data)
            this.setState({ queryTypes: data.results })
        })
        .catch((err) => {
            console.log("something went wrong ", err)
        });

}

  custTypes = [];
  queryTypes = [];

  render() {
 
  
    let clientTypesList = [];
    for (var x in this.state.clientTypes){
        let tempvar = "";
        tempvar = this.state.clientTypes[x].prospective_client_type;
        clientTypesList.push(tempvar);
    }

    let queryTypesList = [];
    for (var x in this.state.queryTypes){
        let tempvar = "";
        tempvar = this.state.queryTypes[x].query_type_name;
        queryTypesList.push(tempvar);
    }

    
    return (
      <div className="main-content">
          <div>
            <div class = "filter-banner">
          <Filter options = {clientTypesList} 
          filterType = {"Client Type"} 
          custType={this.state.custType} 
          handleSelect={this.handleCustTypeSelect} />

          <Filter options = {queryTypesList} 
          filterType = {"Query Type"} 
          custType={this.state.queryType} 
          handleSelect={this.handleQueryTypeSelect} />
            </div>
         <CustomerQuerys custType={this.state.custType}
          queryType={this.state.queryType} />
          </div>
      </div>
    );
  }
}

export default CustomerReportPage;
