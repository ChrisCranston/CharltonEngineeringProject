import React from "react";

/**
 * QueryPage
 *
 * This simple component controls what is being shown on the homepage,
 * via the use of props it makes the shows the most simplistic version of a random paper without filter
 * with the preview video shown without needing to click a button.
 * This component calls to PaperManager.
 *
 * @author Kess Strongman 
 */


class QueryForm extends React.Component {
   
    // 

    

  render() {
    return (
        <form className="queryform">
            <p>Name</p>
            <input 
            type="text"
            placeholder="name"
            value={this.props.name}
            onChange={this.props.handleName}
            />
            <p>Who are you?</p>
            <div>
                <input 
                type="radio"
                value="1"
                checked={this.props.selected}
                name="Business" /> Business
                <input type="radio" value="2" name="Individual" /> Individual
            </div>
            <p>Email</p>
            <input 
            type="text"
            placeholder="me@email.com"
            value={this.props.email}
            onChange={this.props.handleEmail}
            />
            <p>Phone</p>
            <input 
            type="text"
            placeholder="please use country code eg.(+44)"
            value={this.props.phone}
            onChange={this.props.handlePhone}
            />
            
            <p>Query Type</p>
            <div>
                <input type="radio" value="1" name="Request Call Back" /> Request Call Back
                <input type="radio" value="2" name="Request Email Back" /> Request Email Back
                <input type="radio" value="3" name="Urgent" /> Urgent
                <input type="radio" value="4" name="Complaint" /> Complaint
            </div>
            
            <p>Query</p>
            <textarea rows="15" cols="50"
            placeholder="Please detail your query here..."
            value={this.props.query}
            onChange={this.props.handleQuery}
            />
           <br>
           </br>
           <button onClick={this.props.handleQuerySubmit}>Submit</button>
        </form>
    );
  }
}
export default QueryForm