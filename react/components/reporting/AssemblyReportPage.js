import React from "react";
import AssemblyParts from './AssemblyParts.js';
import "./reporting.css";
import SearchBox from './SearchBox.js';
import ReactToPrint from "react-to-print";
import ComponentToPrint from './ComponentToPrint.js';

/**
 *
 * @author Chris Ewart - W18012997
 */
class AssemblyReportPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [],
      search: "",
      custType:"",
      queryType:""
    }
    this.handleSearch = this.handleSearch.bind(this);
    
  }

  handleSearch = (e) => {
    this.setState({search:e.target.value})
}

getAppliedFiltersText = () => {
  let tempString = "" 
  if (this.state.search !== ""){
    tempString += "SEARCH STRING: " + this.state.search + " ";
  }
  
  if ((this.state.custType == "")){
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
  render() {
    let appliedFilters = this.getAppliedFiltersText();
    let reportDate = this.getCurrentDateText();
    
    return (
      <div className="main-content">
  
      <div class = "filter-banner">
      <h1>ASSEMBLY REPORT</h1>
      <div class = "inner-grid-reports">
      <div class = "report-button">
      <ReactToPrint
          trigger={() => <button>Genarate Report</button>}
          content={() => this.componentRef}
      />
    <div style={{ display: "none" }}>
      <ComponentToPrint
        ref={(el) => (this.componentRef = el)}
        content={<AssemblyParts search={this.state.search} />}
        filtersApplied = {appliedFilters}
        dateTime = {reportDate}
        reportName = {"Assembly Report"}
      />
      </div>
      </div>
          <div class = "filter-one">
            <SearchBox search={this.state.search} handleSearch={this.handleSearch} />
            </div>
            </div>
            </div>
            
         <AssemblyParts search={this.state.search} />
          </div>
          
    );
  }
}

export default AssemblyReportPage;
