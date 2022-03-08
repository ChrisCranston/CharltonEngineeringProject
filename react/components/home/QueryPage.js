import React from "react";
import CustomerServiceIMG from ".//img/man on phone.jpg"
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
  constructor(props){
    super(props);
  }

  render() {
    return (
      <div className="background">
        <div className="main_content">
          <div className="query_Content">
            <aside id="leftside">
              <img src={CustomerServiceIMG} className="customerserviceimg" alt="customer service img" />
              <div>
              <h3>Contact Us</h3>
              <div>
                <p> Charlton Engineering Services Limited</p>
                <p> Unit 9, Harvey Close</p>
                <p> Crowther Industrial Estate</p>
                <p> Washington</p>
                <p> Tyne & Wear</p>
                <p> NE38 0AB</p>
                </div>
                <br></br>
                <div>
                <p>Tel: 0191 4163099</p>
                <p>Email: info@charltoneng.co.uk</p>
                </div>
              </div>
            </aside>
            <aside id="rightside">
              <div>
               <h2>Customer Queries</h2>
                <p>Use the form to send us a message and We'll get back to you ASAP</p>
                <p>Alternitively leave a complaint so we can improve our service</p>
              </div>
              <div className="formArea">
                <QueryForm 
                handleName={this.handleName}
                handleQuery={this.handleQuery}
                />
              </div>
            </aside>
          </div>
        </div>
      </div>
    );
  }
}

export default QueryPage;
