import React from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
/* import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotateRight } from "@fortawesome/free-solid-svg-icons"; */
import AssemblyPart from "../AssemblyPart/AssemblyPart";
import CreatePartForm from "../AssemblyPartsForms/CreatePartForm/CreatePartForm";
import EditPartForm from "../AssemblyPartsForms/EditPartForm/EditPartForm";
import ChangeQuantityForm from "../AssemblyPartsForms/ChangeQuantityForm/ChangeQuantityForm";
import DeletePartForm from "../AssemblyPartsForms/DeletePartForm/DeletePartForm";
import Loading from "../../ReusableComponents/Loading/Loading";
import Pagination from "../../ReusableComponents/Pagination/Pagination";
import Modal from "../../ReusableComponents/Modal/Modal";
import {
  fetchResource,
  getAssemblyPartPageSize,
  setAssemblyPartPageSize,
} from "../assemblyPartHelpers";
import {
  ASSEMBLY_PARTS_URL,
  DEFAULT_ASSEMBLY_PART_PAGE_SIZE,
  editTypes,
} from "../assemblyPartConstants";
import "./AssemblyParts.css";

class AssemblyParts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      results: {},
      isLoading: false,
      selectedPartID: null,
      modalOpen: {
        create: false,
        add: false,
        remove: false,
        edit: false,
        delete: false,
      },
      pageSize: getAssemblyPartPageSize()
        ? Number(getAssemblyPartPageSize())
        : DEFAULT_ASSEMBLY_PART_PAGE_SIZE,
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  openPartModal = (editType, selectedPartID = null) => {
    const { modalOpen } = this.state;

    this.setState({
      selectedPartID,
      modalOpen: { ...modalOpen, [editType]: true },
    });
  };

  closePartModal = (editType, submitted = false) => {
    const { modalOpen } = this.state;

    submitted && this.fetchData();

    this.setState({
      selectedPartID: null,
      modalOpen: { ...modalOpen, [editType]: false },
    });
  };

  fetchData = () => {
    this.setState({ isLoading: true });

    fetchResource(ASSEMBLY_PARTS_URL, {
      method: "POST",
      headers: new Headers(),
    })
      .then((response) => {
        if (response) {
          if (response.status === 200 || response.status === 204) {
            toast.success("Successfully retrieved assembly parts");
            this.setState({
              results: response.results.reduce(
                (obj, variable) => ({
                  ...obj,
                  [variable.part_id]: variable,
                }),
                {}
              ),
            });
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
    setAssemblyPartPageSize(pageSize);
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

    let filteredResults = Object.values(results);

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
                <button onClick={() => this.openPartModal("create")}>
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
                      openPartModal={this.openPartModal}
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
        <Modal modalOpen={modalOpen[editTypes.CREATE]}>
          <CreatePartForm closePortal={this.closePartModal} />
        </Modal>
        <Modal modalOpen={modalOpen[editTypes.EDIT]}>
          <EditPartForm
            selectedPart={results[selectedPartID]}
            closePortal={this.closePartModal}
          />
        </Modal>
        <Modal modalOpen={modalOpen[editTypes.ADD]}>
          <ChangeQuantityForm
            selectedPart={results[selectedPartID]}
            editType={editTypes.ADD}
            closePortal={this.closePartModal}
          />
        </Modal>
        <Modal modalOpen={modalOpen[editTypes.REMOVE]}>
          <ChangeQuantityForm
            selectedPart={results[selectedPartID]}
            editType={editTypes.REMOVE}
            closePortal={this.closePartModal}
          />
        </Modal>
        <Modal modalOpen={modalOpen[editTypes.DELETE]}>
          <DeletePartForm
            selectedPartID={results[selectedPartID]?.part_id}
            selectedPartSerialNumber={results[selectedPartID]?.serial_number}
            selectedPartName={results[selectedPartID]?.name}
            editType={editTypes.DELETE}
            closePortal={this.closePartModal}
          />
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
