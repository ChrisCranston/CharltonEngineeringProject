import React from "react";
import StorageLocations from './StorageLocations.js';
import "./reporting.css";
import Filter from './Filter.js';
import ReactToPrint from "react-to-print";
import ComponentToPrint from './ComponentToPrint.js';

/**
 *
 * @author Chris Ewart - W18012997
 */
class StorageReportPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [],
      search: "",
      warehouseNumber:"",
      clientName:""
    }
    this.handlewarehouseNumberSelect = this.handlewarehouseNumberSelect.bind(this);
    this.handleClientNameSelect = this.handleClientNameSelect.bind(this);
  }

  handlewarehouseNumberSelect = (e) => {
    this.setState({warehouseNumber:e.target.value})   
}

handleClientNameSelect = (e) => {
  this.setState({clientName:e.target.value})   
}

componentDidMount() {
   
  let url = "http://unn-w18018468.newnumyspace.co.uk/kv6002/php/storagereport?warehousenumbers=true"


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
          this.setState({ wareHouseNumbers: data.results })
      })
      .catch((err) => {
          console.log("something went wrong ", err)
      });

   let url2 = "http://unn-w18018468.newnumyspace.co.uk/kv6002/php/storagereport?clientnames=true"


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
          this.setState({ clientNames: data.results })
      })
      .catch((err) => {
          console.log("something went wrong ", err)
      });

}

getAppliedFiltersText = () => {
  let tempString = "" 
  if (this.state.warehouseNumber !== ""){
    tempString += "WAREHOUSE NUMBER: " + this.state.warehouseNumber + " ";
  }

  if (this.state.clientName !== ""){
      tempString += "CLIENT NAME: " + this.state.clientName;

  }

  if ((this.state.clientName == "") && (this.state.warehouseNumber == "")){
    tempString += "NONE"
  }
  return tempString; 
}


getCurrentDateText = () => {
  const event = new Date();
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  
  let dateTime = event.toLocaleDateString(undefined, options);
  return dateTime;
}
  wareHouseNumbers = [];
  clientNames = [];

  render() {
 

    let wareHouseNumbersList = [];
    for (var x in this.state.wareHouseNumbers){
        let tempvar = "";
        tempvar = this.state.wareHouseNumbers[x].warehouse_number;
        wareHouseNumbersList.push(tempvar);
    }
 

    let clientNamesList = [];
    for (var x in this.state.clientNames){
        let tempvar = "";
        tempvar = this.state.clientNames[x].client_name;
        clientNamesList.push(tempvar);
    }

    let appliedFilters = this.getAppliedFiltersText();
    let reportDate = this.getCurrentDateText();



    return (
      <div className="main-content">
          <div>
            
            <div class = "filter-banner">
            <h1>STORAGE REPORTS PAGE</h1>
            <div class = "inner-grid-reports">
            <div class = "report-button">
            <ReactToPrint
                trigger={() => <button>Genarate Report</button>}
                content={() => this.componentRef}
            />

          <div style={{ display: "none" }}>
            <ComponentToPrint
              ref={(el) => (this.componentRef = el)}
              content={ <StorageLocations warehouseNumber={this.state.warehouseNumber}
              clientName={this.state.clientName}/>}
              filtersApplied = {appliedFilters}
              dateTime = {reportDate}
              reportName = {"Storage Report"}
            />
            </div>
            </div>
            
            <div class = "filter-one">
        <Filter options = {wareHouseNumbersList} 
          filterType = {"Warehouse: "} 
          custType={this.state.warehouseNumber} 
          handleSelect={this.handlewarehouseNumberSelect} />
         
          
        <Filter options = {clientNamesList} 
          filterType = {"Client Name: "} 
          custType={this.state.clientName} 
          handleSelect={this.handleClientNameSelect} />
            </div>
            </div>
            </div>
         <StorageLocations warehouseNumber={this.state.warehouseNumber}
          clientName={this.state.clientName} />
          
          </div>
      </div>
    );
  }
}

export default StorageReportPage;
