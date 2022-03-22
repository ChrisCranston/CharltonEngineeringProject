import React from "react";

export class ADDEditStored extends React.Component {
  render() {
    return (
      <div className="btn-group-column">
        <h2>Add to Warehouse: {this.props.warehouse} Location: {this.props.location}</h2>
        <p>Current Quantity: {this.props.qauntity}</p>
        <form>
          <p>Number added:</p>
          <input
            type="number"
            placeholder="# to add"
            onChange={this.props.handleQuantityUpdate}
          />
          <button onClick={this.props.handleUpdateQuantityClick}>Update Quantity</button>
          <button onClick={this.props.handleClose}>Cancel</button>
        </form>
      </div>
    );
  }
}


export class REMOVEEditStored extends React.Component {
    render() {
      return (
        <div className="btn-group-column">
        <h2>Remove from Warehouse: {this.props.warehouse} Location: {this.props.location}</h2>
        <p>Current Quantity: {this.props.qauntity}</p>
        <form>
          <p>Number removed:</p>
          <input
            type="number"
            placeholder="# to add"
            onChange={this.props.handleQuantityUpdate}
          />
          <button onClick={this.props.handleUpdateQuantityClick}>Update Quantity</button>
          <br/><br/><button onClick={this.props.handleRemoveAllClick}>Remove All</button>
          <button onClick={this.props.handleClose}>Cancel</button>
        </form>
      </div>
      );
    }
  }
  
export default ADDEditStored;


