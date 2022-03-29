import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import "./Modal.css";

/**
 * Modal class component
 *
 * Generates a modal that will appear as a popup and then passes in
 * a supplied child component to display to the user.
 *
 * The modal is created using React.createPortal and added inside the
 * document.body. window.scrollY is used to prevent the page from scrolling
 * when the modal is visible. The scroll-bar is removed by setting the position
 * of the body to fixed, and the current user's position is saved so that they
 * can be returned to it once the modal is closed, without the page jumping to
 * the top.
 *
 * @author Matthew William Dawson W18002221
 */
class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      scrollPosition: 0.0,
    };
  }

  componentDidUpdate(prevProps) {
    const { scrollPosition } = this.state;
    const { modalOpen } = this.props;

    if (prevProps.modalOpen !== modalOpen) {
      if (modalOpen) {
        this.setState({ scrollPosition: window.scrollY });
        document.body.style.top = `-${window.scrollY}px`;
        document.body.style.position = "fixed";
      } else {
        document.body.style.position = "";
        document.body.style.top = "";
        window.scrollTo(0, scrollPosition);
        this.setState({ scrollPosition: 0.0 });
      }
    }
  }

  render() {
    const { children, modalOpen } = this.props;

    return ReactDOM.createPortal(
      modalOpen && (
        <div className={`modal-background ${!modalOpen ? "display-none" : ""}`}>
          <div className="modal-content">{children}</div>
        </div>
      ),
      document.body
    );
  }
}

Modal.propTypes = {
  modalOpen: PropTypes.bool.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element,
  ]).isRequired,
};

export default Modal;
