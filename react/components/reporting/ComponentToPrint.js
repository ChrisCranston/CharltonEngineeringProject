import React from "react";
import ReportLogo from "./reporting_images/Charlton_report_logo.jpg"

class ComponentToPrint extends React.Component {


    render() {
      return (
        <div className = "report-main">
            <div className = "report-header">
                <img className ="report-image" src={ReportLogo} alt="Charlton_report_logo"></img>
                <div className = "report-name">{this.props.reportName}</div> 
        
                <div className = "report-filters"><p><strong>Filters Applied</strong></p> 
                    <p>{this.props.filtersApplied}</p> 
                </div>
                <div className = "report-date"><p><strong>Date: </strong>{this.props.dateTime}</p></div>
            </div>   
            <div>{this.props.content}</div>
        </div>
      );
    }
  }

  
export default ComponentToPrint;
  