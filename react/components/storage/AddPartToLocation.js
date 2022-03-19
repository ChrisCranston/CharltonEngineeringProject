import React from "react";
import SearchBox from "./SearchBox";
import QrReader  from "modern-react-qr-reader";

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
    this.state = {
      results: [],
      clients: [],
      search: "",
      QRresult: "",
      scannerEnabled: "",
      qrButton: "Scan a part QR",
    };
    this.handleScan = this.handleScan.bind(this);
    this.handleError = this.handleError.bind(this);
    this.handleScannerClick = this.handleScannerClick.bind(this);
  }

  componentDidMount() {
    this.fetchData("http://unn-w18018468.newnumyspace.co.uk/kv6002/php/stored?part_add=true");
    this.fetchData2("http://unn-w18018468.newnumyspace.co.uk/kv6002/php/stored?client_add=true");
  }
  componentWillUnmount() {

  }
  handleScan = (data) => {
    if (data !== null) {
      let qr_return = data.split("=");
      let part_id = qr_return[1];

      this.setState({
        QRresult: part_id,
        scannerEnabled: "",
        qrButton: "Scan a part QR",
      });
    }
  };
  handleError = (error) => {
    console.log(error);
  };

  clearQRSearch = () => {
    this.setState({ QRresult: "" });
  };

  handleScannerClick = (e) => {
    e.preventDefault()
    if (this.state.scannerEnabled === "") {
      this.setState({ scannerEnabled: "true", qrButton: "Close Scanner" });
    } else {
      this.setState({ scannerEnabled: "", qrButton: "Scan a part QR" });
    }
  };

  handleSearch = (e) => {
    this.setState({ search: e.target.value });
  };

  fetchData = (url) => {
    fetch(url)
      .then((response) => {
        if (response.status === 200 || response.status === 204) {
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
  fetchData2 = (url) => {
    fetch(url)
      .then((response) => {
        if (response.status === 200 || response.status === 204) {
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
    if (this.state.QRresult !== "") {
      let name = false
      if (s.part_id === this.state.QRresult) {
        name = true;
      }
      return name;
    } else {
    let search_string = s.serial_number
      .toLowerCase()
      .includes(this.state.search.toLowerCase());
    return search_string;
  }
  };

  render() {
    let qrScanner = "";
    let clearQR = "";
    let searchandscan = "";


    if (this.state.QRresult !== "") {
      clearQR = <button onClick={this.clearQRSearch}>Clear QR Search</button>;
    }

    if (this.state.scannerEnabled !== "") {
      qrScanner = (
        <QrReader onScan={this.handleScan} onError={this.handleError} facingMode={"environment"} style={{ width: '100%' }} />
      );
    } else {
      qrScanner = clearQR;
    }
    if (this.state.QRresult === ""){
      searchandscan = ( <div>
        <div>
        <button onClick={this.handleScannerClick}>
            {this.state.qrButton}
          </button>
        </div>
        <SearchBox
          name={"Search: "}
          search={this.state.search}
          placeholder={"by serial number"}
          handleSearch={this.handleSearch}
        />
      </div> )
    }

    let filteredClientResults = this.state.clients;
    let filteredResults = this.state.results;
    if (filteredResults.length > 0 ) {
      filteredResults = this.state.results.filter(this.filterSearch);
    }

    let selectItem = (
      <div>
        {searchandscan}
        
        <p>Select Part:</p>
        <select onChange={this.props.handleAddPartToLocationSerial}>
      <option value="">Select a part ({filteredResults.length} parts found) </option>
        {filteredResults.map((part, i) => (
          <option key={i} value={part.serial_number}>
            {part.serial_number}{" "}
          </option>
        ))}
      </select>
        <p>Select Client:</p>
        <select onChange={this.props.handleAddPartToLocationClient}>
          <option value=""> Select a client</option>
          {filteredClientResults.map((client, i) => (
            <option key={i} value={client.client_name}>
              {client.client_name}{" "}
            </option>
          ))}
        </select>
      </div>
    );
    return (
      <div className="btn-group-column">
        <h2>Add Part to location:</h2>
        <form>
        {qrScanner}
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