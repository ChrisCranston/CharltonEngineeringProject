import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import "./Input.css";

/**
 * Input class component
 *
 * Generates an input for the user to type into.
 *
 * The component executes a supplied function whenever the user
 * types into the box or optionally presses enter, and displays
 * the current typed value.
 *
 * The label, placeholder text and an optional icon component are
 * passed in to allow for dynamic generation.
 *
 * The label and wrapper classnames are also passed in to allow for dynamic
 * styling depending on that component instance's circumstances.
 *
 * The type can be passed to allow for a password text input rather than
 * the default if nothing is provided, which is text.
 *
 * Supplied functions execute when the user types into the box, when they
 * clear/cancel the input using the provided "X" icon button, or when they
 * press enter while inside the box.
 *
 * @author Matthew William Dawson W18002221
 */
class Input extends React.Component {
  render() {
    const {
      id,
      type,
      label,
      wrapperClassName,
      labelClassName,
      placeholder,
      value,
      icon,
      onChange,
      cancelInput,
      onEnter,
    } = this.props;

    return (
      <span className={wrapperClassName}>
        <label htmlFor={id} className={labelClassName}>
          {label}
        </label>
        <span className="text-input-wrapper">
          <input
            id={id}
            className="text-input"
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            onKeyDown={(e) => onEnter && e.keyCode === 13 && onEnter()}
          />
          <button
            onClick={cancelInput}
            disabled={value === "" || value === null || value === undefined}
            className={`input-icon ${value ? "clear-icon" : ""}`}
          >
            {value ? <FontAwesomeIcon icon={faTimes} size="sm" /> : icon}
          </button>
        </span>
      </span>
    );
  }
}

Input.defaultProps = {
  type: "text",
  label: "",
  wrapperClassName: "",
  labelClassName: "",
  placeholder: "",
  value: "",
  icon: null,
  onEnter: null,
};

Input.propTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.string,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  wrapperClassName: PropTypes.string,
  labelClassName: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  icon: PropTypes.element,
  onChange: PropTypes.func.isRequired,
  cancelInput: PropTypes.func.isRequired,
  onEnter: PropTypes.func,
};

export default Input;
