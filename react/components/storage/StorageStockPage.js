import React from "react";
import StoredManager from "./StoredManager.js";
import SearchBox from "./SearchBox.js";
import AddPart from "./AddPart.js";

/**
 * PaperPage
 *
 * This component controls what is being shown on the Storage page of the app at a given time whith.
 *
 * @author Chris Cranston - W18018468
 */
class StoragePartPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      auth: false,
      search: "",
      page: 1,
      maxpage: 1,
      pageSize: 10,
      addPart: "",
      serialNumber: "",
      name: "",
      description: "",
      addNewError: "",
    };
    this.handleNextClick = this.handleNextClick.bind(this);
    this.handlePreviousClick = this.handlePreviousClick.bind(this);
    this.handlePageSize = this.handlePageSize.bind(this);
    this.handleAddPartClick = this.handleAddPartClick.bind(this);
    this.handleName = this.handleName.bind(this);
    this.handleSerialNumber = this.handleSerialNumber.bind(this);
    this.handleDescription = this.handleDescription.bind(this);
    this.handleAddNewClick = this.handleAddNewClick.bind(this);
  }
  handleAddPartClick = () => {
    if (this.state.addPart === "") {
      this.setState({ addPart: "true" });
    } else {
      this.setState({ addPart: "" });
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
  handleName = (e) => {
    this.setState({ name: e.target.value });
  };
  handleSerialNumber = (e) => {
    this.setState({ serialNumber: e.target.value });
  };
  handleDescription = (e) => {
    this.setState({ description: e.target.value });
  };
  handleAddNewClick = (e) => {
    e.preventDefault();
    this.fetchData();
    this.setState({addPart:""});
  };

  fetchData = () => {
    if (this.state.serialNumber !== "") {
      if (this.state.name !== "") {
        if (this.state.name === ""){
          this.setState({description: "N/A"})
        }
        let url = "http://localhost/kv6002/php/stored";
        let formData = new FormData();
        formData.append("edit", "addPart");
        formData.append("serialNumber", this.state.serialNumber);
        formData.append("name", this.state.name);
        formData.append("description", this.state.description);
        console.log(url)
        fetch(url, {
          method: "POST",
          headers: new Headers(),
          body: formData,
        }).then((response) => {
          if (response.status === 200) {
            return response.json();
          } else {
            throw Error(response.statusText);
          }
        })
        .catch((err) => {
          console.log("something went wrong ", err);
        });
      }
      else {
        this.setState({
          addNewError: "No name provided please try again",
        });
      }
    } else {
      this.setState({
        addNewError: "No serial number provided please try again",
      });
    }
  };

  render() {
    let addPart = "";
    let addNewError = "";

    if( this.state.addNewError !== "") {
      addNewError = (
        <p>{this.state.addNewError}</p>
      )
    }

    if (this.state.addPart === "true") {
      addPart = (
        <AddPart
          handleSerialNumber={this.handleSerialNumber}
          handleName={this.handleName}
          handleDescription={this.handleDescription}
          handleAddNewClick={this.handleAddNewClick}
        />
      );
    }
    return (
      <div className="main_content">
        <div className="page_item">
          <div>
            <button> Scan Part QR</button>
            <button onClick={this.handleAddPartClick}>Add New Part</button>
          </div>
          <div>
            <SearchBox
              name={"Search: "}
              search={this.state.search}
              placeholder={"by serial number or name"}
              handleSearch={this.handleSearch}
            />
          </div>
          {addPart}
          {addNewError}
          <div>
            <StoredManager
              item_type="part"
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

export default StoragePartPage;
