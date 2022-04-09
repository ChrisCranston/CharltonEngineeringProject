import React from "react";
import PropTypes from "prop-types";
import "./Pagination.css";

/**
 * Pagination class component
 *
 * Adds page number functionality to a page.
 *
 * The number of items per page (pageSize), the current page, and the number of pages
 * are supplied to the component to allow for dynamic generation.
 *
 * Functions are also supplied to handle the changing of a page (next or previous) and
 * the selection of a different pageSize (number of items per page).
 *
 * Allows next and previous page toggling, and disables the buttons if
 * the user reaches the beginning (previous button) or end (next button) of the pages.
 *
 * @author Matthew William Dawson W18002221
 */
class Pagination extends React.Component {
  render() {
    const {
      pageSize,
      page,
      pageNumbers,
      handlePageSizeChange,
      handleNextClick,
      handlePreviousClick,
    } = this.props;

    return (
      <div>
        <div className="pagination">
          {pageNumbers > 1 && (
            <button
              className="button"
              onClick={handlePreviousClick}
              disabled={page <= 1}
            >
              Previous
            </button>
          )}
          <div className="page-numbers">
            <span className="page-numbers-contents">
              Page {page} of {pageNumbers}
            </span>
            <label className="page-numbers-contents items-per-page">
              <span className="select-menu-label">Items per page:</span>
              <select value={pageSize} onChange={handlePageSizeChange}>
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={15}>15</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
              </select>
            </label>
          </div>
          {pageNumbers > 1 && (
            <button
              className="button"
              onClick={handleNextClick}
              disabled={page >= pageNumbers}
            >
              Next
            </button>
          )}
        </div>
      </div>
    );
  }
}

Pagination.propTypes = {
  pageSize: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  pageNumbers: PropTypes.number.isRequired,
  handlePageSizeChange: PropTypes.func.isRequired,
  handleNextClick: PropTypes.func.isRequired,
  handlePreviousClick: PropTypes.func.isRequired,
};

export default Pagination;
