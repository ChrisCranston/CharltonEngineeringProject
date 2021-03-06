import React from "react";
import ReactToPrint from "react-to-print";
import ComponentToPrint from "./ComponentToPrint";


class PartButtons extends React.Component {
  render() {
    return (
      <div>
          <ReactToPrint
            trigger={() => <button>Print Part QR</button>}
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
}

export default PartButtons;
