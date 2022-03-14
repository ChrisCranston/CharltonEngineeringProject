import React from "react";
import Stored from "./Stored";
import Parts from "./Parts";

/**
 * StoredManager
 *
 *
 * @author Chris Cranston - W18018468
 */
class StoredManager extends React.Component {
  constructor(props) {
    super(props);
    this.state = { results: [], update: "" };
  }

  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.warehouse !== this.props.warehouse) {
      this.fetchData();
    }
    if (prevProps.empty !== this.props.empty) {
      this.fetchData();
    }
    if (prevProps.pageSize !== this.props.pageSize) {
      this.setState({ pageSize: this.props.pagesize });
    }
  }

  clearEmptyFilter = () => {
    this.setState({empty: ""})
  }

  fetchData = () => {
    let url = "http://localhost/kv6002/php/stored";
    if (this.props.item_type === "part") {
      url += "?part_search=true";
    } else if (this.props.item_type === "location") {
      url += "?location_search=true";
      if (this.props.empty === "true"){
        url += "&empty=" + this.props.empty;
      }
      if (this.props.warehouse !== undefined && this.props.warehouse !== "") {
        url += "&warehouse=" + this.props.warehouse;
      }
    }
    fetch(url)
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else if (response.status === 204) {
          if (this.props.empty === "true") {
            this.props.outOfEmpties()
            alert("No empty locations remain")
          }else {
          alert("No Results with that filter please  try again")
        }
        }else {
          throw Error(response.statusText);
        }
      })
      .then((data) => {
        this.setState({ results: data.results });
      })
      .catch((err) => {
        console.log("something went wrong ", err);
      });
  };
  filterSearch = (s) => {
    if (this.props.item_type === "location") {
      if (this.props.qrSearch !== "") {
        let name = s.storage_location_id.toLowerCase().includes(this.props.qrSearch);
        return name;
      }
      let search_string = s.location_string
        .toLowerCase()
        .includes(this.props.search.toLowerCase());
      return search_string;
    } else if (this.props.item_type === "part") {
      if (this.props.qrSearch !== "") {
        let name = s.part_id.toLowerCase().includes(this.props.qrSearch);
        return name;
      }
      let name = s.name.toLowerCase().includes(this.props.search.toLowerCase());
      let serial = s.serial_number
        .toLowerCase()
        .includes(this.props.search.toLowerCase());
      return name + serial;
    }
  };

  render() {
    let noData = "";
    let buttons = "";
    let pagesize = "";

    if (this.state.results.length === 0) {
      noData = <p>No data found</p>;
    }
    let filteredResults = this.state.results;
    if (filteredResults.length > 0 ) {
      filteredResults = this.state.results.filter(this.filterSearch);
    }
    pagesize = (
      <div className="btn-group-row">
        <p>results per page: </p>
        <select name="Results Per Page " onChange={this.props.handlePageSize}>
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="30">30</option>
        </select>
      </div>
    )


    if (this.props.page !== undefined) {
      const pageSize = this.props.pageSize;
      let pageMax = this.props.page * pageSize;
      let pageMin = pageMax - pageSize;

      buttons = (
        <div className="btn-group-row">
          <button
            onClick={this.props.handlePreviousClick}
            disabled={this.props.page <= 1}
          >
            Previous
          </button>
          <p>
            page {this.props.page} of
            {Math.ceil(filteredResults.length / this.props.pageSize)}
          </p>
          <button
            onClick={this.props.handleNextClick}
            disabled={this.props.page >= Math.ceil(filteredResults.length / this.props.pageSize)}
          >
            Next
          </button>
        </div>
      );
      filteredResults = filteredResults.slice(pageMin, pageMax);
    }

    let display = "";

    if (this.props.item_type === "location") {
      display = (
        <div>
          {noData}
          {filteredResults.map((stored_item, i) => (
            <Stored
              key={i + stored_item}
              stored_item={stored_item}
              update={this.fetchData}
            />
          ))}
          {pagesize}
          {buttons}
        </div>
      );
    } else if (this.props.item_type === "part") {
      display = (
        <div>
          {noData}
          
          {filteredResults.map((stored_item, i) => (
            <Parts
              key={i + stored_item}
              stored_item={stored_item}
              onChange={this.handleChange}
            />
          ))}
          {pagesize}
          {buttons}
        </div>
      );
    }

    return <div>{display}</div>;
  }
}

export default StoredManager;
