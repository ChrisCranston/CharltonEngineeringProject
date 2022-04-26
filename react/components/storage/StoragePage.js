import React from "react";
import StoredManager from "./StoredManager.js";
// import VariableNav from "../VariableNav.js";

/**
 * PaperPage
 *
 * This component controls what is being shown on the Storage page of the app at a given time whith.
 *
 * @author Chris Cranston - W18018468
 */
class StoragePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { auth: false };
  }
  render() {
    return (
      <div className="main_content">
        <div className="page_item">
          <StoredManager simtoken={this.props.simtoken}/>
        </div>
      </div>
    );
  }
}

export default StoragePage;

