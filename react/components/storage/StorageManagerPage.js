import React from "react";
import StoredManager from "./StoredManager.js";
import SearchBox from "./SearchBox.js";
import SelectWarehouse from "./SelectWarehouse.js";

/**
 * PaperPage
 *
 * This component controls what is being shown on the Storage page of the app at a given time whith.
 *
 * @author Chris Cranston - W18018468
 */
class StorageManagerPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      auth: false,
      search: "",
      page: 1,
      maxpage: 1,
      pageSize: 10,
      warehouse: "",
      empty: "",
    };
    this.handleNextClick = this.handleNextClick.bind(this);
    this.handlePreviousClick = this.handlePreviousClick.bind(this);
    this.handlePageSize = this.handlePageSize.bind(this);
    this.handleWarehouseSelect = this.handleWarehouseSelect.bind(this);
    this.handleShowEmpty = this.handleShowEmpty.bind(this);
  }
  handleSearch = (e) => {
    this.setState({ search: e.target.value });
    this.setState({ page: 1 });
  };
  handlePageSize = (e) => {
    this.setState({ pageSize: e.target.value });
    this.setState({ page: 1 });
  };

  handleNextClick = () => {
    this.setState({ page: this.state.page + 1 });
  };
  handlePreviousClick = () => {
    this.setState({ page: this.state.page - 1 });
  };
  handleWarehouseSelect = (e) => {
    this.setState({ warehouse: e.target.value });
    this.setState({ page: 1 });
  };
  handleShowEmpty = () => {
    if (this.state.empty == "") {
      this.setState({ empty: "true" });
    } else {
      this.setState({ empty: "" });
    }
  };

  render() {
    let showEmpty = "";

    if (this.state.empty === "") {
      showEmpty = (
        <button onClick={this.handleShowEmpty}>Show Empty Only</button>
      );
    } else {
      showEmpty = <button onClick={this.handleShowEmpty}>Show All</button>;
    }
    return (
      <div className="main_content">
        <div className="page_item">
          <div>
            <SearchBox
              name={"Search: "}
              search={this.state.search}
              placeholder={"by location"}
              handleSearch={this.handleSearch}
            />
            <SelectWarehouse
              warehouse={this.state.warehouse}
              handleWarehouseSelect={this.handleWarehouseSelect}
            />
            {showEmpty}
          </div>
          <div>
            <StoredManager
              item_type="location"
              empty={this.state.empty}
              warehouse={this.state.warehouse}
              search={this.state.search}
              page={this.state.page}
              pageSize={this.state.pageSize}
              handleNextClick={this.handleNextClick}
              handlePreviousClick={this.handlePreviousClick}
              handlePageSize={this.handlePageSize}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default StorageManagerPage;
