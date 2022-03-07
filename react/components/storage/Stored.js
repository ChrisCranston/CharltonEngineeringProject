import React from "react";
import LocationButtons from "./LocationButtons";
import {ADDEditStored, REMOVEEditStored}  from "./EditStored";

/**
 * Stored
 *
 * This component controls the ouput of each individual Stored item.
 *
 * @author Chris Cranston - W18018468
 */
class Stored extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [],
      edit: "",
      qr: "",
      addNew: "",
      quantityUpdate: 0,
      updateMessage: "",
      confirmation: ""
    };
    this.handleLocationAddClick = this.handleLocationAddClick.bind(this);
    this.handleLocationRemoveClick = this.handleLocationRemoveClick.bind(this);
    this.handlePrintLocationQRClick =
      this.handlePrintLocationQRClick.bind(this);
    this.handleLocationAddNewClick = this.handleLocationAddNewClick.bind(this);
    this.handleQuantityUpdate = this.handleQuantityUpdate.bind(this);
    this.handleUpdateQuantityClick = this.handleUpdateQuantityClick.bind(this);
    this.handleRemoveAllClick = this.handleRemoveAllClick.bind(this);
    this.handleConfirmClick = this.handleConfirmClick.bind(this);
    this.handleDenyClick = this.handleDenyClick.bind(this);
  }

  componentDidMount(){}
  componentDidUpdate(){}

  handleLocationAddClick = () => {
    if (this.state.edit === "" || this.state.edit === "remove") {
      this.setState({ edit: "add" });
    } else {
      this.setState({ edit: "" });
    }
  };

  handleLocationRemoveClick = () => {
    if (this.state.edit === "" || this.state.edit === "add") {
      this.setState({ edit: "remove" });
    } else {
      this.setState({ edit: "" });
    }
  };
  handlePrintLocationQRClick = () => {
    if (this.state.qr === "") {
      this.setState({ qr: "QR TEST" });
    } else {
      this.setState({ qr: "" });
    }
  };

  handleLocationAddNewClick = () => {
    if (this.state.addNew === "") {
      this.setState({ addNew: "addNew" });
    } else {
      this.setState({ addNew: "" });
    }
  };

  handleQuantityUpdate = (e) => {
    this.setState({ quantityUpdate: e.target.value });
  };



  handleUpdateQuantityClick = (e) => {
    let url = "http://localhost/kv6002/php/stored";
    let formData = new FormData();
    formData.append("edit", this.state.edit);
    formData.append("location", this.props.stored_item.storage_location_id);
    formData.append("quantity", this.state.quantityUpdate);
    fetch(url, { method: "POST", headers: new Headers(), body: formData })
      .then((response) => {
        if (response.status === 200 || response.status === 204) {
          this.setState({ edit: "", updateMessage: "Update Succesfull" });
          setTimeout(
            function () {
              this.setState({ updateMessage: "" });
            }.bind(this),
            5000
          );
        } else {
          this.setState({ updateMessage: "Update Failed" });
          throw Error(response.statusText);
        }
      })
      .catch((err) => {
        console.log("something went wrong ", err);
      });
  };
  

  handleRemoveAllClick = (e) => {
    this.setState({confirmation: (
      <div>
        <p>Are you sure you want to remove all items from this location?</p>
      <button onClick={this.handleConfirmClick}>Tick</button>
      <button onClick={this.handleDenyClick}>Cross</button>
      </div>
    )})
    
  }

  handleConfirmClick = (e) => {
    this.state.quantityUpdate = this.props.stored_item.quantity 
    this.handleUpdateQuantityClick()
    this.setState({confirmation: ""})
  }

  handleDenyClick = (e) => {
    this.setState({confirmation: ""}) 
  }

  render() {
    let filteredResults = this.state.results;
    let result = "";
    let edit = "";
    let qr = "";
    let empty = "";
    let confirmation = this.state.confirmation;

    if (this.state.edit === "add") {
      edit = (
        <ADDEditStored
          warehouse={this.props.stored_item.warehouse_number}
          location={this.props.stored_item.location_string}
          qauntity={this.props.stored_item.quantity}
          handleQuantityUpdate={this.handleQuantityUpdate}
          handleUpdateQuantityClick={this.handleUpdateQuantityClick}
        />
      );
    } else if (this.state.edit === "remove") {
      edit = (
        <REMOVEEditStored
          warehouse={this.props.stored_item.warehouse_number}
          location={this.props.stored_item.location_string}
          qauntity={this.props.stored_item.quantity}
          handleQuantityUpdate={this.handleQuantityUpdate}
          handleRemoveAllClick={this.handleRemoveAllClick}
          handleUpdateQuantityClick={this.handleUpdateQuantityClick}
        />
      );
    }

    if (this.state.qr !== "") {
      qr = <p>QR TEST</p>;
    }
    if (this.state.addNew !== "") {
      qr = <p>ADD NEW TEST</p>;
    }

    if (
      this.props.stored_item.serial_number !== null &&
      this.props.stored_item.quantity > 0
    ) {
      empty = (
        <div>
          <p>Serial number: {this.props.stored_item.serial_number} </p>
          <p>Quantity: {this.props.stored_item.quantity} </p>
          <p>Client Name: {this.props.stored_item.client_name} </p>
        </div>
      );
    } else {
      empty = (
        <div>
          <p className="empty">EMPTY </p>
        </div>
      );
    }

    result = (
      <div>
        <div className="location">
          <div className="location_information">
            <p>Warehouse # : {this.props.stored_item.warehouse_number} </p>
            <p>Location: {this.props.stored_item.location_string} </p>
            <p>Storage Type: {this.props.stored_item.storage_type} </p>
          </div>
          {empty}
          <LocationButtons
            quantity={this.props.stored_item.quantity}
            handleLocationAddClick={this.handleLocationAddClick}
            handleLocationRemoveClick={this.handleLocationRemoveClick}
            handlePrintLocationQRClick={this.handlePrintLocationQRClick}
            handleLocationAddNewClick={this.handleLocationAddNewClick}
          />
        </div>
        {this.state.updateMessage}
        {edit}
        {confirmation}
        {qr}
      </div>
    );

    return <div>{result}</div>;
  }
}

export default Stored;
