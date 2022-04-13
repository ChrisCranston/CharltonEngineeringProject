import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";

class AddLocation extends React.Component {
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
        <h2 className="modal-spacer">Add New Location:</h2>
        <form className="modal-form">
          <p>Warehouse number:</p>
          <input
            type="number"
            placeholder="WN:"
            value={this.props.warehouseNumber}
            onChange={this.props.handleWarehouseNumber}
          />
          <p>Location Name:</p>
          <input
            type="text"
            placeholder="Location name"
            value={this.props.name}
            onChange={this.props.handleLocationName}
          />
          <p>Type:</p>
          <input
            type="text"
            placeholder="e.g. pallet / shelf / bin"
            value={this.props.description}
            onChange={this.props.handleType}
          />
          <div className="modal-button">
          <button onClick={this.props.handleAddNewClick}>Add Location!</button>
          <button className="red" onClick={this.props.handleClose}>Cancel</button>
          </div>
          {error}
        </form>
        </div>
      </div>
    );
  }
}

export default AddLocation;
