import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";

export class ADDEditStored extends React.Component {
  render() {
    let error = ""
    if (this.props.error !== "") {
      error = (<p className="form-error">
      <FontAwesomeIcon
        className="form-error-icon error-icon"
        icon={faExclamationTriangle}
      />
    {this.props.error}</p>)
    }

    return (
      <div className="modal-sizing">
        <div className="modal-contents">
        <h2 className="modal-spacer">Add to Warehouse: {this.props.warehouse} Location: {this.props.location}</h2>
        <p>Current Quantity: {this.props.qauntity}</p>
        <form className="modal-form">
          <p>Number to add<span className="form-asterisk">*</span>:</p>
          <input
            type="number"
            placeholder="# to add"
            onChange={this.props.handleQuantityUpdate}
          />
          <div className="modal-button">
          <button onClick={this.props.handleUpdateQuantityClick}>Update Quantity</button>
          <button className="red" onClick={this.props.handleClose}>Cancel</button>
          {error}
          </div>
        </form>
      </div>
      </div>
    );
  }
}


export class REMOVEEditStored extends React.Component {
    render() {
      let error = ""
    if (this.props.error !== "") {
      error = (<p className="form-error">
      <FontAwesomeIcon
        className="form-error-icon error-icon"
        icon={faExclamationTriangle}
      />
    {this.props.error}</p>)
    }

      return (
        <div className="modal-sizing">
          <div className="modal-contents">
        <h2 className="modal-spacer">Remove from Warehouse: {this.props.warehouse} Location: {this.props.location}</h2>
        <p>Current Quantity: {this.props.qauntity}</p>
        <form className="modal-form">
          <p>Number to remove<span className="form-asterisk">*</span>:</p>
          <input
            type="number"
            placeholder="# to remove"
            onChange={this.props.handleQuantityUpdate}
          />
          <div className="modal-button">
          <button onClick={this.props.handleUpdateQuantityClick}>Update Quantity</button>
          <br/><br/><button className="red" onClick={this.props.handleRemoveAllClick}>Remove All</button>
          <button className="red" onClick={this.props.handleClose}>Cancel</button>
          </div>
          {error}
        </form>
        </div>
      </div>
      );
    }
  }
  
export default ADDEditStored;


