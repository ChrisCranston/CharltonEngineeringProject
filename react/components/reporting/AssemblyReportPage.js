import React from "react";
import AssemblyParts from './AssemblyParts.js';
import "./reporting.css";
import SearchBox from "../ReusableComponents/SearchBox/SearchBox";
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
cancelSearch = () => {
  this.setState({ search: "" });
};

getAppliedFiltersText = () => {
  let tempString = "" 
  if (this.state.search !== ""){
    tempString += "SEARCH STRING: " + this.state.search + " ";
  }
  
  if ((this.state.custType === "")){
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
      <div className="main_content">
   <section className="text-center">
          <h2>Assembly Report</h2>
          <div>
            <p>
              Search for assembly parts by serial number or part name.
            </p>
            <p>
              Click Generate Report to save or print the report.
            </p>
          </div>
        </section>
      <section class = "filter-banner">
      
    <div style={{ display: "none" }}>
      <ComponentToPrint
        ref={(el) => (this.componentRef = el)}
        content={<AssemblyParts simToken={this.props.simToken} search={this.state.search} />}
        filtersApplied = {appliedFilters}
        dateTime = {reportDate}
        reportName = {"Assembly Report"}
      />
      </div>
            <SearchBox
            id="parts-search"
            search={this.state.search}
            handleSearch={this.handleSearch}
            cancelSearch={this.cancelSearch}
            placeholder="Search by name/serial number"
            icon
          />
          <div className="filter-element">
      <ReactToPrint
          trigger={() => <button>Generate Report</button>}
          content={() => this.componentRef}
      />
    </div>
            </section>

            
         <AssemblyParts simToken={this.props.simToken} search={this.state.search} />
          </div>
          
    );
  }
}

export default AssemblyReportPage;
