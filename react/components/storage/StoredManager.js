import React from "react";
import Stored from "./Stored";
import Parts from "./Parts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotateRight } from "@fortawesome/free-solid-svg-icons";
import Pagination from "../ReusableComponents/Pagination/Pagination"
import URL from "../url.js"

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
    this.setState({ empty: "" });
  };

  fetchData = () => {
    let url = URL+"stored";
    let formData = new FormData();
    if (this.props.item_type === "part") {
      formData.append("part_search", true);
    } else if (this.props.item_type === "location") {
      formData.append("location_search",true);
      if (this.props.empty === "true") {
        formData.append("empty", this.props.empty);
      }
      if (this.props.warehouse !== undefined && this.props.warehouse !== "") {
        formData.append("warehouse", this.props.warehouse);
      }
    }
    
    formData.append("token", this.props.simToken);
    formData.append("simulate_get", "GET")
    fetch(url, { method: "POST", headers: new Headers(), body: formData })
      .then((response) => {
        if (response.status === 200 || response.status === 204) {
          return response.json();
        } else if (response.status === 204) {
          if (this.props.empty === "true") {
            this.props.outOfEmpties();
            alert("No empty locations remain");
          } else {
            alert("No Results with that filter please  try again");
          }
        } else {
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
        let name = false;
        if (s.storage_location_id === this.props.qrSearch) {
          name = true;
        }
        return name;
      } else {
        let search_string = s.location_string
          .toLowerCase()
          .includes(this.props.search.toLowerCase());
        return search_string;
      }
    } else if (this.props.item_type === "part") {
      if (this.props.qrSearch !== "") {
        let name = false;
        if (s.part_id === this.props.qrSearch) {
          name = true;
        }
        return name;
      } else {
        let name = s.name
          .toLowerCase()
          .includes(this.props.search.toLowerCase());
        let serial = s.serial_number
          .toLowerCase()
          .includes(this.props.search.toLowerCase());
        return name + serial;
      }
    }
  };

  render() {
    let noData = "";
    let buttons = "";

    if (this.state.results.length === 0) {
      noData = <p>No data found</p>;
    }
    let filteredResults = this.state.results;
    if (filteredResults.length > 0) {
      filteredResults = this.state.results.filter(this.filterSearch);
    }


    if (this.props.page !== undefined) {
      const pageSize = this.props.pageSize;
      let pageMax = this.props.page * pageSize;
      let pageMin = pageMax - pageSize;

      

      buttons = (
        <Pagination
                  pageSize={this.props.pageSize}
                  page={this.props.page}
                  pageNumbers={Math.ceil(filteredResults.length / this.props.pageSize)}
                  handlePageSizeChange={this.props.handlePageSize}
                  handleNextClick={this.props.handleNextClick}
                  handlePreviousClick={this.props.handlePreviousClick}
                />
      );
      filteredResults = filteredResults.slice(pageMin, pageMax);
    }

    let display = "";

    if (this.props.item_type === "location") {
      display = (        
        <div>
          <table className="assembly-parts-table">
            <thead style={{ marginBottom: "1rem" }}>
              <tr>
                <th>Warehouse Number:</th>
                <th>Location Name:</th>
                <th>Type: </th>
                <th>Stored: </th>
                <th className="refresh"><button onClick={() => this.fetchData()}>
                          Refresh <FontAwesomeIcon icon={faRotateRight} />
                        </button></th>
              </tr>
            </thead>
            <tbody>
              {noData}
              {filteredResults.map((stored_item, i) => (
                <Stored
                  simToken={this.props.simToken}
                  key={i + stored_item}
                  stored_item={stored_item}
                  update={this.fetchData}
                />
              ))}
            </tbody>
          </table>
          
          {buttons}
        </div>
      );
    } else if (this.props.item_type === "part") {
      display = (
        <div>
          <table className="assembly-parts-table">
            <thead style={{ marginBottom: "1rem" }}>
              <tr>
                <th>Serial Number:</th>
                <th>Name:</th>
                <th>Description: </th>
                <th className="refresh"><button onClick={() => this.fetchData()}>
                          Refresh <FontAwesomeIcon icon={faRotateRight} />
                        </button></th>
              </tr>
            </thead>
            <tbody>
              {noData}
              {filteredResults.map((stored_item, i) => (
                <Parts
                  simToken={this.props.simToken}
                  key={i + stored_item}
                  stored_item={stored_item}
                  onChange={this.handleChange}
                />
              ))}
            </tbody>
          </table>

          
          {buttons}
        </div>
      );
    }

    return <div>{display}</div>;
  }
}

export default StoredManager;
