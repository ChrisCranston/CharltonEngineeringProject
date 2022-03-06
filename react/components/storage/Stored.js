import React from "react";
import PartButtons from "./PartButtons";
import LocationButtons from "./LocationButtons";

/**
 * Stored
 *
 * This component controls the ouput of each individual Stored item.
 *
 * @author Chris Cranston - W18018468
 */
class Stored extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      results: []
    };
  }

  render() {
    let filteredResults = this.state.results;

    let result = "";

      let empty = "";
      if (
        this.props.stored_item.serial_number !== null &&
        this.props.stored_item.quantity > 0
      ) {
        empty = (
          <div>
            <p>Serial number: {this.props.stored_item.serial_number} </p>
            <p>Quantity: {this.props.stored_item.quantity} </p>
            <p>Client Name: {this.props.stored_item.client_name} </p>
          </div>
        );
      } else {
        empty = (
          <div>
            <p className="empty">EMPTY </p>
          </div>
        );
      }
      result = (
        <div className="location">
          <div className="location_information">
            <p>Warehouse # : {this.props.stored_item.warehouse_number} </p>
            <p>Location: {this.props.stored_item.location_string} </p>
            <p>Storage Type: {this.props.stored_item.storage_type} </p>
            </div>
            {empty}
            <LocationButtons quantity={this.props.stored_item.quantity}/>
          
        </div>
      );
    

    return <div>{result}</div>;
  }
}

export default Stored;
