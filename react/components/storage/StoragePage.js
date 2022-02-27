import React from "react";
import StoredManager from "./StoredManager.js";

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
    this.state = {
    };
  }


  render() {
    return (
          <div className="page_item">
            <StoredManager/>
          </div>
    );
  }
}

export default StoragePage;
