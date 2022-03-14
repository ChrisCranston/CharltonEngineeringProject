import React from "react";
import PartButtons from "./PartButtons";
import QRCode from "qrcode.react";

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
    let qr_code = <div style={{margin: '50px'}} ><p>WH: {this.props.stored_item.serial_number} Name: {this.props.stored_item.name}</p><QRCode value={this.props.stored_item.qr_code_string} size={256}/></div>

    let result = "";

      let display = "";
        display = (
          <div>
            <p>Serial number: {this.props.stored_item.serial_number} </p>
            <p>Name: {this.props.stored_item.name} </p>
            <p>Description: {this.props.stored_item.description} </p>
            <PartButtons qr_code={qr_code}/>
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
