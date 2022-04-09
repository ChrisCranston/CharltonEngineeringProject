import React from "react";
import ReactToPrint from "react-to-print";
import ComponentToPrint from "./ComponentToPrint";

class LocationButtons extends React.Component {
  render() {
    let buttons = "";
    if (this.props.quantity <= 0 || this.props.quantity == null) {
      buttons = (
        <div className="buttons">
          <button onClick={this.props.handleLocationAddNewClick}>
            Add Item
          </button>
          <ReactToPrint
            trigger={() => <button>Print Location QR</button>}
            content={() => this.componentRef}
          />
          <div style={{ display: "none" }}>
            <ComponentToPrint
              ref={(el) => (this.componentRef = el)}
              content={this.props.qr_code}
            />
          </div>
        </div>
      );
    } else {
      buttons = (
        <div className="buttons">
          <button onClick={this.props.handleLocationAddClick}>
            Add Quantity
          </button>
          <button onClick={this.props.handleLocationRemoveClick}>
            Remove Quantity
          </button>

          <ReactToPrint
            trigger={() => <button>Print Location QR</button>}
            content={() => this.componentRef}
          />
          <div style={{ display: "none" }}>
            <ComponentToPrint
              ref={(el) => (this.componentRef = el)}
              content={this.props.qr_code}
            />
          </div>
        </div>
      );
    }
    return <div>{buttons}</div>;
  }
}

export default LocationButtons;
