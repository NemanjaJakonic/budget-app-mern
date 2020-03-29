import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Button, ButtonToolbar, Row, Col } from "react-bootstrap";
import AddTransaction from "./add-transaction.component";
import Table from "react-bootstrap/Table";

const Transaction = props => (
  <tr>
    <td>{props.transaction.type}</td>
    <td>{props.transaction.description}</td>
    <td>{props.transaction.amount} RSD</td>
    <td>{props.transaction.date.substring(0, 10)}</td>
    <td>
      <button className="btn btn-info">
        <Link to={"/edit/" + props.transaction._id}>
          <i class="fas fa-edit"></i>
        </Link>
      </button>
      <button
        type="button"
        className="btn btn-danger"
        onClick={() => {
          window.confirm("Are You Sure?") &&
            props.deleteTransaction(props.transaction._id);
        }}
      >
        <i className="fas fa-times"></i>
      </button>
    </td>
  </tr>
);

export default class TransactionsList extends Component {
  constructor(props) {
    super(props);

    this.deleteTransaction = this.deleteTransaction.bind(this);
    this.totalIncome = this.totalIncome.bind(this);
    this.state = { transactions: [], addModalShow: false };
  }

  componentDidMount() {
    this.refreshList();
  }
  refreshList() {
    axios
      .get("http://localhost:5000/transactions/")
      .then(response => {
        this.setState({ transactions: response.data });
      })
      .catch(error => {
        console.log(error);
      });
  }
  componentDidUpdate() {
    this.refreshList();
  }
  deleteTransaction(id) {
    axios.delete("http://localhost:5000/transactions/" + id).then(response => {
      console.log(response.data);
    });

    this.setState({
      transactions: this.state.transactions.filter(el => el._id !== id)
    });
  }

  transactionList() {
    return this.state.transactions.map(currenttransaction => {
      return (
        <Transaction
          transaction={currenttransaction}
          deleteTransaction={this.deleteTransaction}
          key={currenttransaction._id}
        />
      );
    });
  }

  totalIncome() {
    let transactions = this.state.transactions;
    let income = transactions.filter(
      currenttransaction => currenttransaction.type === "Income"
    );
    if (transactions === undefined || transactions.length === 0) {
      return (income = 0);
    } else {
      if (income === undefined || income.length === 0) {
        return 0;
      } else
        return income
          .map(currenttransaction => currenttransaction.amount)
          .reduce((prev, next) => prev + next);
    }
  }

  totalExpense() {
    let transactions = this.state.transactions;
    let expense = transactions.filter(
      currenttransaction => currenttransaction.type === "Expense"
    );

    if (transactions === undefined || transactions.length === 0) {
      return (expense = 0);
    } else {
      if (expense === undefined || expense.length === 0) {
        return 0;
      } else
        return expense
          .map(currenttransaction => currenttransaction.amount)
          .reduce((prev, next) => prev + next);
    }
  }

  render() {
    let addModalClose = () => this.setState({ addModalShow: false });
    return (
      <div>
        <Row>
          <Col sm={6}>
            <h3 className="text-center">
              Total income: {this.totalIncome()} RSD
            </h3>
          </Col>
          <Col sm={6}>
            <h3 className="text-center">
              <small>Total expense:</small> {this.totalExpense()} RSD
            </h3>
          </Col>
        </Row>
        <Row>
          <Col>
            {" "}
            <h1 className="text-center my-5">
              Balance :{" "}
              {parseInt(this.totalIncome()) - parseInt(this.totalExpense())} RSD
            </h1>
          </Col>
        </Row>

        <Row>
          <Table>
            <thead className="thead-light">
              <tr>
                <th>Type</th>
                <th>Description</th>
                <th>Amount</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>{this.transactionList()}</tbody>
          </Table>
        </Row>
        <ButtonToolbar>
          <Button
            variant="primary"
            onClick={() => this.setState({ addModalShow: true })}
          >
            Add Transaction
          </Button>
          <AddTransaction
            show={this.state.addModalShow}
            onHide={addModalClose}
          />
        </ButtonToolbar>
      </div>
    );
  }
}
