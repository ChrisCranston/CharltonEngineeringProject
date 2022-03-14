import React from "react";
import SearchBox from "./SearchBox";

/**
 * SignUp
 *
 * This simple component displays the sign up buttons along with props to handle
 * submit and typing into the form. It is used in the ViewingListPage component.
 *
 * @author Chris Cranston - W18018468
 */
class AddPartToLocation extends React.Component {
  constructor(props) {
    super(props);
    this.state = { results: [], clients:[], search: "" };
  }

  componentDidMount() {
    this.fetchData("http://localhost/kv6002/php/stored?part_add=true");
    this.fetchData2("http://localhost/kv6002/php/stored?client_add=true")
  }

  handleSearch = (e) => {
    this.setState({ search: e.target.value });
  };

  fetchData = (url, ) => {
    console.log(url);
    fetch(url)
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else if (response.status === 204) {
          alert("No Results with that filter please try again");
        } else {
          throw Error(response.statusText);
        }
      })
      .then((data) => {
        this.setState({ results: data.results });
      })
      .catch((err) => {
        console.log("something went wrong ", err);
      });
  };
  fetchData2 = (url, ) => {
    console.log(url);
    fetch(url)
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else if (response.status === 204) {
          alert("No Results with that filter please try again");
        } else {
          throw Error(response.statusText);
        }
      })
      .then((data) => {
        this.setState({ clients: data.results });
      })
      .catch((err) => {
        console.log("something went wrong ", err);
      });
  };

  filterSearch = (s) => {
    let search_string = s.serial_number
      .toLowerCase()
      .includes(this.state.search.toLowerCase());
    return search_string;
  };

  render() {
    let filteredClientResults = this.state.clients;
    let filteredResults = this.state.results;
    if (filteredResults.length > 0 && this.props.search !== "") {
      filteredResults = this.state.results.filter(this.filterSearch);
    }

    let selectItem = (
      <div>
        
        <div>
          <div>
        <button> Scan Part QR</button>
        </div>
          <SearchBox
            name={"Search: "}
            search={this.state.search}
            placeholder={"by serial number"}
            handleSearch={this.handleSearch}
          />
          
        </div>
        <p>Select Part:</p>
        <select onChange={this.props.handleAddPartToLocationSerial}>
        <option value="" >Select a part </option>
          {filteredResults.map((part, i) => (
            <option key={i} value={part.serial_number} >{part.serial_number} </option>
          ))}
        </select>
        <p>Select Client:</p>
        <select onChange={this.props.handleAddPartToLocationClient}>
        <option value="" > Select a client</option>
          {filteredClientResults.map((client, i) => (
            <option key={i} value={client.client_name} >{client.client_name} </option>
          ))}
        </select>
      </div>
    );
    return (
      <div className="btn-group-column">
        <h2>Add Part to location:</h2>
        <form>
          {selectItem}
          <p>Quantity:</p>
          <input
            type="number"
            placeholder="quantity"
            onChange={this.props.handleAddPartQuantity}
          />
          <button onClick={this.props.handleAddPartToLocationSubmit}>
            Add Part to location!
          </button>
        </form>
      </div>
    );
  }
}

export default AddPartToLocation;
