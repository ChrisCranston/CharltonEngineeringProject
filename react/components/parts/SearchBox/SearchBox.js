import React from "react";
import PropTypes from "prop-types";
import TextInput from "../TextInput/TextInput";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import "./SearchBox.css";

/**
 * SearchBox class component
 *
 * Generates a dynamic search box for the user to type in using
 * the TextInput component.
 *
 * The TextInput's ID, label, search value, placeholder text,
 * and boolean to show or hide an optional magnifying glass icon
 * are passed in to allow dynamic generation.
 *
 * Functions are also supplied to be executed when the search value
 * changes or when the search box is cleared. An optional "onEnter"
 * is passed in for searches that require a submission rather than
 * an instant result.
 *
 * @author Matthew William Dawson W18002221
 */
class SearchBox extends React.Component {
  render() {
    const {
      id,
      label,
      search,
      handleSearch,
      cancelSearch,
      placeholder,
      icon,
      onSubmit,
    } = this.props;

    return (
      <TextInput
        wrapperClassName="item-control-wrapper"
        labelClassName="search-box-label"
        id={id}
        label={label}
        placeholder={placeholder}
        value={search}
        icon={icon ? <FontAwesomeIcon icon={faSearch} size="sm" /> : null}
        onChange={handleSearch}
        cancelInput={cancelSearch}
        onEnter={onSubmit}
      />
    );
  }
}

SearchBox.defaultProps = {
  label: "Search",
  placeholder: "",
  icon: false,
  onSubmit: null,
};

SearchBox.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  search: PropTypes.string.isRequired,
  handleSearch: PropTypes.func.isRequired,
  cancelSearch: PropTypes.func.isRequired,
  onSubmit: PropTypes.func,
  placeholder: PropTypes.string,
  icon: PropTypes.bool,
};

export default SearchBox;
