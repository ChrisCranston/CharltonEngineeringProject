import React from "react";
import LocationButtons from "./LocationButtons";
import { ADDEditStored, REMOVEEditStored } from "./EditStored";
import QRCode from "qrcode.react";

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
      confirmation: "",
      update: "",
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

  handleLocationAddClick = () => {
    if (this.state.edit === "" || this.state.edit === "remove") {
      this.setState({ edit: "add" });
      this.setState({ confirmation: "" });
    } else {
      this.setState({ edit: "" });
    }
  };

  handleLocationRemoveClick = () => {
    if (this.state.edit === "" || this.state.edit === "add") {
      this.setState({ edit: "remove" });
    } else {
      this.setState({ edit: "" });
      this.setState({ confirmation: "" });
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

  handleUpdateQuantityClick = (e, removeAll = false) => {
    e.preventDefault();
    
    let url = "http://localhost/kv6002/php/stored";
    let formData = new FormData();
    formData.append("edit", this.state.edit);
    formData.append("location", this.props.stored_item.storage_location_id);
    formData.append(
      "quantity",
      removeAll === true || this.state.quantityUpdate > this.props.stored_item.quantity
        ? this.props.stored_item.quantity
        : this.state.quantityUpdate
    );
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
          this.props.update();
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
    e.preventDefault();
    this.setState({
      confirmation: (
        <div>
          <p>Are you sure you want to remove all items from this location?</p>
          <button onClick={this.handleConfirmClick}>Tick</button>
          <button onClick={this.handleDenyClick}>Cross</button>
        </div>
      ),
    });
  };

  handleConfirmClick = (e) => {
    e.preventDefault();
    this.handleUpdateQuantityClick(true);
    this.setState({ confirmation: "" });
  };

  handleDenyClick = (e) => {
    e.preventDefault();
    this.setState({ confirmation: "" });
  };

  render() {
    let result = "";
    let edit = "";
    let empty = "";
    let addNew = "";
    let confirmation = this.state.confirmation;
    let qr_code = (
      <div>
        <p>
          WH: {this.props.stored_item.warehouse_number}:{" "}
          {this.props.stored_item.location_string}
        </p>
        <QRCode value={this.props.stored_item.qr_code_string} size={256} />
      </div>
    );

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

    if (this.state.addNew !== "") {
      addNew = <p>ADD NEW TEST</p>;
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
            qr_code={qr_code}
            location_string={this.props.stored_item.location_string}
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
        {addNew}
      </div>
    );

    return <div>{result}</div>;
  }
}

export default Stored;
