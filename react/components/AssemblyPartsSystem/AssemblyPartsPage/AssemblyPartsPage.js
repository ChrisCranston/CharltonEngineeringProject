import React from "react";
import AssemblyParts from "../AssemblyParts/AssemblyParts";
import SearchBox from "../../ReusableComponents/SearchBox/SearchBox";
import "./AssemblyPartsPage.css";

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
    return (
      <div className="main_content">
        <section>
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
        <section className="item-controls">
          <SearchBox
            id="parts-search"
            search={search}
            handleSearch={this.handleSearch}
            cancelSearch={this.cancelSearch}
            placeholder="Search by name/serial number"
            icon
          />
          <label className="item-control-wrapper">
            <span>Sort By:</span>
            <select value={sortBy} onChange={this.handleSortBy}>
              <option value="serial_number">Serial Number</option>
              <option value="name">Part Name</option>
            </select>
          </label>
          <label className="item-control-wrapper">
            <span>Filter By Stock Level:</span>
            <select value={filterBy} onChange={this.handleFilterBy}>
              <option value="">No Filter</option>
              <option value="in-stock">In Stock</option>
              <option value="low-warning">Low Warning</option>
              <option value="out-of-stock">Out of Stock</option>
            </select>
          </label>
        </section>
        <div className="parts-page">
          <AssemblyParts
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

export default AssemblyPartsPage;
