import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSyncAlt } from "@fortawesome/free-solid-svg-icons";
import "./Loading.css";

/**
 * AuthenticationButton class component
 *
 * Generates a loading spinner and loading text.
 *
 * @author Matthew William Dawson W18002221
 */
class Loading extends React.Component {
  render() {
    return (
      <div className="loading-spinner">
        <p>
          <FontAwesomeIcon icon={faSyncAlt} spin />
        </p>
        <span>Loading</span>
      </div>
    );
  }
}

export default Loading;
