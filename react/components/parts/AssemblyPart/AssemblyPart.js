import React from "react";
import PropTypes from "prop-types";
/* import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpRightFromSquare } from "@fortawesome/free-solid-svg-icons"; */
// import DropdownButton from "./DropdownButton/DropdownButton";
import "./AssemblyPart.css";

class AssemblyPart extends React.Component {
  render() {
    const { assemblyPart, openEditPartModal } = this.props;

    const partID = assemblyPart.part_id;
    const quantity = Number(assemblyPart.quantity);
    const className =
      quantity === 0
        ? "out-of-stock"
        : quantity <= assemblyPart.low_warning
        ? "low-stock"
        : "";

    /*
             {assemblyPart.order_url ? (
              <a href={assemblyPart.order_url} target="_blank" rel="noreferrer">
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
          {assemblyPart.order_url ? (
            <a href={assemblyPart.order_url} target="_blank" rel="noreferrer">
              {assemblyPart.order_url.substring(0, 25) + "..."}
            </a>
          ) : (
            "N/A"
          )}
        </td>
        <td className="user-list__dropdown">
          <button onClick={() => openEditPartModal(partID)}>Add Stock</button>
          <button onClick={() => openEditPartModal(partID)}>
            Remove Stock
          </button>
          <button onClick={() => openEditPartModal(partID)}>
            Edit Part Details
          </button>
          <button onClick={() => openEditPartModal(partID)}>Delete Part</button>
        </td>
      </tr>
    );
  }
}

/*

  <AuthenticationForm
            authError={authError}
            setAuthenticated={this.setAuthenticated}
            closeAuthPortal={this.closeAuthPortal}
          />

*/

/*

         <DropdownButton
              id={assemblyPart.part_id}
              options={[
                {
                  title: "Add Stock",
                  handleClick: () =>
                    // dispatch(userActions.setEditModalOpen(true, user.$loki)),
                    // SET MODAL OPEN FOR THIS
                    console.log("open add stock modal"),
                },
                {
                  title: "Remove Stock",
                  handleClick: () =>
                    // dispatch(userActions.setChangePasswordModalOpen(true, user.$loki)),
                    console.log("open remove stock modal"),
                },
                {
                  title: "Edit Stock Details",
                  handleClick: () =>
                    // dispatch(userActions.setChangePermissionsModalOpen(true, user.$loki)),
                    console.log("open edit stock modal"),
                },
                {
                  title: "Delete Stock",
                  handleClick: () =>
                    // dispatch(userActions.setDeleteModalOpen(true, user.$loki)),
                    // isDestructive: true,
                    console.log("open delete stock modal"),
                },
              ]}
            />

*/

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
  openEditPartModal: PropTypes.func.isRequired,
};

export default AssemblyPart;
