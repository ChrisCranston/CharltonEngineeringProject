import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUpRightFromSquare,
  faCirclePlus,
  faCircleMinus,
} from "@fortawesome/free-solid-svg-icons";
import { editTypes } from "../assemblyPartConstants";
import "./AssemblyPart.css";

/**
 * AssemblyPart class component
 *
 * Dynamically renders a row in the Assembly Parts table.
 * Triggers callback functions to open the edit, quantity
 * and delete modals.
 *
 * @author Matthew William Dawson W18002221
 */
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

    return (
      <tr className="assembly-part-tr">
        <td>{assemblyPart.serial_number}</td>
        <td>{assemblyPart.name}</td>
        <td className={className}>{assemblyPart.quantity}</td>
        <td>{assemblyPart.notes ? assemblyPart.notes : "N/A"}</td>
        <td>{assemblyPart.low_warning}</td>
        <td>
          <div className="order-button-div">
            {orderURL ? (
              <div>
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
          </div>
        </td>
        <td>
          <div className="part-buttons part-quantity-buttons">
            <button onClick={() => openPartModal(editTypes.ADD, partID)}>
              <FontAwesomeIcon
                className="quantity-icon add-quantity-icon"
                icon={faCirclePlus}
              />
            </button>
            <button onClick={() => openPartModal(editTypes.REMOVE, partID)}>
              <FontAwesomeIcon
                className="quantity-icon remove-quantity-icon"
                icon={faCircleMinus}
              />
            </button>
          </div>
          <div className="part-buttons part-vertical-buttons">
            <button onClick={() => openPartModal(editTypes.EDIT, partID)}>
              Edit Part Details
            </button>
            <button onClick={() => openPartModal(editTypes.DELETE, partID)}>
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
