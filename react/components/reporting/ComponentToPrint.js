import React from "react";
import ReportLogo from "./reporting_images/Charlton_report_logo.jpg"
import StorageLocation from './StorageLocation.js';

class ComponentToPrint extends React.Component {


    render() {
      return (
        <div>
            <img src={ReportLogo} alt="Charlton_report_logo"></img>
            <div>{this.props.reportName}</div>    
            <div>{this.props.dateTime}</div><br/>
            <div><h1>Filters Applied</h1> 
            <p>{this.props.filtersApplied}</p>
            </div>
            <div>{this.props.content}</div>
        </div>
      );
    }
  }

  
export default ComponentToPrint;
  