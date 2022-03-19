import React from "react";
import StoredManager from "./StoredManager.js";
import SearchBox from "./SearchBox.js";
import SelectWarehouse from "./SelectWarehouse.js";
import AddLocation from "./AddLocation.js";
import QrReader from "modern-react-qr-reader";

/**
 * PaperPage
 *
 * This component controls what is being shown on the Storage page of the app at a given time whith.
 *
 * @author Chris Cranston - W18018468
 */
class StorageLocationPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      auth: false,
      key: 1,
      search: "",
      page: 1,
      maxpage: 1,
      pageSize: 10,
      warehouse: "",
      empty: "",
      addLocation: "",
      warehousenumber: "",
      type: "",
      locationName: "",
      QRresult: "",
      scannerEnabled: "",
      qrButton: "Scan a location QR",
    };
    this.handleNextClick = this.handleNextClick.bind(this);
    this.handlePreviousClick = this.handlePreviousClick.bind(this);
    this.handlePageSize = this.handlePageSize.bind(this);
    this.handleWarehouseSelect = this.handleWarehouseSelect.bind(this);
    this.handleShowEmpty = this.handleShowEmpty.bind(this);
    this.handleAddLocation = this.handleAddLocation.bind(this);
    this.handleWarehouseNumber = this.handleWarehouseNumber.bind(this);
    this.handleLocationName = this.handleLocationName.bind(this);
    this.handleType = this.handleType.bind(this);
    this.handleAddNewClick = this.handleAddNewClick.bind(this);
    this.handleScan = this.handleScan.bind(this);
    this.handleError = this.handleError.bind(this);
    this.handleScannerClick = this.handleScannerClick.bind(this);
    this.existingcheck = this.existingcheck.bind(this);
  }
  handleScan = (data) => {
    if (data !== null) {
      let qr_return = data.split("=");
      if (qr_return[0] === "location"){
      let location_id = qr_return[1];
      

      this.setState({
        QRresult: location_id,
        scannerEnabled: "",
        qrButton: "Scan a location QR",
      });
    }
    }
  };
  handleError = (error) => {
    console.log(error);
  };
  clearQRSearch = () => {
    this.setState({ QRresult: "" });
  };
  handleScannerClick = () => {
    if (this.state.scannerEnabled === "") {
      this.setState({ scannerEnabled: "true", qrButton: "Close Scanner" });
    } else {
      this.setState({ scannerEnabled: "", qrButton: "Scan a location QR" });
    }
  };

  handleSearch = (e) => {
    this.setState({ search: e.target.value });
    this.setState({ page: 1 });
  };
  handlePageSize = (e) => {
    this.setState({ pageSize: e.target.value });
    this.setState({ page: 1 });
  };

  handleNextClick = () => {
    this.setState({ page: this.state.page + 1 });
  };
  handlePreviousClick = () => {
    this.setState({ page: this.state.page - 1 });
  };
  handleWarehouseSelect = (e) => {
    this.setState({ warehouse: e.target.value });
    this.setState({ page: 1 });
  };
  handleShowEmpty = () => {
    if (this.state.empty === "") {
      this.setState({ empty: "true" });
    } else {
      this.setState({ empty: "" });
    }
  };
  handleAddLocation = () => {
    if (this.state.addLocation === "") {
      this.setState({ addLocation: "true" });
    } else {
      this.setState({
        addLocation: "",
        warehousenumber: "",
        locationNam: "",
        type: "",
        addNewError: "",
      });
    }
  };
  handleWarehouseNumber = (e) => {
    this.setState({ warehousenumber: e.target.value });
  };
  outOfEmpties = () => {
    this.setState({ empty: "" });
  };
  handleLocationName = (e) => {
    this.setState({ locationName: e.target.value });
  };
  handleType = (e) => {
    this.setState({ type: e.target.value });
  };
  handleAddNewClick = (e) => {
    e.preventDefault();
    this.setState({addNewError: ""});
    this.existingcheck();
  };

  existingcheck = () => {
    if (this.state.warehousenumber !== "") {
      if (this.state.locationName !== "") {
        if (this.state.type !== "") {
          let url = "http://unn-w18018468.newnumyspace.co.uk/kv6002/php/stored";
          let formData = new FormData();
          formData.append("edit", "checklocation");
          formData.append("warehouse", this.state.warehousenumber);
          formData.append("location", this.state.locationName);
          fetch(url, {
            method: "POST",
            headers: new Headers(),
            body: formData,
          })
            .then((response) => {
              if (response.status === 204) {
                this.fetchData();
              } else {
                this.setState({
                  addNewError:
                    "Location already exists, please check values and try again",
                });
                return false;
              }
            })
            .catch((err) => {
              console.log("something went wrong ", err);
            });
        } else {
          this.setState({ addNewError: "No type provided please try again" });
        }
      } else {
        this.setState({
          addNewError: "No location Name provided please try again",
        });
      }
    } else {
      this.setState({
        addNewError: "No warehouse number provided please try again",
      });
    }
  };

  fetchData = () => {
    if (this.state.warehousenumber !== "") {
      if (this.state.locationName !== "") {
        if (this.state.type !== "") {
          let url = "http://unn-w18018468.newnumyspace.co.uk/kv6002/php/stored";
          let formData = new FormData();
          formData.append("edit", "addLocation");
          formData.append("warehouse", this.state.warehousenumber);
          formData.append("location", this.state.locationName);
          formData.append("type", this.state.type);
          fetch(url, {
            method: "POST",
            headers: new Headers(),
            body: formData,
          })
            .then((response) => {
              if (response.status === 200 || response.status === 204) {
                this.setState({
                  addLocation: "",
                  warehousenumber: "",
                  locationNam: "",
                  type: "",
                  addNewError: "",
                });
                this.setState({ key: Math.random() });
              } else {
                throw Error(response.statusText);
              }
            })
            .catch((err) => {
              console.log("something went wrong ", err);
            });
        } else {
          this.setState({ addNewError: "No type provided please try again" });
        }
      } else {
        this.setState({
          addNewError: "No location Name provided please try again",
        });
      }
    } else {
      this.setState({
        addNewError: "No warehouse number provided please try again",
      });
    }
  };

  render() {
    let showEmpty = "";
    let addLocation = "";
    let addNewError = "";
    let qrScanner = "";
    let clearQR = "";

    if (this.state.QRresult !== "") {
      clearQR = <button onClick={this.clearQRSearch}>Clear QR Search</button>;
    }
    if (this.state.scannerEnabled !== "") {
      qrScanner = (
        <QrReader
          onScan={this.handleScan}
          onError={this.handleError}
          facingMode={"environment"}
          style={{ width: "100%" }}
        />
      );
    } else {
      qrScanner = clearQR;
    }

    if (this.state.addNewError !== "") {
      addNewError = <p>{this.state.addNewError}</p>;
    }

    if (this.state.empty === "") {
      showEmpty = (
        <button onClick={this.handleShowEmpty}>Show Empty Only</button>
      );
    } else {
      showEmpty = <button onClick={this.handleShowEmpty}>Show All</button>;
    }

    if (this.state.addLocation === "true") {
      addLocation = (
        <AddLocation
          handleWarehouseNumber={this.handleWarehouseNumber}
          handleLocationName={this.handleLocationName}
          handleType={this.handleType}
          handleAddNewClick={this.handleAddNewClick}
        />
      );
    }
    return (
      <div className="main_content">
        <div className="page_item">
          {qrScanner}
          <div>
            <button onClick={this.handleScannerClick}>
              {this.state.qrButton}
            </button>
            <button onClick={this.handleAddLocation}>Add Location</button>
          </div>
          <div>
            <SearchBox
              name={"Search: "}
              search={this.state.search}
              placeholder={"by location"}
              handleSearch={this.handleSearch}
            />
            <SelectWarehouse
              warehouse={this.state.warehouse}
              handleWarehouseSelect={this.handleWarehouseSelect}
            />
            {showEmpty}
            {addLocation}
            {addNewError}
          </div>
          <div>
            <StoredManager
            key ={this.state.key}
              item_type="location"
              empty={this.state.empty}
              outOfEmpties={this.outOfEmpties}
              warehouse={this.state.warehouse}
              search={this.state.search}
              qrSearch={this.state.QRresult}
              page={this.state.page}
              pageSize={this.state.pageSize}
              handleNextClick={this.handleNextClick}
              handlePreviousClick={this.handlePreviousClick}
              handlePageSize={this.handlePageSize}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default StorageLocationPage;