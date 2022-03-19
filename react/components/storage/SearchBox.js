import React from "react";

/**
 * WebPage
 *
 * This simple component displays a searchbox and handles the input  and
 * onChange values resulting in a search it is used within the PaperPage,
 * ViewingListPage and AuthorPage components
 *
 * @author Chris Cranston - W18018468
 */
class SearchBox extends React.Component {
  render() {
    return (
      <label>
        {this.props.name}
        <input
          type="text"
          placeholder={this.props.placeholder}
          value={this.props.handleSearch}
          onChange={this.props.handleSearch}
        />
      </label>
    );
  }
}

export default SearchBox;
