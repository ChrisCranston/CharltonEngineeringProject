import React from "react";
import StoredManager from "./StoredManager.js";
import SearchBox from "./SearchBox.js";


/**
 * PaperPage
 *
 * This component controls what is being shown on the Storage page of the app at a given time whith.
 *
 * @author Chris Cranston - W18018468
 */
class StoragePartPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { auth: false, search: "", page: 1, maxpage: 1, pageSize: 10 };
    this.handleNextClick = this.handleNextClick.bind(this);
    this.handlePreviousClick = this.handlePreviousClick.bind(this);
    this.handlePageSize = this.handlePageSize.bind(this);
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


  render() {
    return (
      <div className="main_content">
        <div className="page_item">
          <div>
            <SearchBox
              name={"Search: "}
              search={this.state.search}
              placeholder={"by serial number or name"}
              handleSearch={this.handleSearch}
            />
          </div>
          <div>
            <StoredManager
              item_type="part"
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

export default StoragePartPage;
