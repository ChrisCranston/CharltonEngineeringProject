import React from "react";
import CustomerQuerys from './CustomerQuerys.js';
import "./reporting.css";

/**
 *
 * @author Chris Ewart - W18012997
 */
class CustomerReportPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [],
    };
  }

  render() {
 
    return (
      <div className="main-content">
          <div>
         jkgvhyjguvjygvjytvyjtyjtv
         <CustomerQuerys />
          </div>
      </div>
    );
  }
}

export default CustomerReportPage;
