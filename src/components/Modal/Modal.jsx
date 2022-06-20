import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import "./Modal.scss";

/**
 * A reusable modal/popup component.
 * The hideFunc prop is passed down so that the modal is closable by clicking outside the popup.
 * You can also optionally pass in a function that is called when the user presses the enter key.
 *
 * Can be dismissed with the Esc key and submitted with enter
 *
 * Example usage:
 *
 * <Modal isOpen={this.state.modalIsOpen} hideFunc={this.hideModal} onEnter={this.modalSubmit}>
 *   This is the content of the popup
 * </Modal>
 */
class Modal extends Component {
  static propTypes = {
    /* true or false if the modal is visible */
    isOpen: PropTypes.bool.isRequired,
    /* function to hide this modal */
    hideFunc: PropTypes.func.isRequired,
    /* optional: what happens when user presses Enter */
    onEnter: PropTypes.func,
    className: PropTypes.string,
    children: PropTypes.node.isRequired,
  };

  static defaultProps = {
    className: "",
    onEnter: () => {}, // no op function
  };

  componentDidMount() {
    window.addEventListener("keydown", this.keyListener);
  }

  componentWillUnmount() {
    this.props.hideFunc();
    window.removeEventListener("keydown", this.keyListener);
  }

  /**
   * Listen for keydown events so the user can close the modal with Esc
   */
  keyListener = event => {
    const { isOpen, onEnter } = this.props;
    if (event.key === "Escape" && isOpen) {
      this.cancelModal();
    } else if (event.key === "Enter" && isOpen) {
      onEnter();
    }
  };

  /**
   * What happens when the cancel button is pressed or if the user clicks outside
   */
  cancelModal = () => {
    this.props.hideFunc(); // hide the modal
  };

  render() {
    const {
      isOpen,
      children,
      className,
      hideFunc,
      onEnter,
      ...rest
    } = this.props;
    const { cancelModal } = this;
    return (
      <Fragment>
        {/* The actual modal */}
        <div
          {...rest}
          className={`${className} modals ${isOpen ? "open" : "closed"}`}
        >
          {children}
        </div>

        {/* The dark background behind the modal */}
        <div
          className={isOpen ? "modal-underlay open" : "modal-underlay closed"}
          onClick={cancelModal}
          role="presentation"
        />
      </Fragment>
    );
  }
}

export default Modal;
