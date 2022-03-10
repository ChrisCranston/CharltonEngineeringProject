import React from "react";
import PropTypes from "prop-types";
// import DropdownButton from "./DropdownButton/DropdownButton";
import Modal from "../Modal/Modal";
import ModalFooter from "../ModalFooter/ModalFooter";
import "./AssemblyPart.css";

class AssemblyPart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false,
    };
  }

  openStockModal = () => this.setState({ modalOpen: true });

  closeStockModal = () => this.setState({ modalOpen: false });

  render() {
    const { modalOpen } = this.state;
    const { assemblyPart } = this.props;

    const quantity = Number(assemblyPart.quantity);
    const className =
      quantity === 0
        ? "out-of-stock"
        : quantity <= assemblyPart.low_warning
        ? "low-stock"
        : "";

    return (
      <>
        <tr>
          <td>{assemblyPart.serial_number}</td>
          <td>{assemblyPart.name}</td>
          <td className={className}>{assemblyPart.quantity}</td>
          <td>{assemblyPart.notes ?? "N/A"}</td>
          <td>{assemblyPart.low_warning}</td>
          <td>
            {assemblyPart.order_url ? (
              <a href={assemblyPart.order_url} target="_blank" rel="noreferrer">
                URL
              </a>
            ) : (
              "N/A"
            )}
          </td>
          <td className="user-list__dropdown">
            <button onClick={this.openStockModal}>Add Stock</button>
            <button onClick={this.openStockModal}>Remove Stock</button>
            <button onClick={this.openStockModal}>Edit Stock Details</button>
            <button onClick={this.openStockModal}>Delete Stock</button>
          </td>
        </tr>
        <Modal modalOpen={modalOpen}>
          <div>
            <h1>MODIFY STOCK MODAL</h1>
            <ModalFooter onClose={() => this.closeStockModal()} />
          </div>
        </Modal>
      </>
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

/*

      <div>
          <p>Serial Number: {assemblyPart.serial_number}</p>
          <p>Part Name: {assemblyPart.name} </p>
          <p>Quantity: {assemblyPart.quantity}</p>
          <p>Notes: {assemblyPart.notes}</p>
          <p>Low Warning: {assemblyPart.low_warning}</p>
          <p>Order URL: {assemblyPart.order_url}</p>
          <p>THREE DOT BUTTON</p>
        </div>

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
};

export default AssemblyPart;
