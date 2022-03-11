import React from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
/* import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotateRight } from "@fortawesome/free-solid-svg-icons"; */
import AssemblyPart from "../AssemblyPart/AssemblyPart";
import Loading from "../Loading/Loading";
import Pagination from "../Pagination/Pagination";
import AddPartForm from "../AddPartForm/AddPartForm";
import Modal from "../Modal/Modal";
import ModalFooter from "../ModalFooter/ModalFooter";
import "./AssemblyParts.css";

class AssemblyParts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [],
      isLoading: false,
      selectedPartID: null,
      modalOpen: {
        create: false,
        edit: false,
        add: false,
        remove: false,
        delete: false,
      },
      pageSize: localStorage.getItem("assemblyPartPageSize")
        ? Number(localStorage.getItem("assemblyPartPageSize"))
        : 15,
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  openCreatePartModal = () => {
    const { modalOpen } = this.state;

    this.setState({ modalOpen: { ...modalOpen, create: true } });
  };

  closeCreatePartModal = (submitted = false) => {
    const { modalOpen } = this.state;

    submitted && this.fetchData();

    this.setState({ modalOpen: { ...modalOpen, create: false } });
  };

  openEditPartModal = (selectedPartID) => {
    const { modalOpen } = this.state;

    this.setState({
      selectedPartID,
      modalOpen: { ...modalOpen, edit: true },
    });
  };

  closeEditPartModal = (submitted = false) => {
    const { modalOpen } = this.state;

    submitted && this.fetchData();

    this.setState({
      selectedPartID: null,
      modalOpen: { ...modalOpen, edit: false },
    });
  };

  fetchData = () => {
    const url =
      "http://unn-w18002221.newnumyspace.co.uk/kv6002/php/assembly-parts";

    this.setState({ isLoading: true });
    fetch(url, {
      method: "POST",
      headers: new Headers(),
    })
      .then((resObj) =>
        resObj.status === 204 ? { status: 204, results: [] } : resObj.json()
      )
      .then((response) => {
        if (response) {
          if (response.status === 200 || response.status === 204) {
            toast.success("Successfully retrieved assembly parts");
            this.setState({ results: response.results });
          } else {
            throw new Error(response.message);
          }
        } else {
          throw new Error("No response object");
        }
      })
      .catch((err) =>
        toast.error(`Failed to retrieve assembly parts: ${err.message}`)
      )
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
    const { results, isLoading, modalOpen, selectedPartID, pageSize } =
      this.state;

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

    /*
    <button onClick={() => this.fetchData()}>
      Refresh <FontAwesomeIcon icon={faRotateRight} />
    </button>
    */

    return (
      <>
        <div>
          {isLoading ? (
            <Loading />
          ) : filteredResults.length === 0 ? (
            <p>No data found</p>
          ) : (
            <>
              <div>
                <button onClick={() => this.openCreatePartModal()}>
                  Add New Part
                </button>
              </div>
              <table className="parts-table">
                <thead style={{ marginBottom: "1rem" }}>
                  <tr>
                    <th>Serial Number</th>
                    <th>Part Name</th>
                    <th>Quantity</th>
                    <th>Notes</th>
                    <th>Low Warning</th>
                    <th>Order URL</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {filteredResults.map((assemblyPart) => (
                    <AssemblyPart
                      key={assemblyPart.part_id}
                      assemblyPart={assemblyPart}
                      openEditPartModal={this.openEditPartModal}
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
        <Modal modalOpen={modalOpen["create"]}>
          <AddPartForm closePortal={this.closeCreatePartModal} />
        </Modal>
        <Modal modalOpen={modalOpen["edit"]}>
          <div>
            <h1>{selectedPartID} EDIT PART MODAL</h1>
            <ModalFooter onClose={() => this.closeEditPartModal()} />
          </div>
        </Modal>
      </>
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
