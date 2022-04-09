import React from "react";
import PropTypes from "prop-types";
/* import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpRightFromSquare } from "@fortawesome/free-solid-svg-icons"; */
// import DropdownButton from "./DropdownButton/DropdownButton";
import "./AssemblyPart.css";

class AssemblyPart extends React.Component {
  render() {
    const { assemblyPart, openPartModal } = this.props;

    const partID = assemblyPart.part_id;
    const orderURL = assemblyPart.order_url;
    const quantity = Number(assemblyPart.quantity);
    const className =
      quantity === 0
        ? "out-of-stock"
        : quantity <= assemblyPart.low_warning
        ? "low-stock"
        : "";

    /*
             {orderURL ? (
              <a href={orderURL} target="_blank" rel="noreferrer">
                <FontAwesomeIcon icon={faUpRightFromSquare} />
              </a>
            ) : (
              "N/A"
            )} 
        */

    return (
      <tr>
        <td>{assemblyPart.serial_number}</td>
        <td>{assemblyPart.name}</td>
        <td className={className}>{assemblyPart.quantity}</td>
        <td>{assemblyPart.notes ?? "N/A"}</td>
        <td>{assemblyPart.low_warning}</td>
        <td>
          {orderURL ? (
            <a href={orderURL} target="_blank" rel="noreferrer">
              {orderURL.length > 25
                ? orderURL.substring(0, 25) + "..."
                : orderURL}
            </a>
          ) : (
            "N/A"
          )}
        </td>
        <td className="user-list__dropdown">
          <button onClick={() => openPartModal("add", partID)}>
            Add Stock
          </button>
          <button onClick={() => openPartModal("remove", partID)}>
            Remove Stock
          </button>
          <button onClick={() => openPartModal("edit", partID)}>
            Edit Part Details
          </button>
          <button onClick={() => openPartModal("delete", partID)}>
            Delete Part
          </button>
        </td>
      </tr>
    );
  }
}

AssemblyPart.propTypes = {
  assemblyPart: PropTypes.shape({
    part_id: PropTypes.string.isRequired,
    serial_number: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    quantity: PropTypes.string.isRequired,
    notes: PropTypes.string,
    low_warning: PropTypes.string.isRequired,
    order_url: PropTypes.string,
  }),
  openPartModal: PropTypes.func.isRequired,
};

export default AssemblyPart;
