import React from "react";

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
      results: [],
    };
  }

  render() {
    let filteredResults = this.state.results;


    return (
      <div className="item">
          <div>
          <p>Serial number:  {this.props.stored_item.serial_number} </p>
          <p>Quantity: {this.props.stored_item.quantity} </p>
          <p>Client Name: {this.props.stored_item.client_name} </p>
          <p>Warehouse # : {this.props.stored_item.warehouse_number} </p>
          <p>Warehouse Location: {this.props.stored_item.location_string} </p>
          </div>
      </div>
    );
  }
}

export default Stored;
