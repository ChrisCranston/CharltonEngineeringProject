import React from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotateRight } from "@fortawesome/free-solid-svg-icons";
import AssemblyPart from "../AssemblyPart/AssemblyPart";
import CreatePartForm from "../AssemblyPartsForms/CreatePartForm/CreatePartForm";
import EditPartForm from "../AssemblyPartsForms/EditPartForm/EditPartForm";
import ChangeQuantityForm from "../AssemblyPartsForms/ChangeQuantityForm/ChangeQuantityForm";
import DeletePartForm from "../AssemblyPartsForms/DeletePartForm/DeletePartForm";
import Loading from "../../ReusableComponents/Loading/Loading";
import Pagination from "../../ReusableComponents/Pagination/Pagination";
import Modal from "react-modal";
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

/**
 * AssemblyParts class component
 *
 * Filters, sorts and displays the assembly parts
 * table. Also renders the create, edit, quantity
 * and delete part modal functionality. Also renders
 * the pagination functionality.
 *
 * @author Matthew William Dawson W18002221
 */

class AssemblyParts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      results: {},
      isLoading: false,
      selectedPartID: null,
      customStyles: {
        content: {
          top: "50%",
          left: "50%",
          right: "auto",
          bottom: "auto",
          marginRight: "-50%",
          transform: "translate(-50%, -50%)",
        },
      },
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

  closePartModal = (editType) => {
    const { modalOpen } = this.state;

    this.fetchData();

    this.setState({
      selectedPartID: null,
      modalOpen: { ...modalOpen, [editType]: false },
    });
  };

  fetchData = () => {
    const { simToken } = this.props;
    this.setState({ isLoading: true });

    const formData = new FormData();
    formData.append("token", simToken);

    fetchResource(ASSEMBLY_PARTS_URL, {
      method: "POST",
      headers: new Headers(),
      body: formData,
    })
      .then((response) => {
        if (response) {
          if (response.status === 200 || response.status === 204) {
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
    const { results, isLoading, modalOpen, selectedPartID, pageSize, customStyles } =
      this.state;

    const {
      simToken,
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

    return (
      <>
        <div>
          {isLoading ? (
            <Loading />
          ) : filteredResults.length === 0 ? (
            <p>No data found</p>
          ) : (
            <>
              <div className="mobile-buttons">
                <button onClick={() => this.openPartModal(editTypes.CREATE)}>
                  Add New Part
                </button>
                <button onClick={() => this.fetchData()}>
                  Refresh <FontAwesomeIcon icon={faRotateRight} />
                </button>
              </div>
              <table className="assembly-parts-table">
                <thead style={{ marginBottom: "1rem" }}>
                  <tr>
                    <th>Serial Number</th>
                    <th>Part Name</th>
                    <th>Quantity</th>
                    <th>Notes</th>
                    <th>Low Warning</th>
                    <th>Order URL</th>
                    <th>
                      <div className="part-buttons part-vertical-buttons">
                      <button
                          onClick={() => this.openPartModal(editTypes.CREATE)}
                        >
                          Add New Part
                        </button>
                        <button onClick={() => this.fetchData()}>
                          Refresh <FontAwesomeIcon icon={faRotateRight} />
                        </button>
                      </div>
                    </th>
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
        <Modal isOpen={modalOpen[editTypes.CREATE]} style={customStyles}>
          <CreatePartForm
            simToken={simToken}
            closePortal={this.closePartModal}
          />
        </Modal>
        <Modal isOpen={modalOpen[editTypes.EDIT]} style={customStyles}>
          <EditPartForm
            simToken={simToken}
            selectedPart={results[selectedPartID]}
            closePortal={this.closePartModal}
          />
        </Modal>
        <Modal isOpen={modalOpen[editTypes.ADD]} style={customStyles}>
          <ChangeQuantityForm
            simToken={simToken}
            selectedPart={results[selectedPartID]}
            editType={editTypes.ADD}
            closePortal={this.closePartModal}
          />
        </Modal>
        <Modal isOpen={modalOpen[editTypes.REMOVE]} style={customStyles}>
          <ChangeQuantityForm
            simToken={simToken}
            selectedPart={results[selectedPartID]}
            editType={editTypes.REMOVE}
            closePortal={this.closePartModal}
          />
        </Modal>
        <Modal isOpen={modalOpen[editTypes.DELETE]} style={customStyles}>
          <DeletePartForm
            simToken={simToken}
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
  simToken: PropTypes.string.isRequired,
  search: PropTypes.string,
  filterBy: PropTypes.string,
  sortBy: PropTypes.string.isRequired,
  page: PropTypes.number,
  handleNextClick: PropTypes.func,
  handlePreviousClick: PropTypes.func,
};

export default AssemblyParts;
