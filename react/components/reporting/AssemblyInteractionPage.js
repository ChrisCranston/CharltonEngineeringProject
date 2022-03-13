import React from "react";
import AssemblyInteractions from './AssemblyInteractions.js';
import "./reporting.css";
import Filter from './Filter.js';
import SearchBox from './SearchBox.js';

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

  componentDidMount() {
   
    let url = "http://unn-w18012997.newnumyspace.co.uk/kv6002/php/assemblyinteractionreport?user_names=true"
  
  
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
            this.setState({ userNames: data.results })
        })
        .catch((err) => {
            console.log("something went wrong ", err)
        });
  
    
  
  }
  

  render() {
 
    let userNamesList = [];
    for (var x in this.state.userNames){
        let tempvar = "";
        tempvar = this.state.userNames[x].email_address;
        userNamesList.push(tempvar);
    }
  

    return (
      <div className="main-content">
          <div>
            <div class = "filter-banner">
              <Filter options = {userNamesList} 
              filterType = {"Client Type"} 
              custType={this.state.userName} 
              handleSelect={this.handleUserNameSelect} />

              <SearchBox search={this.state.search} handleSearch={this.handleSearch} />
            </div>
         <AssemblyInteractions userName={this.state.userName} search={this.state.search} />
          </div>
      </div>
    );
  }
}

export default AssemblyInteractionPage;
