import React from "react";
import ClientType from "./ClientTypeClass.js"
import QueryType from "./QueryTypeClass.js"

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
    constructor(props) {
        super(props);
        this.state = {
            clienttypes: [],
            querytypes: [],
        };
    }
    componentDidMount() {
        let clienttypes = [];
        fetch('http://unn-w18018468.newnumyspace.co.uk/kv6002/php/customerquery?tabletoget=clientType')
            .then(response => {
                return response.json();
            }).then(data => {
              clienttypes = data.results.map((client) => {
                return client
            });
            //console.log(clienttypes);
            this.setState({
                clienttypes: clienttypes,
            });
        });
        let querytypes = [];
        fetch('http://unn-w18018468.newnumyspace.co.uk/kv6002/php/customerquery?tabletoget=queryType')
            .then(response => {
                return response.json();
            }).then(data => {
                querytypes = data.results.map((query) => {
                return query
            });
           //console.log(querytypes);
            this.setState({
                querytypes: querytypes,
            });
        });
      }


  render() {

    return (
        <form className="queryform">
            <p>Name:</p>
            <input 
            type="text"
            placeholder="name"
            value={this.props.name}
            onChange={this.props.handleName}
            />
            <p>Are you Business or Individual?</p>
            <ClientType 
                handleClientType={this.props.handleClientType}
                state={this.state}
            />
            <p>Email address:</p>
            <input 
            type="text"
            placeholder="me@email.com"
            value={this.props.email}
            onChange={this.props.handleEmail}
            />
            <p>Country code and Phone number:</p>
            <div>
            <input 
            style={{width:"25px"}}
            type="text"
            placeholder="+44" 
            value={this.props.countrycode}
            onChange={this.props.handleCountryCode}
            />
            <input 
            type="number"
            placeholder="7590153674"
            value={this.props.phone}
            onChange={this.props.handlePhone}
            />
            </div>
            <p>Select a query type:</p>
            <QueryType 
                handleQueryType={this.props.handleQueryType}
                state={this.state}
            />
            
            <p>Query:</p>
            <textarea rows="15" cols="50"
            placeholder="Please detail your query here..."
            value={this.props.query}
            onChange={this.props.handleQuery}
            />
           <br>
           </br>
           <button onClick={this.props.handleQuerySubmit}>Submit</button>
           <h5 id="formResponse" > {this.props.queryerror} </h5>
        </form>
    );
  }
}
export default QueryForm