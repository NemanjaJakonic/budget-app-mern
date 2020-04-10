import React, { Component } from "react";
import { Modal, Button, Row, Col, Form, FormGroup } from "react-bootstrap";
import axios from "axios";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";

export default class AddTransaction extends Component {
  constructor(props) {
    super(props);

    this.onChangeType = this.onChangeType.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeAmount = this.onChangeAmount.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      type: "income",
      description: "",
      amount: 0,
      date: new Date(),
    };
  }
  onSubmit(e) {
    e.preventDefault();

    const transaction = {
      type: this.state.type,
      description: this.state.description,
      amount: this.state.amount,
      date: this.state.date,
    };

    console.log(transaction);

    axios
      .post("http://localhost:5000/transactions/add", transaction)
      .then((res) => console.log(res.data));
    alert("Transaction added!");
    this.setState({
      description: "",
      amount: 0,
    });
  }
  onChangeType(e) {
    this.setState({
      type: e.target.value,
    });
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value,
    });
  }

  onChangeAmount(e) {
    this.setState({
      amount: e.target.value,
    });
  }

  onChangeDate(date) {
    this.setState({
      date: date,
    });
  }

  render() {
    return (
      <div>
        <Modal
          ref={this.modal}
          {...this.props}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Add Transaction
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="container">
              <Row>
                <Col>
                  <Form onSubmit={this.onSubmit}>
                    <FormGroup controlId="TransactionType">
                      <Form.Label>Transaction type</Form.Label>
                      <Form.Control
                        as="select"
                        custom
                        value={this.state.type}
                        onChange={this.onChangeType}
                      >
                        <option value="income">Income</option>
                        <option value="expense">Expense</option>
                      </Form.Control>
                    </FormGroup>
                    <FormGroup controlId="TransactionDescription">
                      <Form.Label>Transaction description</Form.Label>
                      <Form.Control
                        type="text"
                        required
                        value={this.state.description}
                        onChange={this.onChangeDescription}
                      />
                    </FormGroup>
                    <FormGroup controlId="TransactionAmount">
                      <Form.Label>Transaction amount</Form.Label>
                      <Form.Control
                        type="number"
                        required
                        value={this.state.amount}
                        onChange={this.onChangeAmount}
                      />
                    </FormGroup>
                    <FormGroup controlId="TransactionDate">
                      <Form.Label>Transaction date</Form.Label>
                      <div>
                        <DatePicker
                          selected={this.state.date}
                          onChange={this.onChangeDate}
                        />
                      </div>
                    </FormGroup>
                    <FormGroup>
                      <Button variant="primary" type="submit">
                        Add transaction
                      </Button>
                    </FormGroup>
                  </Form>
                </Col>
              </Row>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.props.onHide}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
