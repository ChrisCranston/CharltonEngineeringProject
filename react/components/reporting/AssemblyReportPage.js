import React from "react";
import AssemblyParts from './AssemblyParts.js';
import "./reporting.css";
import SearchBox from './SearchBox.js';

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

  render() {
 
    
    return (
      <div className="main-content">
          <div>
            <div class = "filter-banner">
            <SearchBox search={this.state.search} handleSearch={this.handleSearch} />
            </div>
         <AssemblyParts search={this.state.search} />
          </div>
      </div>
    );
  }
}

export default AssemblyReportPage;
