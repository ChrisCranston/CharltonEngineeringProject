import React from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import Loading from "../Loading/Loading";
import Input from "../Input/Input";
import ModalFooter from "../ModalFooter/ModalFooter";
import "./AddPartForm.css";

class AddPartForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      testInputError: "bob",
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

  formatKey = (key) => {
    return key
      .replace(/_/g, " ")
      .toLowerCase()
      .split(" ")
      .map((word) => word[0].toUpperCase() + word.substr(1))
      .join(" ");
  };

  handleTextEntry = (e, field) => {
    const { data } = this.state;
    this.setState({
      data: {
        ...data,
        [field]: { ...data[field], value: e.target.value, inputError: false },
      },
    });
  };

  cancelText = (field) => {
    const { data } = this.state;
    this.mounted &&
      this.setState({
        data: {
          ...data,
          [field]: {
            ...data[field],
            value: data[field].default,
            inputError: false,
          },
        },
      });
  };

  clearFields = () => {
    const { data } = this.state;

    const newData = data;

    Object.keys(newData).forEach((field) => {
      newData[field].value = newData[field].default;
      newData[field].inputError = false;
    });

    this.setState({ data: newData });
  };

  resetInputErrors = () => {
    const { data } = this.state;

    const newData = data;

    Object.keys(newData).forEach((field) => {
      newData[field].inputError = false;
    });

    this.setState({ data: newData });
  };

  validateField = (key, type, value, isMandatory) => {
    var error = false;
    const humanReadableKey = this.formatKey(key);

    if (!value && isMandatory) {
      error = humanReadableKey + " is empty or contains text";
    } else if (type === "number" && value <= 0) {
      error = humanReadableKey + " must be greater than zero";
    }

    return error;
  };

  validateFields = () => {
    const { data } = this.state;

    const validatedData = data;

    Object.keys(data).forEach((field) => {
      const inputError = this.validateField(
        field,
        data[field].type,
        data[field].value,
        data[field].mandatory
      );

      validatedData[field].inputError = inputError;
    });

    this.setState({ data: validatedData });
  };

  handleSubmit = () => {
    const { data } = this.state;
    this.setState({ isSubmitting: true, createError: false });
    this.resetInputErrors();
    this.validateFields();

    console.log(data);

    if (!Object.values(data).some((field) => field.inputError)) {
      this.sendData();
    } else {
      this.setState({ isSubmitting: false });
    }
  };

  sendData = () => {
    const { data } = this.state;
    const { closePortal } = this.props;

    const url =
      "http://unn-w18002221.newnumyspace.co.uk/kv6002/php/assembly-parts";

    var createValues = {};

    Object.keys(data).forEach((field) => {
      createValues = { ...createValues, [field]: data[field].value };
    });

    const formData = new FormData();
    formData.append("create", JSON.stringify(createValues));

    fetch(url, {
      method: "POST",
      headers: new Headers(),
      body: formData,
    })
      .then((resObj) => resObj.json())
      .then((response) => {
        if (response) {
          if (response.status === 201) {
            toast.success("Successfully added new part");
            this.clearFields();
            closePortal(true);
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
      .catch((err) =>
        toast.error(`Failed to retrieve assembly parts: ${err.message}`)
      )
      .finally(() => this.mounted && this.setState({ isSubmitting: false }));
  };

  render() {
    const { isSubmitting, data, createError } = this.state;
    const { closePortal } = this.props;

    return (
      <div>
        {isSubmitting ? (
          <Loading />
        ) : (
          <>
            <h1 className="small-centre">Add New Part</h1>
            <p className="small-centre"></p>
            {createError && (
              <p className="create-error">
                <span>
                  <FontAwesomeIcon
                    className="create-error-icon error-icon"
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
                    <p className="create-error">
                      <span>
                        <FontAwesomeIcon
                          className="create-error-icon error-icon"
                          icon={faExclamationTriangle}
                        />
                      </span>
                      <span>Input Error: {data[key].inputError}</span>
                    </p>
                  )}
                  <Input
                    label={this.formatKey(key)}
                    type={data[key].type}
                    id={key}
                    value={data[key].value ?? ""}
                    onChange={(e) => this.handleTextEntry(e, key)}
                    cancelInput={() => this.cancelText(key)}
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
              onClose={() => closePortal()}
              onSubmit={this.handleSubmit}
            />
          </>
        )}
      </div>
    );
  }
}

AddPartForm.propTypes = {
  closePortal: PropTypes.func.isRequired,
};

export default AddPartForm;
