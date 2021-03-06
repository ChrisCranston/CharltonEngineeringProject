import React from "react";
import QueryForm from "./QueryForm";
import URL from "../url.js"

/**
 * QueryPage
 *
 * This second page is shown under the "contact us" tab.
 * It displays information about the company and presents a form that the customer can use to contact CE
 * The form is generated in a separate component that returns the values to this page to be processed and
 * sent via API to the data base.
 * A token is also submitted as part of the formdata. This is to prevent the database being injected with
 * an overload of queries from a bot as the data will only be accepted from this site with the token seen.
 * Upon a successful submit the user is shown a positive message. Should the query fail they are shown an
 * appropriate error message.
 *
 * @author Kess Strongman
 */

class QueryPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      failedsubmit: false,
      submiterror: "",
      name: "",
      clienttype: 1,
      email: "",
      phone: "",
      countrycode: "",
      querytype: 1,
      query: "",
    };
    this.handleName = this.handleName.bind(this);
    this.handleClientType = this.handleClientType.bind(this);
    this.handleEmail = this.handleEmail.bind(this);
    this.handlePhone = this.handlePhone.bind(this);
    this.handleQueryType = this.handleQueryType.bind(this);
    this.handleQuery = this.handleQuery.bind(this);
    this.handleQuerySubmit = this.handleQuerySubmit.bind(this);
  }

  handleName = (e) => {
    this.setState({ name: e.target.value });
  };
  handleClientType = (e) => {
    this.setState({ clienttype: e.target.value });
  };
  handleEmail = (e) => {
    this.setState({ email: e.target.value });
  };
  handleCountryCode = (e) => {
    this.setState({ countrycode: e.target.value });
  };
  handlePhone = (e) => {
    this.setState({ phone: e.target.value });
  };
  handleQueryType = (e) => {
    this.setState({ querytype: e.target.value });
  };
  handleQuery = (e) => {
    this.setState({ query: e.target.value });
  };

  handleQuerySubmit = (e) => {
    
    e.preventDefault();
    let pattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    let countrycodePattern = /^[+]{0,1}[0-9]{1,4}$/g;
    if (this.state.email === "" && this.state.phone === "") {
      this.setState({
        failedsubmit: true,
        submiterror: "Please fill in either your email address or phone number",
      });
    } else if (this.state.query === "") {
      this.setState({
        failedsubmit: true,
        submiterror: "Please fill in your query",
      });
    } else if (this.state.name === "") {
      this.setState({
        failedsubmit: true,
        submiterror: "Please fill in your name",
      });
    } else if (this.state.phone !== "" && (this.state.countrycode === "" || !countrycodePattern.test(this.state.countrycode))) {
      this.setState({
        failedsubmit: true,
        submiterror: "Please give a valid countrycode",
      });
    }  else if (pattern.test(this.state.email) || this.state.email === "") {
          let phoneNumber = this.state.countrycode + this.state.phone;
          this.setState({ submiterror: "" });
          let url =
            URL + "customerquery";
          let formData = new FormData();
          formData.append("token", "SiteToken-7874857973");
          formData.append("name", this.state.name);
          formData.append("businessindividual", this.state.clienttype);
          formData.append("email", this.state.email === "" ? "n/a" : this.state.email);
          formData.append("phonenumber", phoneNumber === "" ? "n/a" : phoneNumber);
          formData.append("querytype", this.state.querytype);
          formData.append("query", this.state.query);
          fetch(url, { method: "POST", headers: new Headers(), body: formData })
            .then((response) => {
              if (response.status === 204) {
                this.setState({
                  name: "",
                  clienttype: 1,
                  email: "",
                  phone: "",
                  countrycode: "",
                  querytype: 1,
                  query: "",
                  failedsubmit: false,
                  submiterror: "Submit successful, thank you!",
                });
              } else {
                throw Error(response.statusText);
              }
            })
            .catch((err) => {
              console.log("something went wrong, ", err);
    
              this.setState({
                failedsubmit: true,
                submiterror: err,
              });
            });
    } else {
      this.setState({
        failedsubmit: true,
        submiterror: "Invalid email address",
      });
    }
  };

  render() {
    return (
      <div className="background">
        <div className="main">
          <div className="contactushero">
            <div className="contactus0">
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
              <p>
                Use the form to send us a message and We'll get back to you ASAP
              </p>
              <p>
                Alternatively leave some feedback so we can improve our service
              </p>
            </div>
            <br></br>
            <div className="formArea">
              <QueryForm
                handleName={this.handleName}
                handleClientType={this.handleClientType}
                handleEmail={this.handleEmail}
                handlePhone={this.handlePhone}
                handleCountryCode={this.handleCountryCode}
                handleQueryType={this.handleQueryType}
                handleQuery={this.handleQuery}
                handleQuerySubmit={this.handleQuerySubmit}
                queryerror={this.state.submiterror}
                name={this.state.name}
                clienttype={this.state.clienttype}
                email={this.state.email}
                phone={this.state.phone}
                countrycode={this.state.countrycode}
                querytype={this.state.querytype}
                query={this.state.query}
              />
            </div>
          </aside>
        </div>
      </div>
    );
  }
}

export default QueryPage;
