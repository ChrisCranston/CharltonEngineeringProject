import React from "react";
import ReactToPrint from "react-to-print";
import ComponentToPrint from "./ComponentToPrint";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCirclePlus,
  faCircleMinus,
} from "@fortawesome/free-solid-svg-icons";

class LocationButtons extends React.Component {
  render() {
    let buttons = "";
    if (this.props.quantity <= 0 || this.props.quantity == null) {
      buttons = (
        <div className="part-buttons part-vertical-buttons">
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
        <div className="">
        <div className="part-buttons part-quantity-buttons">
          <button onClick={this.props.handleLocationAddClick}>
            <FontAwesomeIcon
            className="quantity-icon add-quantity-icon"
          icon={faCirclePlus}
          />
          </button>
          <button onClick={this.props.handleLocationRemoveClick}>
          <FontAwesomeIcon
          className="quantity-icon remove-quantity-icon"
            icon={faCircleMinus}
            />
          </button>
        </div>
        <div >
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
        </div>

      );
    }
    return <div>{buttons}</div>;
  }
}

export default LocationButtons;
