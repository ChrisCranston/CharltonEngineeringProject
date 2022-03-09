import React from "react";
import QueryForm from "./QueryForm"

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


class QueryPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
        failedsubmit: false,
        submiterror: "",
        name: "",
        businesstype: "",
        email: "",
        phone: "",
        querytype: "",
        query: ""
    }
    this.handleName = this.handleEmail.bind(this)
    this.handleBusinessType = this.handleBusinessType.bind(this)
    this.handleEmail = this.handleEmail.bind(this)
    this.handlePhone = this.handlePhone.bind(this)
    this.handleQueryType = this.handleQueryType.bind(this)
    this.handleQuery = this.handleQuery.bind(this)
}

handleName = (e) => {
    this.setState({name: e.target.value});
}
handleBusinessType = (e) => {
    this.setState({businesstype: e.target.value});
}
handleEmail = (e) => {
    this.setState({email: e.target.value});
}
handlePhone = (e) => {
    this.setState({phone: e.target.value});
}
handleQueryType = (e) => {
    this.setState({querytype: e.target.value});
}
handleQuery = (e) => {
    this.setState({query: e.target.value});
}

handleQuerySubmit = (e) => {
  e.preventDefault();
  let pattern = /[a-zA-Z0-9]+([a-zA-Z0-9]+)?[@][a-z][a-z]/g;
  if (pattern.test(this.state.email)) {
      this.setState({submiterror: ""});
      let url = ""
      let formData = new FormData();
      formData.append("name", this.state.name)
      formData.append("businesstype", this.state.businesstype)
      formData.append("email", this.state.email)
      formData.append("phone", this.state.phone)
      formData.append("querytype", this.state.querytype)
      formData.append("query", this.state.query)
    
      fetch(url, { method: "POST", headers: new Headers(), body: formData })
      .then((response) => {
          if (response.status === 200) {
              return response.json();
          } else {
              throw Error(response.statusText);
          }
      })
      .catch((err) => {
          console.log("something went wrong, ", err);
          this.setState({
              failedSubmit: true,
              submiterror: "Incorrect entries"
          })
      })
  } else {
      this.setState({
          failedsubmit: true,
          submiterror: "invalid email address"
      })
  }
}

  render() {
    return (
      <div className="background">
        <div className="main_content">
          <div className="contactushero">
          <h1>Contact Us</h1>
            <div className="contactus1">
              <div>
                <p> Charlton Engineering Services Limited</p>
                <p> Unit 9, Harvey Close</p>
                <p> Crowther Industrial Estate</p>
                <p> Washington</p>
                <p> Tyne & Wear</p>
                <p> NE38 0AB</p>
              </div>
            </div>
            <div className="contactus2">
              <div>
              <p>Tel: 0191 4163099</p>
              <p>Email: info@charltoneng.co.uk</p>
              </div>
            </div> 
          </div>
          <aside id="customerquery">
            <div>
              <h2>Customer Queries</h2>
            <p>Use the form to send us a message and We'll get back to you ASAP</p>
            <p>Alternatively leave some feedback so we can improve our service</p>
            </div>
            <br></br>
            <div className="formArea">
              <QueryForm 
              handleName={this.handleName}
              handleBusinessType={this.handleBusinessType}
              handleEmail={this.handleEmail}
              handlePhone={this.handlePhone}
              handleQueryType={this.handleQueryType}
              handleQuery={this.handleQuery}
              />
            </div>
          </aside>
        </div>
      </div>
    );
  }
}

export default QueryPage;
