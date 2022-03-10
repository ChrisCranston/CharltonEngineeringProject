import React from "react";
import PropTypes from "prop-types";
import AssemblyPart from "../AssemblyPart/AssemblyPart";
import Loading from "../Loading/Loading";
import Pagination from "../Pagination/Pagination";
import "./AssemblyParts.css";

class AssemblyParts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [],
      isLoading: false,
      pageSize: Number(localStorage.getItem("assemblyPartPageSize")) ?? 15,
    };
  }

  componentDidMount() {
    const url =
      "http://unn-w18002221.newnumyspace.co.uk/kv6002/php/assembly-parts";
    this.fetchData(url);
  }

  fetchData = (url) => {
    this.setState({ isLoading: true });
    fetch(url, {
      method: "POST",
      headers: new Headers(),
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else if (response.status !== 204) {
          throw Error(response.statusText);
        }
      })
      .then((data) => {
        this.setState({ results: data.results });
      })
      .catch((err) => {
        console.log("something went wrong ", err);
      })
      .finally(() => this.setState({ isLoading: false }));
  };

  filterSearch = (part) => {
    const { search } = this.props;

    const sanitisedSearch = search.replace(/\s\s+/g, " ").trim().toLowerCase();
    return (
      part.serial_number.toLowerCase().includes(sanitisedSearch) ||
      part.name.toLowerCase().includes(sanitisedSearch)
    );
  };

  filterByStockLevel = (part) => {
    const { filterBy } = this.props;

    const quantity = Number(part.quantity);
    const low_warning = Number(part.low_warning);

    return (
      (filterBy === "in-stock" && quantity > 0 && quantity > low_warning) ||
      (filterBy === "low-warning" && quantity <= low_warning && quantity > 0) ||
      (filterBy === "out-of-stock" && quantity === 0)
    );
  };

  handlePageSizeChange = (e) => {
    const pageSize = parseInt(e.target.value);
    this.setState({ pageSize });
    localStorage.setItem("assemblyPartPageSize", pageSize);
  };

  render() {
    const { results, isLoading, pageSize } = this.state;
    const {
      page,
      search,
      filterBy,
      sortBy,
      handleNextClick,
      handlePreviousClick,
    } = this.props;

    let filteredResults = results;

    if (filteredResults.length > 0 && search) {
      filteredResults = filteredResults.filter(this.filterSearch);
    }

    if (filterBy) {
      filteredResults = filteredResults.filter(this.filterByStockLevel);
    }

    filteredResults = filteredResults.sort((a, b) =>
      a[sortBy].localeCompare(b[sortBy])
    );

    const pageNumbers = Math.ceil(filteredResults.length / pageSize);

    if (page && pageNumbers > 1) {
      if (page) {
        const pageMax = page * pageSize;
        const pageMin = pageMax - pageSize;
        filteredResults = filteredResults.slice(pageMin, pageMax);
      }
    }

    return (
      <div>
        {isLoading ? (
          <Loading />
        ) : filteredResults.length === 0 ? (
          <p>No data found</p>
        ) : (
          <>
            <table className="parts-table">
              <thead style={{ marginBottom: "1rem" }}>
                <tr>
                  <th>Serial Number</th>
                  <th>Part Name</th>
                  <th>Quantity</th>
                  <th>Notes</th>
                  <th>Low Warning</th>
                  <th>Order URL</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {filteredResults.map((assemblyPart) => (
                  <AssemblyPart
                    key={assemblyPart.part_id}
                    assemblyPart={assemblyPart}
                  />
                ))}
              </tbody>
            </table>
            {page && (
              <Pagination
                pageSize={pageSize}
                page={page}
                pageNumbers={pageNumbers}
                handlePageSizeChange={this.handlePageSizeChange}
                handleNextClick={handleNextClick}
                handlePreviousClick={handlePreviousClick}
              />
            )}
          </>
        )}
      </div>
    );
  }
}

AssemblyParts.defaultProps = {
  search: "",
  filterBy: "",
  page: null,
  handleNextClick: null,
  handlePreviousClick: null,
};

AssemblyParts.propTypes = {
  search: PropTypes.string,
  filterBy: PropTypes.string,
  sortBy: PropTypes.string.isRequired,
  page: PropTypes.number,
  handleNextClick: PropTypes.func,
  handlePreviousClick: PropTypes.func,
};

export default AssemblyParts;
