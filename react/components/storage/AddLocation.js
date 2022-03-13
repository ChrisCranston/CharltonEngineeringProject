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
      <div className="btn-group-column">
        <h2>Add New Location:</h2>
        <form>
          <p>Warehouse number:</p>
          <input
            type="text"
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
          <button onClick={this.props.handleAddNewClick}>Add Location!</button>
        </form>
      </div>
    );
  }
}

export default AddLocation;
