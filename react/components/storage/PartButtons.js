import React from "react";


class PartButtons extends React.Component {
  render() {
    return (
      <div className="btn-group-column">
          <button onClick={this.props.handlePrintPartQRClick}>Print Part QR</button>
      </div>
    );
  }
}

export default PartButtons;
