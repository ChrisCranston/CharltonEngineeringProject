import React from "react";
import AssemblyParts from "../AssemblyParts/AssemblyParts";
import SearchBox from "../SearchBox/SearchBox";
import Modal from "../Modal/Modal";
import ModalFooter from "../ModalFooter/ModalFooter";
import "./AssemblyPartsPage.css";

class AssemblyPartsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      filterBy: "",
      sortBy: "serial_number",
      modalOpen: false,
      page: 1,
    };
  }

  openCreateStockModal = () => this.setState({ modalOpen: true });

  closeCreateStockModal = () => this.setState({ modalOpen: false });

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
    const { search, filterBy, sortBy, modalOpen, page } = this.state;
    return (
      <>
        <div className="main_content">
          <section className="item-controls">
            <SearchBox
              id="parts-search"
              search={search}
              handleSearch={this.handleSearch}
              cancelSearch={this.cancelSearch}
              placeholder="Search by name/part ID"
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
            <div className="item-control-wrapper">
              <button onClick={() => this.openCreateStockModal()}>
                Add New Stock
              </button>
            </div>
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
        <Modal modalOpen={modalOpen}>
          <div>
            <h1>CREATE STOCK MODAL</h1>
            <ModalFooter onClose={() => this.closeCreateStockModal()} />
          </div>
        </Modal>
      </>
    );
  }
}

export default AssemblyPartsPage;
