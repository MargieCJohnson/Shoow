import React, { Component } from "react";
import PropTypes from "prop-types";
import { watchStates } from "../Firebase/lists";
import Modal from "../components/Modal/Modal";
import PrimaryButton from "../components/PrimaryButton/PrimaryButton";
import "../components/ListPickerModal/ListPickerModal.scss";


class ListPickerModal extends Component {
  static propTypes = {
    isOpen: PropTypes.bool.isRequired,
    /* function to hide this modal */
    hideFunc: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    statusOfCurrent: PropTypes.string,
    onRemove: PropTypes.func.isRequired,
  };

  state = { current: "" };

  cancelModal = () => {
    this.formRef.current.reset();
    this.props.hideFunc();
  };

  /**
   * When the user clicks on save, call the onSubmit prop function
   */
  onSaveClick = () => {
    const { current } = this.state;
    const { onSubmit, hideFunc, statusOfCurrent } = this.props;

    // only call onSubmit if the user has actually selected one of the lists,
    // skip if no list is selected or if the user doesn't change selected list
    // so we don't have to write the same data to the database
    if (current && current !== statusOfCurrent) {
      onSubmit(current);
    }
    hideFunc();
  };

  onRemoveClick = () => {
    const { onRemove, hideFunc,  } = this.props;
    onRemove('watching');
    hideFunc();
  };

  onRemoveClick2 = () => {
    const { onRemove, hideFunc,  } = this.props;
    onRemove('plan_to_watch');
    hideFunc();
  };

   onRemoveClick3 = () => {
    const { onRemove, hideFunc,  } = this.props;
    onRemove('completed');
    hideFunc();
  };

  onRemoveClick4 = () => {
    const { onRemove, hideFunc,  } = this.props;
    onRemove('dropped');
    hideFunc();
  };

  render() {
    const { isOpen, hideFunc, statusOfCurrent } = this.props;
    const { current } = this.state;
    const { cancelModal, onSaveClick } = this;
    return (
      <Modal
        className="listpicker-modal-modal"
        isOpen={isOpen}
        hideFunc={hideFunc}
        onEnter={onSaveClick}
      >
        <h1 className="addTo">Add to:</h1>
        <br />
  <center>
  <input name="chosen-list" type="radio" onChange={this.onRemoveClick} />
  <label for="age1"> Watching</label><br/>
   <input name="chosen-list" type="radio" onChange={this.onRemoveClick2} />
  <label for="age1"> Plan To Watch</label><br/>
   <input name="chosen-list" type="radio" onChange={this.onRemoveClick3} />
  <label for="age1"> Completed</label><br/>
   <input name="chosen-list" type="radio" onChange={this.onRemoveClick4} />
  <label for="age1"> Dropped</label><br/>
  </center>
<br />
        <div className="buttons">
          <button className="cancel-btn" onClick={onSaveClick}>
            Cancel
          </button>
          <PrimaryButton onClick={onSaveClick}>Save</PrimaryButton>
        </div>
      </Modal>
    );
  }
}

export default ListPickerModal;
