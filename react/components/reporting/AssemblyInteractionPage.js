import React from "react";
import AssemblyInteractions from './AssemblyInteractions.js';
import "./reporting.css";
import Filter from './Filter.js';
import SearchBox from "../ReusableComponents/SearchBox/SearchBox";
import ReactToPrint from "react-to-print";
import ComponentToPrint from './ComponentToPrint.js';
import URL from "../url.js"

/**
 *
 * @author Chris Ewart - W18012997
 */
class AssemblyInteractionPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [],
      userName:"",
      search: "",
      }

      this.handleUserNameSelect = this.handleUserNameSelect.bind(this);
      this.handleSearch = this.handleSearch.bind(this);
  }


  handleUserNameSelect = (e) => {
    this.setState({userName:e.target.value})   
}

handleSearch = (e) => {
  this.setState({search:e.target.value})
}

cancelSearch = () => {
  this.setState({ search: "" });
};

  componentDidMount() {
   
    let url = URL+"assemblyinteractionreport"
    let formData = new FormData();
    formData.append("token", this.props.simToken);
    formData.append("user_names",true);
    fetch(url, { method: "POST", headers: new Headers(), body: formData })
        .then((response) => {
            if (response.status === 200) {
                return response.json()
            } else {
                throw Error(response.statusText);
            }
        })
        .then((data) => {
            this.setState({ userNames: data.results })
        })
        .catch((err) => {
            console.log("something went wrong ", err)
        });
  
  }
  
  getAppliedFiltersText = () => {
    let tempString = "" 
    if (this.state.userName !== ""){
      tempString += "USER NAME: " + this.state.userName + " ";
    }
  
    if (this.state.search !== ""){
        tempString += "SEARCH STRING: " + this.state.search;
  
    }
  
    if ((this.state.search === "") && (this.state.userName === "")){
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
 
    let userNamesList = [];
    for (var x in this.state.userNames){
        let tempvar = "";
        tempvar = this.state.userNames[x].email_address;
        userNamesList.push(tempvar);
    }
  
    let appliedFilters = this.getAppliedFiltersText();
    let reportDate = this.getCurrentDateText();

    return (
      <div className="main_content">
        <section className="text-center">
          <h2>Assembly Interaction Report</h2>
          <div>
            <p>
              Filter by user ID or search by serial No and name.
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
              content={ <AssemblyInteractions userName={this.state.userName} search={this.state.search} />}
              filtersApplied = {appliedFilters}
              dateTime = {reportDate}
              reportName = {"Assembly Interactions Report"}
            />
            </div>
              <Filter options = {userNamesList} 
              filterType = {"User ID: "} 
              custType={this.state.userName} 
              handleSelect={this.handleUserNameSelect} />
            
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
         <AssemblyInteractions simToken={this.props.simToken} userName={this.state.userName} search={this.state.search} />
      </div>
    );
  }
}

export default AssemblyInteractionPage;
