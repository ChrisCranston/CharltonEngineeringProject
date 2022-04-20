import React from "react";
import PropTypes from "prop-types";
import AssemblyParts from "../AssemblyParts/AssemblyParts";
import SearchBox from "../../ReusableComponents/SearchBox/SearchBox";
import "./AssemblyPartsPage.css";

/**
 * AssemblyPartsPage class component
 *
 * Wrapper page encompassing the Assembly Parts
 * subsystem. Renders the sort and filter options
 * to pass down to the AssemblyParts component.
 *
 * @author Matthew William Dawson W18002221
 */
class AssemblyPartsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      filterBy: "",
      sortBy: "serial_number",
      page: 1,
    };
  }

  handleSearch = (e) => {
    this.setState({ search: e.target.value });
  };

  cancelSearch = () => {
    this.setState({ search: "" });
  };

  handleFilterBy = (e) => {
    this.setState({ filterBy: e.target.value, page: 1 });
  };

  handleSortBy = (e) => {
    this.setState({ sortBy: e.target.value, page: 1 });
  };

  handleNextClick = () => {
    const { page } = this.state;

    this.setState({ page: page + 1 });
  };

  handlePreviousClick = () => {
    const { page } = this.state;

    this.setState({ page: page - 1 });
  };

  render() {
    const { search, filterBy, sortBy, page } = this.state;
    const { simToken } = this.props;

    return (
      <div className="main_content">
        <section className="centred-item">
          <h2>Assembly Parts</h2>
          <div>
            <p>
              Search and sort assembly parts by serial number or part name and
              filter by in stock, low stock, or out of stock.
            </p>
            <p>
              Create or delete parts, and modify part details or stock quantity.
            </p>
          </div>
        </section>
        <section>
          <SearchBox
            id="parts-search"
            search={search}
            handleSearch={this.handleSearch}
            cancelSearch={this.cancelSearch}
            placeholder="Search by name/serial number..."
            icon
          />
        </section>
        <section className="item-controls">
          <span className="item-control-wrapper">
            <label>Sort By:</label>
            <select value={sortBy} onChange={this.handleSortBy}>
              <option value="serial_number">Serial Number</option>
              <option value="name">Part Name</option>
            </select>
          </span>
          <span className="item-control-wrapper">
            <label>Filter By Stock Level:</label>
            <select value={filterBy} onChange={this.handleFilterBy}>
              <option value="">No Filter</option>
              <option value="in-stock">In Stock</option>
              <option value="low-warning">Low Warning</option>
              <option value="out-of-stock">Out of Stock</option>
            </select>
          </span>
        </section>
        <div className="parts-page">
          <AssemblyParts
            simToken={simToken}
            search={search}
            filterBy={filterBy}
            sortBy={sortBy}
            page={search ? 1 : page}
            handleNextClick={this.handleNextClick}
            handlePreviousClick={this.handlePreviousClick}
          />
        </div>
      </div>
    );
  }
}

AssemblyPartsPage.defaultProps = {
  simToken: null,
};

AssemblyPartsPage.propTypes = {
  simToken: PropTypes.string,
};

export default AssemblyPartsPage;
