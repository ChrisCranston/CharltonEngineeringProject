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
class Parts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      results: []
    };
  }

  render() {
    let filteredResults = this.state.results;

    let result = "";

      let display = "";
        display = (
          <div>
            <p>Serial number: {this.props.stored_item.serial_number} </p>
            <p>Name: {this.props.stored_item.name} </p>
            <p>Description: {this.props.stored_item.description} </p>
            <PartButtons />
          </div>
        );
      result = (
        <div className="item">
          {display}
        </div>
      );


    return <div>{result}</div>;
  }
}

export default Parts;
