import React from "react";

/**
 * SignUp
 *
 * This simple component displays the sign up buttons along with props to handle
 * submit and typing into the form. It is used in the ViewingListPage component.
 *
 * @author Chris Cranston - W18018468
 */
class AddLocation extends React.Component {
  render() {
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
            placeholder="pallet / shelf / bin"
            value={this.props.description}
            onChange={this.props.handleType}
          />
          <div className="modal-button">
          <button onClick={this.props.handleAddNewClick}>Add Location!</button>
          <button className="red" onClick={this.props.handleClose}>Cancel</button>
          </div>
          <p>{this.props.error}</p>
        </form>
        </div>
      </div>
    );
  }
}

export default AddLocation;
