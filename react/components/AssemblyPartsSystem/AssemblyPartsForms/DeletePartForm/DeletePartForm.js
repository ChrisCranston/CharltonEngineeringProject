import React from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import Loading from "../../../ReusableComponents/Loading/Loading";

import ModalFooter from "../../../ReusableComponents/ModalFooter/ModalFooter";
import {
  clearFields,
  fetchResource,
  getInputValues,
  resetInputErrors,
  validateFields,
} from "../../assemblyPartHelpers";
import { ASSEMBLY_PARTS_URL, editTypes } from "../../assemblyPartConstants";
import "./DeletePartForm.css";

class DeletePartForm extends React.Component {
  constructor(props) {
    super(props);
    const { selectedPartID } = this.props;

    this.state = {
      isSubmitting: false,
      deleteError: false,
      data: {
        part_id: {
          type: "text",
          value: selectedPartID,
          default: "",
          mandatory: true,
          inputError: false,
          hidden: true,
        },
      },
    };
  }

  componentDidMount() {
    this.mounted = true;
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  handleSubmit = () => {
    const { data } = this.state;

    const newData = resetInputErrors(data);
    this.setState({ data: newData, isSubmitting: true, editError: false });

    const validatedData = validateFields(data);
    this.setState({ data: validatedData });

    if (!Object.values(data).some((field) => field.inputError)) {
      this.sendData();
    } else {
      this.setState({ isSubmitting: false });
    }
  };

  sendData = () => {
    const { data } = this.state;
    const { editType, closePortal } = this.props;

    const deleteValue = getInputValues(data);

    const formData = new FormData();
    formData.append("delete", JSON.stringify(deleteValue));

    fetchResource(ASSEMBLY_PARTS_URL, {
      method: "POST",
      headers: new Headers(),
      body: formData,
    })
      .then((response) => {
        if (response) {
          if (response.status === 200) {
            toast.success("Part deleted successfully");

            const newData = clearFields(data);
            this.mounted && this.setState({ data: newData });

            closePortal(editType, true);
          } else {
            this.mounted &&
              this.setState({
                editError: `Failed to delete part: ${response.message}`,
              });
          }
        } else {
          throw new Error("No response object");
        }
      })
      .catch((err) => toast.error(`Failed to delete part: ${err.message}`))
      .finally(() => this.mounted && this.setState({ isSubmitting: false }));
  };

  render() {
    const { isSubmitting, deleteError } = this.state;
    const { selectedPartName, selectedPartSerialNumber, closePortal } =
      this.props;

    return (
      <div>
        {isSubmitting ? (
          <Loading />
        ) : (
          <>
            <h1 className="small-centre">Delete Part</h1>
            <p className="small-centre"></p>
            {deleteError && (
              <p className="form-error">
                <span>
                  <FontAwesomeIcon
                    className="form-error-icon error-icon"
                    icon={faExclamationTriangle}
                  />
                </span>
                <span>{deleteError}</span>
              </p>
            )}
            <div className="delete-text">
              <p>You are about to delete the following part:</p>
              <table className="delete-table">
                <tbody>
                  <tr>
                    <th>Part Name:</th>
                    <td> {selectedPartName}</td>
                  </tr>
                  <tr>
                    <th>Serial Number:</th>
                    <td>{selectedPartSerialNumber}</td>
                  </tr>
                </tbody>
              </table>
              <p>
                Are you sure you wish to proceed? This action cannot be undone.
              </p>
            </div>
            <ModalFooter
              disabled={isSubmitting}
              submitText="Delete Part"
              onClose={() => closePortal(editTypes.DELETE)}
              onSubmit={this.handleSubmit}
            />
          </>
        )}
      </div>
    );
  }
}

DeletePartForm.defaultProps = {
  selectedPartID: "",
  selectedPartSerialNumber: "",
  selectedPartName: "",
};

DeletePartForm.propTypes = {
  selectedPartID: PropTypes.string,
  selectedPartSerialNumber: PropTypes.string,
  selectedPartName: PropTypes.string,
  closePortal: PropTypes.func.isRequired,
};

export default DeletePartForm;
