import React from "react";
import StoredManager from "./StoredManager.js";
import SearchBox from "./SearchBox.js";
import SelectWarehouse from "./SelectWarehouse.js";
import AddLocation from "./AddLocation.js";

/**
 * PaperPage
 *
 * This component controls what is being shown on the Storage page of the app at a given time whith.
 *
 * @author Chris Cranston - W18018468
 */
class StorageManagerPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      auth: false,
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
  }
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
      this.setState({ addLocation: "" });
    }
  };
  handleWarehouseNumber = (e) => {
    this.setState({ warehousenumber: e.target.value });
  };
  handleLocationName = (e) => {
    this.setState({ locationName: e.target.value });
  };
  handleType = (e) => {
    this.setState({ type: e.target.value });
  };
  handleAddNewClick = (e) => {
    e.preventDefault();
    this.fetchData();
    this.setState({addLocation:""});
  };

  fetchData = () => {
    if (this.state.warehousenumber !== "") {
      if (this.state.locationName !== "") {
        if (this.state.type !== "") {
          let url = "http://localhost/kv6002/php/stored";
          let formData = new FormData();
          formData.append("edit", "addLocation");
          formData.append("warehouse", this.state.warehousenumber);
          formData.append("location", this.state.locationName);
          formData.append("type", this.state.type);
          console.log(url);
          fetch(url, {
            method: "POST",
            headers: new Headers(),
            body: formData,
          })
            .then((response) => {
              if (response.status === 200) {
                return response.json();
                
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
          addNewError: "No location Nnme provided please try again",
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
          <div>
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
              item_type="location"
              empty={this.state.empty}
              warehouse={this.state.warehouse}
              search={this.state.search}
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

export default StorageManagerPage;
