import React from "react";
import ReportLogo from "./reporting_images/Charlton_report_logo.jpg"
import StorageLocation from './StorageLocation.js';

class ComponentToPrint extends React.Component {


    render() {
      return (
        <div class = "report-main">
            <div class = "report-header">
                <img class ="report-image" src={ReportLogo} alt="Charlton_report_logo"></img>
                <div class = "report-name">{this.props.reportName}</div> 
        
                <div class = "report-filters"><p><strong>Filters Applied</strong></p> 
                    <p>{this.props.filtersApplied}</p> 
                </div>
                <div class = "report-date"><p><strong>Date: </strong>{this.props.dateTime}</p></div>
            </div>   
            <div>{this.props.content}</div>
        </div>
      );
    }
  }

  
export default ComponentToPrint;
  