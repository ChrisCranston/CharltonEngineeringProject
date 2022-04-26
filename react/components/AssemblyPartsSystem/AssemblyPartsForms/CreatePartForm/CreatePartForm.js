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
import "../AssemblyPartForm.css";

/**
 * CreatePartForm class component
 *
 * Form to add a new assembly part to the system.
 * Dynamically renders the form with optional values.
 * Validates each field and returns input errors to
 * the user.
 *
 * @author Matthew William Dawson W18002221
 */
class CreatePartForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isSubmitting: false,
      createError: false,
      data: {
        name: {
          type: "text",
          value: "",
          default: "",
          mandatory: true,
          inputError: false,
        },
        serial_number: {
          type: "text",
          value: "",
          default: "",
          mandatory: true,
          inputError: false,
        },
        quantity: {
          type: "number",
          value: null,
          default: null,
          mandatory: true,
          inputError: false,
        },
        notes: {
          type: "text",
          value: "",
          default: "",
          inputError: false,
        },
        low_warning: {
          type: "number",
          value: null,
          default: null,
          mandatory: true,
          inputError: false,
        },
        order_url: {
          type: "text",
          value: "",
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
    this.setState({ data: newData, isSubmitting: true, createError: false });

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
    const { closePortal, simToken } = this.props;

    const createValues = getInputValues(data);

    const formData = new FormData();
    formData.append("create", JSON.stringify(createValues));
    formData.append("token", simToken);

    fetchResource(ASSEMBLY_PARTS_URL, {
      method: "POST",
      headers: new Headers(),
      body: formData,
    })
      .then((response) => {
        if (response) {
          if (response.status === 201) {
            toast.success("Successfully added new part");

            const newData = clearFields(data);
            this.mounted && this.setState({ data: newData });

            closePortal(editTypes.CREATE);
          } else {
            this.mounted &&
              this.setState({
                createError: `Failed to add new part: ${response.message}`,
              });
          }
        } else {
          throw new Error("No response object");
        }
      })
      .catch((err) => toast.error(`Failed to create part: ${err.message}`))
      .finally(() => this.mounted && this.setState({ isSubmitting: false }));
  };

  render() {
    const { isSubmitting, data, createError } = this.state;
    const { closePortal } = this.props;

    return (
      <div className="modal-sizing modal-sizing-wide">
        <div className="modal-contents modal-contents-wide">
          {isSubmitting ? (
            <Loading />
          ) : (
            <>
              <h2 className="modal-spacer">Add New Assembly Part</h2>
              <div className="modal-form">
                {createError && (
                  <p className="form-error">
                    <span>
                      <FontAwesomeIcon
                        className="form-error-icon"
                        icon={faExclamationTriangle}
                      />
                    </span>
                    <span>{createError}</span>
                  </p>
                )}
                <div className="form">
                  {Object.keys(data).map((key) => (
                    <div key={key}>
                      {data[key].inputError && (
                        <p className="form-error">
                          <span>
                            <FontAwesomeIcon
                              className="form-error-icon"
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
                            :
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
                  ))}
                </div>
                <ModalFooter
                  disabled={isSubmitting}
                  submitText="Create New Part"
                  onClose={() => closePortal(editTypes.CREATE)}
                  onSubmit={this.handleSubmit}
                />
              </div>
            </>
          )}
        </div>
      </div>
    );
  }
}

CreatePartForm.propTypes = {
  simToken: PropTypes.string.isRequired,
  closePortal: PropTypes.func.isRequired,
};

export default CreatePartForm;
