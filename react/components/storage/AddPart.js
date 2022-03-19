import React from "react";

/**
 * SignUp
 *
 * This simple component displays the sign up buttons along with props to handle
 * submit and typing into the form. It is used in the ViewingListPage component.
 *
 * @author Chris Cranston - W18018468
 */
class AddPart extends React.Component {
  render() {
    return (
      <div className="btn-group-column">
        <h2>Add New Part:</h2>
        <form>
          <p>Serial Number:</p>
          <input
            type="text"
            placeholder="SN:"
            value={this.props.serialNumber}
            onChange={this.props.handleSerialNumber}
          />
          <p>Part Name:</p>
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
          <button onClick={this.props.handleAddNewClick}>Add Part!</button>
        </form>
      </div>
    );
  }
}

export default AddPart;
