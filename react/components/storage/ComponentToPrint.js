import React from "react";
 
 class ComponentToPrint extends React.PureComponent {
    render() {
      return (
        <div>{this.props.content}</div>
      );
    }
  }

  export default ComponentToPrint