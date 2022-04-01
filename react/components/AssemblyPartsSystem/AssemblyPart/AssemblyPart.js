import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUpRightFromSquare,
  faCirclePlus,
  faCircleMinus,
} from "@fortawesome/free-solid-svg-icons";
import "./AssemblyPart.css";

class AssemblyPart extends React.Component {
  render() {
    const { assemblyPart, openPartModal, simToken } = this.props;

    const partID = assemblyPart.part_id;
    const orderURL = assemblyPart.order_url;
    const quantity = Number(assemblyPart.quantity);
    const className =
      quantity === 0
        ? "out-of-stock"
        : quantity <= assemblyPart.low_warning
        ? "low-stock"
        : "";

    return (
      <tr>
        <td>{assemblyPart.serial_number}</td>
        <td>{assemblyPart.name}</td>
        <td className={className}>{assemblyPart.quantity}</td>
        <td>{assemblyPart.notes ? assemblyPart.notes : "N/A"}</td>
        <td>{assemblyPart.low_warning}</td>
        <td>
          {orderURL ? (
            <div className="centred-item">
              <a
                className="order-button"
                href={orderURL}
                target="_blank"
                rel="noreferrer"
              >
                <FontAwesomeIcon icon={faUpRightFromSquare} />
              </a>
            </div>
          ) : (
            "N/A"
          )}
        </td>
        <td>
          <div className="part-buttons part-quantity-buttons">
            <button onClick={() => openPartModal("add", partID)}>
              <FontAwesomeIcon
                className="quantity-icon add-quantity-icon"
                icon={faCirclePlus}
              />
            </button>
            <button onClick={() => openPartModal("remove", partID)}>
              <FontAwesomeIcon
                className="quantity-icon remove-quantity-icon"
                icon={faCircleMinus}
              />
            </button>
          </div>
          <div className="part-buttons part-vertical-buttons">
            <button onClick={() => openPartModal("edit", partID)}>
              Edit Part Details
            </button>
            <button onClick={() => openPartModal("delete", partID)}>
              Delete Part
            </button>
          </div>
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
