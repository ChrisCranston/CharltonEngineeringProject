import React from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import Loading from "../../../ReusableComponents/Loading/Loading";
import Input from "../../../ReusableComponents/Input/Input";
import ModalFooter from "../../../ReusableComponents/ModalFooter/ModalFooter";
import {
  cancelText,
  clearFields,
  fetchResource,
  formatString,
  getInputValues,
  handleTextEntry,
  resetInputErrors,
  validateFields,
} from "../../assemblyPartHelpers";
import { ASSEMBLY_PARTS_URL, editTypes } from "../../assemblyPartConstants";

class EditPartForm extends React.Component {
  constructor(props) {
    super(props);
    const { selectedPart } = this.props;

    this.state = {
      isSubmitting: false,
      editError: false,
      data: {
        part_id: {
          type: "text",
          value: selectedPart.part_id,
          default: "",
          mandatory: true,
          inputError: false,
          hidden: true,
        },
        name: {
          type: "text",
          value: selectedPart.name,
          default: "",
          mandatory: true,
          inputError: false,
        },
        serial_number: {
          type: "text",
          value: selectedPart.serial_number,
          default: "",
          mandatory: true,
          inputError: false,
        },
        notes: {
          type: "text",
          value: selectedPart.notes,
          default: "",
          inputError: false,
        },
        low_warning: {
          type: "number",
          value: selectedPart.low_warning,
          default: null,
          mandatory: true,
          inputError: false,
        },
        order_url: {
          type: "text",
          value: selectedPart.order_url,
          default: "",
          inputError: false,
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
    const { closePortal } = this.props;

    const editValues = getInputValues(data);

    const formData = new FormData();
    formData.append("edit", JSON.stringify(editValues));

    fetchResource(ASSEMBLY_PARTS_URL, {
      method: "POST",
      headers: new Headers(),
      body: formData,
    })
      .then((response) => {
        if (response) {
          if (response.status === 200) {
            toast.success("Part updated successfully");

            const newData = clearFields(data);
            this.mounted && this.setState({ data: newData });

            closePortal(editTypes.EDIT);
          } else {
            this.mounted &&
              this.setState({
                editError: `Failed to update part: ${response.message}`,
              });
          }
        } else {
          throw new Error("No response object");
        }
      })
      .catch((err) => toast.error(`Failed to update part: ${err.message}`))
      .finally(() => this.mounted && this.setState({ isSubmitting: false }));
  };

  render() {
    const { isSubmitting, data, editError } = this.state;
    const { closePortal } = this.props;

    return (
      <div>
        {isSubmitting ? (
          <Loading />
        ) : (
          <>
            <h1 className="centred-item">Edit Assembly Part Details</h1>
            {editError && (
              <p className="form-error">
                <span>
                  <FontAwesomeIcon
                    className="form-error-icon error-icon"
                    icon={faExclamationTriangle}
                  />
                </span>
                <span>{editError}</span>
              </p>
            )}
            <div className="form">
              {Object.keys(data).map(
                (key) =>
                  !data[key].hidden && (
                    <div key={key}>
                      {data[key].inputError && (
                        <p className="form-error">
                          <span>
                            <FontAwesomeIcon
                              className="form-error-icon error-icon"
                              icon={faExclamationTriangle}
                            />
                          </span>
                          <span>Input Error: {data[key].inputError}</span>
                        </p>
                      )}
                      <Input
                        label={
                          <span>
                            {formatString(key)}
                            {data[key].mandatory && (
                              <span className="form-asterisk"> *</span>
                            )}
                          </span>
                        }
                        type={data[key].type}
                        id={key}
                        value={data[key].value ?? ""}
                        onChange={(e) => {
                          const newData = handleTextEntry(
                            data,
                            e.target.value,
                            key
                          );
                          this.mounted && this.setState({ data: newData });
                        }}
                        cancelInput={() => {
                          const newData = cancelText(data, key);
                          this.mounted && this.setState({ data: newData });
                        }}
                        onEnter={this.handleSubmit}
                        wrapperClassName="field-input"
                        labelClassName="field-label"
                      />
                    </div>
                  )
              )}
            </div>
            <ModalFooter
              disabled={isSubmitting}
              submitText="Edit Part"
              onClose={() => closePortal(editTypes.EDIT)}
              onSubmit={this.handleSubmit}
            />
          </>
        )}
      </div>
    );
  }
}

EditPartForm.defaultProps = {
  selectedPart: {},
};

EditPartForm.propTypes = {
  selectedPart: PropTypes.shape({
    part_id: PropTypes.string,
    serial_number: PropTypes.string,
    name: PropTypes.string,
    quantity: PropTypes.string,
    notes: PropTypes.string,
    low_warning: PropTypes.string,
    order_url: PropTypes.string,
  }),
  closePortal: PropTypes.func.isRequired,
};

export default EditPartForm;
