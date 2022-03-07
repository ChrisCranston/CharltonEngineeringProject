import React from "react";


class LocationButtons extends React.Component {
  render() {
    let buttons = ""
    if (this.props.quantity <= 0 || this.props.quantity == null){
      buttons = (
        <div className="buttons">
          <button onClick={this.props.handleLocationAddNewClick}>Add Item</button>
          <button onClick={this.props.handlePrintLocationQRClick}>Print Location QR</button>
      </div>
      )
    } else {
      buttons = (
        <div className="buttons">
          <button onClick={this.props.handleLocationAddClick}>Add Quantity</button>
          <button onClick={this.props.handleLocationRemoveClick}>Remove Quantity</button>
          <button onClick={this.props.handlePrintLocationQRClick}>Print Location QR</button>
      </div>
      )
    }
    return (
      <div>{buttons}</div>
      
    );
  }
}

export default LocationButtons;
