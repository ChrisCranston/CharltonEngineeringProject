import React from "react";
import CustomerQuerys from './CustomerQuerys.js';
import "./reporting.css";
import Filter from './Filter.js';
import ReactToPrint from "react-to-print";
import ComponentToPrint from './ComponentToPrint.js';


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
   
    let url = "http://unn-w18018468.newnumyspace.co.uk/kv6002/php/customerreport?clientTypes=true"


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

     let url2 = "http://unn-w18018468.newnumyspace.co.uk/kv6002/php/customerreport?queryTypes=true"


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
getAppliedFiltersText = () => {
  let tempString = "" 
  if (this.state.custType !== ""){
    tempString += "CUST TYPE: " + this.state.custType + " ";
  }

  if (this.state.queryType !== ""){
      tempString += "QUERY TYPE: " + this.state.queryType;

  }

  if ((this.state.custType == "") && (this.state.queryType == "")){
    tempString += "NONE"
  }
  return tempString; 
}


getCurrentDateText = () => {
  const event = new Date();
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  
  let dateTime = event.toLocaleDateString(undefined, options);
  //return dateTime.toString();
  return dateTime;
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

    let appliedFilters = this.getAppliedFiltersText();
    let reportDate = this.getCurrentDateText();
    
    return (
      <div className="main-content">
          <div>
            <div class = "filter-banner">

            <ReactToPrint
                trigger={() => <button>Genarate Report</button>}
                content={() => this.componentRef}
            />
          <div style={{ display: "none" }}>
            <ComponentToPrint
              ref={(el) => (this.componentRef = el)}
              content={ <CustomerQuerys custType={this.state.custType}
              queryType={this.state.queryType} />}
              filtersApplied = {appliedFilters}
              dateTime = {reportDate}
              reportName = {"Customer Query Report"}
            />
            </div>

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
