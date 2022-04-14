import React from "react";
import PropTypes from "prop-types";
import "./ModalFooter.css";

/**
 * ModalFooter class component
 *
 * Generates a footer for the modal with optional "close" and "submit" buttons
 * that execute supplied functions when clicked. Default text can be shown or
 * dynamic supplied text.
 *
 * @author Matthew William Dawson W18002221
 */
class ModalFooter extends React.Component {
  render() {
    const { disabled, closeText, submitText, onClose, onSubmit } = this.props;

    return (
      <div className="modal-footer">
        {onClose && (
          <button disabled={disabled} className="button red" onClick={onClose}>
            {closeText}
          </button>
        )}
        {onSubmit && (
          <button
            disabled={disabled}
            className="submit-button button"
            onClick={onSubmit}
          >
            {submitText}
          </button>
        )}
      </div>
    );
  }
}

ModalFooter.defaultProps = {
  disabled: false,
  closeText: "Cancel",
  submitText: "Submit",
  onClose: null,
  onSubmit: null,
};

ModalFooter.propTypes = {
  disabled: PropTypes.bool,
  closeText: PropTypes.string,
  submitText: PropTypes.string,
  onClose: PropTypes.func,
  onSubmit: PropTypes.func,
};

export default ModalFooter;
