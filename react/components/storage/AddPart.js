import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";

class AddPart extends React.Component {
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
        <h2 className="modal-spacer">Add New Part:</h2>
        <form className="modal-form"> 
          <p>Serial Number<span className="form-asterisk"> *</span>:</p>
          <input
            type="text"
            placeholder="SN:"
            value={this.props.serialNumber}
            onChange={this.props.handleSerialNumber}
          />
          <p>Part Name<span className="form-asterisk"> *</span>:</p>
          <input
            type="text"
            placeholder="name"
            value={this.props.name}
            onChange={this.props.handleName}
          />
          <p>Description:</p>
          <input
            type="text"
            placeholder="(optional)"
            value={this.props.description}
            onChange={this.props.handleDescription}
          />
          <div className="modal-button">
          <button onClick={this.props.handleAddNewClick}>Add Part!</button>
          <button className="red" onClick={this.props.handleClose}>Cancel</button>
          </div>
          {error}
        </form>
        </div>
      </div>
    );
  }
}

export default AddPart;
