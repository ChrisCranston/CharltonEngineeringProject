import React from "react";
import StorageLocations from './StorageLocations.js';
import "./reporting.css";
import Filter from './Filter.js';

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
   
  let url = "http://unn-w18012997.newnumyspace.co.uk/kv6002/php/storagereport?warehousenumbers=true"


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

   let url2 = "http://unn-w18012997.newnumyspace.co.uk/kv6002/php/storagereport?clientnames=true"


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

  

    return (
      <div className="main-content">
          <div>
            <div class = "filter-banner">
        <Filter options = {wareHouseNumbersList} 
          filterType = {"Warehouse"} 
          custType={this.state.warehouseNumber} 
          handleSelect={this.handlewarehouseNumberSelect} />

        <Filter options = {clientNamesList} 
          filterType = {"Client Name"} 
          custType={this.state.clientName} 
          handleSelect={this.handleClientNameSelect} />
            </div>
         <StorageLocations warehouseNumber={this.state.warehouseNumber}
          clientName={this.state.clientName} />
          </div>
      </div>
    );
  }
}

export default StorageReportPage;
