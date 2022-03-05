import Logo from "../img/logo-Placeholder.png";
import React from "react";
import { Link } from "react-router-dom";

class VariableNav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      auth: false,
    };
    this.handle_login_logout = this.handle_login_logout.bind(this);
  }

  componentDidMount() {}

  componentDidUpdate(prevProps) {
  }

  handle_login_logout = () => {
    if (this.state.auth === true) {
      this.setState({auth:false})
    }
    else {
      this.setState({auth:true})
    }
  };

  
  render() {
    let nav = "test";
    if (this.state.auth === false) {
      nav =
        <div className="top">
          <img src={Logo} className="logo" alt="Website Logo" />
          <nav>
            <ul className="nav">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="customerquery">Contact Us</Link>
              </li>
            </ul>
          </nav>
          <button onClick={this.handle_login_logout}>Temp Login Button</button>
        </div>;
    } else {
      nav =
        <div className="top">
          <img src={Logo} className="logo" alt="Website Logo" />
          <nav>
            <ul className="nav">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/parts">Parts</Link>
              </li>
              <li>
                <Link to="/storage">Storage</Link>
                <nav>
                  <li>
                    <Link to="/storage_parts">Parts</Link>
                  </li>
                  <li>
                    <Link to="/storage_locations">Locations</Link>
                  </li>
                  <li>
                    <Link to="/storage_locations">Locations</Link>
                  </li>
                </nav>
              </li>
              <li>
                <Link to="/reporting">Reporting</Link>
              </li>
              <li>
                <Link to="/account">My Account</Link>
              </li>
            </ul>
          </nav>
          <button onClick={this.handle_login_logout}>Temp Login Button</button>
        </div>
      ;
    }
    return (
      <div className="top">
        {nav}
      </div>
    );
  }
}
export default VariableNav;
