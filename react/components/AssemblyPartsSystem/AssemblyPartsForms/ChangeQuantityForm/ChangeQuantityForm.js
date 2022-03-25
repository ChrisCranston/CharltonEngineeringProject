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
import { ASSEMBLY_PARTS_URL } from "../../assemblyPartConstants";

class ChangeQuantityForm extends React.Component {
  constructor(props) {
    super(props);
    const { selectedPart, editType } = this.props;

    this.state = {
      formattedEditType: formatString(editType),
      isSubmitting: false,
      quantityError: false,
      data: {
        part_id: {
          type: "text",
          value: selectedPart.part_id,
          default: "",
          mandatory: true,
          inputError: false,
          hidden: true,
        },
        quantity: {
          type: "number",
          value: null,
          default: null,
          mandatory: true,
          inputError: false,
        },
        modificationType: {
          type: "text",
          value: editType,
          default: null,
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

    const changeQuantityValues = getInputValues(data);

    const formData = new FormData();
    formData.append("quantity", JSON.stringify(changeQuantityValues));

    fetchResource(ASSEMBLY_PARTS_URL, {
      method: "POST",
      headers: new Headers(),
      body: formData,
    })
      .then((response) => {
        if (response) {
          if (response.status === 200) {
            toast.success("Stock " + editType + "ed updated successfully");

            const newData = clearFields(data);
            this.mounted && this.setState({ data: newData });

            closePortal(editType);
          } else {
            this.mounted &&
              this.setState({
                editError: `Failed to ${editType} stock quantity: ${response.message}`,
              });
          }
        } else {
          throw new Error("No response object");
        }
      })
      .catch((err) =>
        toast.error(`Failed to ${editType} stock: ${err.message}`)
      )
      .finally(() => this.mounted && this.setState({ isSubmitting: false }));
  };

  render() {
    const { isSubmitting, data, quantityError, formattedEditType } = this.state;
    const { closePortal, editType } = this.props;

    return (
      <div>
        {isSubmitting ? (
          <Loading />
        ) : (
          <>
            <h1 className="small-centre">{formattedEditType} Stock</h1>
            <p className="small-centre"></p>
            {quantityError && (
              <p className="form-error">
                <span>
                  <FontAwesomeIcon
                    className="form-error-icon error-icon"
                    icon={faExclamationTriangle}
                  />
                </span>
                <span>{quantityError}</span>
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
              submitText={`${formattedEditType} Stock`}
              onClose={() => closePortal(editType)}
              onSubmit={this.handleSubmit}
            />
          </>
        )}
      </div>
    );
  }
}

ChangeQuantityForm.defaultProps = {
  selectedPart: {},
};

ChangeQuantityForm.propTypes = {
  selectedPart: PropTypes.shape({
    part_id: PropTypes.string,
    serial_number: PropTypes.string,
    name: PropTypes.string,
    quantity: PropTypes.string,
    notes: PropTypes.string,
    low_warning: PropTypes.string,
    order_url: PropTypes.string,
  }),
  editType: PropTypes.string.isRequired,
  closePortal: PropTypes.func.isRequired,
};

export default ChangeQuantityForm;
