import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Button, ButtonToolbar } from "react-bootstrap";
import AddTransaction from "./add-transaction.component";

const Transaction = (props) => (
  <li>
    <span className={`${props.transaction.type} font-weight-bold`}>
      {props.transaction.description}
    </span>
    <span>{props.transaction.amount} </span>
    <span>
      {" "}
      <button className="btn" title="edit">
        <Link to={"/edit/" + props.transaction._id}>
          <i className="fas fa-edit"></i>
        </Link>
      </button>
      <button
        title="delete"
        type="button"
        className="btn"
        onClick={() => {
          window.confirm("Are You Sure?") &&
            props.deleteTransaction(props.transaction._id);
        }}
      >
        <i className="fas fa-times text-danger"></i>
      </button>
    </span>
  </li>
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
      .then((response) => {
        this.setState({ transactions: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  componentDidUpdate() {
    this.refreshList();
  }
  deleteTransaction(id) {
    axios
      .delete("http://localhost:5000/transactions/" + id)
      .then((response) => {
        console.log(response.data);
      });

    this.setState({
      transactions: this.state.transactions.filter((el) => el._id !== id),
    });
  }

  transactionList() {
    return this.state.transactions.map((currenttransaction) => {
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
      (currenttransaction) => currenttransaction.type === "income"
    );
    if (transactions === undefined || transactions.length === 0) {
      return (income = 0);
    } else {
      if (income === undefined || income.length === 0) {
        return 0;
      } else
        return income
          .map((currenttransaction) => currenttransaction.amount)
          .reduce((prev, next) => prev + next);
    }
  }

  totalExpense() {
    let transactions = this.state.transactions;
    let expense = transactions.filter(
      (currenttransaction) => currenttransaction.type === "expense"
    );

    if (transactions === undefined || transactions.length === 0) {
      return (expense = 0);
    } else {
      if (expense === undefined || expense.length === 0) {
        return 0;
      } else
        return expense
          .map((currenttransaction) => currenttransaction.amount)
          .reduce((prev, next) => prev + next);
    }
  }

  render() {
    let addModalClose = () => this.setState({ addModalShow: false });
    let balance = parseInt(this.totalIncome()) - parseInt(this.totalExpense());
    let progress = Math.floor((balance * 100) / this.totalIncome());
    let progress_style = {
      width: `${progress}%`,
    };
    return (
      <div className="main">
        <h1 className="text-center">Budget App</h1>
        <div className="text-center my-5">
          <h5 className="text-secondary">Remaining Balance</h5>
          <h1 className="font-weight-bold">{balance}</h1>
          <h5 className="text-secondary">of {this.totalIncome()}</h5>
        </div>
        <div className="progress_bar mb-4">
          <div className="bar" style={progress_style}></div>
          <p className="text-center text-progress">{progress} %</p>
        </div>
        <div>
          <ul className="list">
            <li className="list-header">
              <span className="text-secondary">description:</span>
              <span className="text-secondary">amount:</span>
              <span className="text-secondary">actions:</span>
            </li>
            {this.transactionList()}
            <li>
              <span className="text-secondary">total expense</span>

              <span>{this.totalExpense()}</span>
              <span></span>
            </li>
          </ul>
        </div>
        <ButtonToolbar>
          <Button
            variant="add"
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
