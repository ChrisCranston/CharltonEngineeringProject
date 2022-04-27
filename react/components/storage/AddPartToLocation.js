import React from "react";
import SearchBox from "../ReusableComponents/SearchBox/SearchBox"
import QrReader from "modern-react-qr-reader";
import Modal from "react-modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import URL from "../url.js"

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
      customStyles: {
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
        },},
      moadlIsOpen: true,
    };
    this.handleScan = this.handleScan.bind(this);
    this.handleError = this.handleError.bind(this);
    this.handleScannerClick = this.handleScannerClick.bind(this);
    this.handleModalClose = this.handleModalClose.bind(this);
  }

  componentDidMount() {
    this.fetchData(
      URL+"stored"
    );
    this.fetchData2(
      URL+"stored"
    );
  }
  componentWillUnmount() {}
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
  handleModalClose = () => {
    this.setState({ moadlIsOpen: false, qrButton: "Scan a part QR" });
  };

  clearQRSearch = () => {
    this.setState({ QRresult: "" });
  };
  cancelSearch = () => {
    this.setState({ search: "" });
  };

  handleScannerClick = (e) => {
    e.preventDefault();
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
    let formData = new FormData();
    formData.append("token", this.props.simToken);
    formData.append("part_add",true);
    formData.append("simulate_get", "GET")
    fetch(url, { method: "POST", headers: new Headers(), body: formData })
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
    let formData = new FormData();
    formData.append("token", this.props.simToken);
    formData.append("client_add",true);
    formData.append("simulate_get", "GET")
    fetch(url, { method: "POST", headers: new Headers(), body: formData })
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
      let name = false;
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

    let error = ""
    if (this.props.error !== "") {
      error = (<p className="form-error">
      <FontAwesomeIcon
        className="form-error-icon error-icon"
        icon={faExclamationTriangle}
      />
    {this.props.error}</p>)
    }

    if (this.state.QRresult !== "") {
      clearQR = <button onClick={this.clearQRSearch}>Clear QR Search</button>;
    }

    if (this.state.scannerEnabled !== "") {
      qrScanner = (
        <Modal isOpen={this.state.moadlIsOpen} style={this.state.customStyles}>
          <div className="modal-sizing-qr">
          <QrReader
            onScan={this.handleScan}
            onError={this.handleError}
            facingMode={"environment"}
            style={{ width: "auto" }}
          />
          </div>
          <div className="modal-button">
          <button className="red" onClick={this.handleModalClose}>Cancel</button>
          </div>
          
        </Modal>
      );
    } else {
      qrScanner = clearQR;
    }
    if (this.state.QRresult === "") {
      searchandscan = (
        <div className="modal-spacer" >
          <div className="modal-form">
            <button onClick={this.handleScannerClick}>
              {this.state.qrButton}
            </button>
          </div>
          <SearchBox
            id="stored-parts-search"
            search={this.state.search}
            cancelSearch={this.cancelSearch}
            placeholder={"by serial number"}
            handleSearch={this.handleSearch}
            icon
          />
        </div>
      );
    }

    let filteredClientResults = this.state.clients;
    let filteredResults = this.state.results;
    if (filteredResults.length > 0) {
      filteredResults = this.state.results.filter(this.filterSearch);
    }

    let selectItem = (
      <div className="modal-scanner">
        {searchandscan}

        <p>Select Part<span className="form-asterisk"> *</span>:</p>
        <select onChange={this.props.handleAddPartToLocationSerial}>
          <option value="">
            Select a part ({filteredResults.length} parts found){" "}
          </option>
          {filteredResults.map((part, i) => (
            <option key={i} value={part.serial_number}>
              {part.serial_number}{" "}
            </option>
          ))}
        </select>
        <p>Select Client<span className="form-asterisk"> *</span>:</p>
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
      <div className="modal-sizing">
        <div className="modal-contents-add">
        <h2 className="modal-spacer">Add Part to location:</h2>
        <form className="modal-form">
          {qrScanner}
          {selectItem}
          <p>Quantity<span className="form-asterisk"> *</span>:</p>
          <input
            type="number"
            placeholder="quantity"
            onChange={this.props.handleAddPartQuantity}
          />
          <div className="modal-button">
          <button type="submit" onClick={this.props.handleAddPartToLocationSubmit}>
            Add Part to location!
          </button>
          <button className="red" onClick={this.props.handleClose}>Cancel</button>
          </div>
          {error}
        </form>
        </div>
      </div>
    );
  }
}

export default AddPartToLocation;
