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
    let qr_code = <div style={{margin: '50px'}} ><p>Serial Number: {this.props.stored_item.serial_number} Name: {this.props.stored_item.name}</p><QRCode value={this.props.stored_item.qr_code_string} size={256}/></div>

    let result = "";
        result = (
            <tr class="storage-parts-tr">
            <td>{this.props.stored_item.serial_number} </td>
            <td>{this.props.stored_item.name} </td>
            <td>{this.props.stored_item.description} </td>
          <td className="buttons"> <PartButtons qr_code={qr_code}/></td>          
        </tr>

        );


    return result;
  }
}

export default Parts;

