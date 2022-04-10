import React from "react";
import LocationButtons from "./LocationButtons";
import { ADDEditStored, REMOVEEditStored } from "./EditStored";
import QRCode from "qrcode.react";
import AddPartToLocation from "./AddPartToLocation";
import Modal from "react-modal";

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
      addSerial: "",
      addQuantity: "",
      addClient: "",
      updateError: "",
      moadlIsOpen: true,
      customStyles: {
        content: {
          top: "50%",
          left: "50%",
          right: "auto",
          bottom: "auto",
          marginRight: "-50%",
          transform: "translate(-50%, -50%)",
        },
      },
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
    this.handleAddPartToLocationSerial =
      this.handleAddPartToLocationSerial.bind(this);
    this.handleAddPartToLocationClient =
      this.handleAddPartToLocationClient.bind(this);
    this.handleAddPartQuantity = this.handleAddPartQuantity.bind(this);
    this.handleAddPartToLocationSubmit =
      this.handleAddPartToLocationSubmit.bind(this);
    this.handleModalClose = this.handleModalClose.bind(this);
  }

  handleModalClose = () => {
    this.setState({ moadlIsOpen: false, edit: "" });
  };

  handleLocationAddClick = () => {
    this.setState({ edit: "add", confirmation: "", moadlIsOpen: true });
  };

  handleLocationRemoveClick = (e) => {
    this.setState({ edit: "remove", moadlIsOpen: true });
  };
  handlePrintLocationQRClick = () => {
    if (this.state.qr === "") {
      this.setState({ qr: "QR TEST" });
    } else {
      this.setState({ qr: "" });
    }
  };

  handleLocationAddNewClick = () => {
    this.setState({ addNew: "addNew", moadlIsOpen: true });
  };

  handleQuantityUpdate = (e) => {
    this.setState({ quantityUpdate: e.target.value });
  };

  handleAddPartToLocationSerial = (e) => {
    this.setState({ addSerial: e.target.value });
  };
  handleAddPartToLocationClient = (e) => {
    this.setState({ addClient: e.target.value });
  };
  handleAddPartQuantity = (e) => {
    this.setState({ addQuantity: e.target.value });
  };

  handleAddPartToLocationSubmit = (e) => {
    e.preventDefault();
    if (this.state.addSerial !== "") {
      if (this.state.addClient !== "") {
        if (this.state.addQuantity !== "") {
          let url = "http://unn-w18018468.newnumyspace.co.uk/kv6002/php/stored";
          let formData = new FormData();
          formData.append("edit", "addPartToLocation");
          formData.append(
            "addLocation",
            this.props.stored_item.storage_location_id
          );
          formData.append("addClient", this.state.addClient);
          formData.append("addSerial", this.state.addSerial);
          formData.append("addQuantity", this.state.addQuantity);
          formData.append("user_id", 1);
          fetch(url, { method: "POST", headers: new Headers(), body: formData })
            .then((response) => {
              if (response.status === 200 || response.status === 204) {
                this.setState({ addNew: "", updateMessage: "Add Succesfull" });
                this.props.update();
                setTimeout(
                  function () {
                    this.setState({ updateMessage: "" });
                  }.bind(this),
                  5000
                );
              } else {
                this.setState({
                  updateMessage: "Add Failed",
                  addClient: "",
                  addSerial: "",
                  addQuantity: "",
                });
                throw Error(response.statusText);
              }
            })

            .catch((err) => {
              console.log("something went wrong ", err);
            });
        } else {
          this.setState({
            updateMessage: "No quantity provided please try again",
          });
        }
      } else {
        this.setState({ updateMessage: "No client selected please try again" });
      }
    } else {
      this.setState({
        updateMessage: "No serial number selected please try again",
      });
    }
  };

  fetch2 = (removeAll = false) => {
    if (this.state.quantityUpdate % 1 === 0) {
      if (this.state.quantityUpdate > 0) {
      let url = "http://unn-w18018468.newnumyspace.co.uk/kv6002/php/stored";
      let formData = new FormData();
      formData.append("edit", this.state.edit);
      formData.append("location", this.props.stored_item.storage_location_id);
      formData.append("user_id", 1);
      formData.append(
        "quantity",
        removeAll === true
          ? this.props.stored_item.quantity
          : this.state.quantityUpdate > this.props.stored_item.quantity
          ? this.props.stored_item.quantity
          : this.state.quantityUpdate
      );
      fetch(url, { method: "POST", headers: new Headers(), body: formData })
        .then((response) => {
          if (response.status === 200 || response.status === 204) {
            this.setState({
              edit: "",
              updateMessage: "Update Succesfull",
              updateError: "",
            });
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
    } else {
      this.setState({ updateError: "When adding/removing stock please use a positive number." });
    }
  } else {
    this.setState({ updateError: "When adding/removing stock please use a whole numbers." });
  }
  };

  handleUpdateQuantityClick = (e) => {
    e.preventDefault();
    this.fetch2();
  };

  handleRemoveAllClick = (e) => {
    e.preventDefault();
    this.setState({
      confirmation: (
        <Modal isOpen={this.state.moadlIsOpen} style={this.state.customStyles}>
          <div>
            <p>Are you sure you want to remove all items from this location?</p>
            <button className="green" onClick={this.handleConfirmClick}>Yes</button>
            <button className="red" onClick={this.handleDenyClick}>No</button>
          </div>
        </Modal>
      ),
    });
  };

  handleConfirmClick = (e) => {
    e.preventDefault();
    this.fetch2(true);
    this.setState({ confirmation: "", moadlIsOpen: false });
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
        <Modal isOpen={this.state.moadlIsOpen} style={this.state.customStyles}>
          <ADDEditStored
            warehouse={this.props.stored_item.warehouse_number}
            location={this.props.stored_item.location_string}
            qauntity={this.props.stored_item.quantity}
            handleQuantityUpdate={this.handleQuantityUpdate}
            handleUpdateQuantityClick={this.handleUpdateQuantityClick}
            error= {this.state.updateError}
            handleClose={this.handleModalClose}
          />
        </Modal>
      );
    } else if (this.state.edit === "remove") {
      edit = (
        <Modal isOpen={this.state.moadlIsOpen} style={this.state.customStyles}>
          <REMOVEEditStored
            warehouse={this.props.stored_item.warehouse_number}
            location={this.props.stored_item.location_string}
            qauntity={this.props.stored_item.quantity}
            error= {this.state.updateError}
            handleQuantityUpdate={this.handleQuantityUpdate}
            handleRemoveAllClick={this.handleRemoveAllClick}
            handleUpdateQuantityClick={this.handleUpdateQuantityClick}
            handleClose={this.handleModalClose}
          />
        </Modal>
      );
    }

    if (this.state.addNew !== "") {
      addNew = (
        <Modal isOpen={this.state.moadlIsOpen} style={this.state.customStyles}>
          <AddPartToLocation
            handleAddPartToLocationSerial={this.handleAddPartToLocationSerial}
            handleAddPartToLocationClient={this.handleAddPartToLocationClient}
            handleAddPartQuantity={this.handleAddPartQuantity}
            handleAddPartToLocationSubmit={this.handleAddPartToLocationSubmit}
            error = {this.state.updateMessage}
            handleClose={this.handleModalClose}
          />
        </Modal>
      );
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
      <tr>
        <td>{this.props.stored_item.warehouse_number} </td>
        <td>{this.props.stored_item.location_string} </td>
        <td>{this.props.stored_item.storage_type} </td>
        <td>{empty}</td>
        <td className="buttons">
          {" "}
          <LocationButtons
            qr_code={qr_code}
            location_string={this.props.stored_item.location_string}
            quantity={this.props.stored_item.quantity}
            handleLocationAddClick={this.handleLocationAddClick}
            handleLocationRemoveClick={this.handleLocationRemoveClick}
            handlePrintLocationQRClick={this.handlePrintLocationQRClick}
            handleLocationAddNewClick={this.handleLocationAddNewClick}
          />
        </td>
        {edit}
        {confirmation}
        {addNew}
      </tr>
    );

    return result;
  }
}

export default Stored;
