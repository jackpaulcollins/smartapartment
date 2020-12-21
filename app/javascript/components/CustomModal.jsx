import React from "react";
import PropTypes from 'prop-types';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';


class CustomModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      personToReset: null,
      newDate: ''
    };
    this.selectPerson = this.selectPerson.bind(this);
    this.updateUserDate = this.updateUserDate.bind(this);
  }

  selectPerson(person){
    this.setState({
      personToReset: person
    })
  }

  updateUserDate() {
    const url = "api/v1/users/update";
    const { personToReset } = this.state;

    const body = {
     personToReset
    };

    const token = document.querySelector('meta[name="csrf-token"]').content;
    fetch(url, {
      method: "POST",
      headers: {
        "X-CSRF-Token": token,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      //.then(response => this.props.history.push("/"))
      .catch(error => console.log(error.message));
      this.props.toggleModal();
  }

  render () {
    return (
      <>
        <Modal show={this.props.show} onHide={this.props.toggleModal}>
          <Modal.Header closeButton>
            <Modal.Title>Reset Your Date</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <ButtonGroup>
            <p>{this.state.personToReset}</p>
            <DropdownButton as={ButtonGroup} title="Who was fat?" id="bg-nested-dropdown">
              <Dropdown.Item eventKey="1" onClick={()=> this.selectPerson('Jack')}>Jack</Dropdown.Item>
              <Dropdown.Item eventKey="2" onClick={()=> this.selectPerson('Pete')}>Pete</Dropdown.Item>
            </DropdownButton>
          </ButtonGroup>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.props.toggleModal}>
              Close
            </Button>
            <Button variant="primary" onClick={this.updateUserDate}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

Modal.propTypes = {
  show: PropTypes.bool,
  toggleModal: PropTypes.func
} 


export default CustomModal;