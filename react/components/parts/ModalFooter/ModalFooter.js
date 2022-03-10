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
    const { closeText, submitText, onClose, onSubmit } = this.props;

    return (
      <div className="modal-footer">
        {onClose && (
          <button className="button" onClick={onClose}>
            {closeText}
          </button>
        )}
        {onSubmit && (
          <button className="submit-button button" onClick={onSubmit}>
            {submitText}
          </button>
        )}
      </div>
    );
  }
}

ModalFooter.defaultProps = {
  closeText: "Cancel",
  submitText: "Submit",
  onClose: null,
  onSubmit: null,
};

ModalFooter.propTypes = {
  closeText: PropTypes.string,
  submitText: PropTypes.string,
  onClose: PropTypes.func,
  onSubmit: PropTypes.func,
};

export default ModalFooter;
