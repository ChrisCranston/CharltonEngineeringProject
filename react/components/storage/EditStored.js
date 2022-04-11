import React from "react";

export class ADDEditStored extends React.Component {
  render() {
    return (
      <div className="modal-sizing">
        <div className="modal-contents">
        <h2 className="modal-spacer">Add to Warehouse: {this.props.warehouse} Location: {this.props.location}</h2>
        <p>Current Quantity: {this.props.qauntity}</p>
        <form className="modal-form">
          <p>Number to add:</p>
          <input
            type="number"
            placeholder="# to add"
            onChange={this.props.handleQuantityUpdate}
          />
          <div className="modal-button">
          <button onClick={this.props.handleUpdateQuantityClick}>Update Quantity</button>
          <button className="red" onClick={this.props.handleClose}>Cancel</button>
          <p>{this.props.error}</p>
          </div>
        </form>
      </div>
      </div>
    );
  }
}


export class REMOVEEditStored extends React.Component {
    render() {
      return (
        <div className="modal-sizing">
          <div className="modal-contents">
        <h2 className="modal-spacer">Remove from Warehouse: {this.props.warehouse} Location: {this.props.location}</h2>
        <p>Current Quantity: {this.props.qauntity}</p>
        <form className="modal-form">
          <p>Number to remove:</p>
          <input
            type="number"
            placeholder="# to remove"
            onChange={this.props.handleQuantityUpdate}
          />
          <div className="modal-button">
          <button onClick={this.props.handleUpdateQuantityClick}>Update Quantity</button>
          <br/><br/><button className="remove-all" onClick={this.props.handleRemoveAllClick}>Remove All</button>
          <button className="red" onClick={this.props.handleClose}>Cancel</button>
          </div>
          <p>{this.props.error}</p>
        </form>
        </div>
      </div>
      );
    }
  }
  
export default ADDEditStored;


