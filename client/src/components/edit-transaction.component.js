import React, { Component } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default class EditExercise extends Component {
  constructor(props) {
    super(props);

    this.onChangeType = this.onChangeType.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeAmount = this.onChangeAmount.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      type: "",
      description: "",
      amount: 0,
      date: new Date()
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/transactions/" + this.props.match.params.id)
      .then(response => {
        this.setState({
          type: response.data.type,
          description: response.data.description,
          amount: response.data.amount,
          date: new Date(response.data.date)
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  onChangeType(e) {
    this.setState({
      type: e.target.value
    });
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    });
  }

  onChangeAmount(e) {
    this.setState({
      amount: e.target.value
    });
  }

  onChangeDate(date) {
    this.setState({
      date: date
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const transaction = {
      type: this.state.type,
      description: this.state.description,
      amount: this.state.amount,
      date: this.state.date
    };

    console.log(transaction);

    axios
      .post(
        "http://localhost:5000/transactions/update/" +
          this.props.match.params.id,
        transaction
      )
      .then(res => console.log(res.data));

    window.location = "/";
  }

  render() {
    return (
      <div>
        <h3>Edit Transaction</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Type: </label>
            <select
              ref={this.userInput}
              required
              className="form-control"
              value={this.state.type}
              onChange={this.onChangeType}
            >
              <option value="Income">Income</option>
              <option value="Expense">Expense</option>
            </select>
          </div>
          <div className="form-group">
            <label>Description: </label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.description}
              onChange={this.onChangeDescription}
            />
          </div>
          <div className="form-group">
            <label>Amount: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.amount}
              onChange={this.onChangeAmount}
            />
          </div>
          <div className="form-group">
            <label>Date: </label>
            <div>
              <DatePicker
                selected={this.state.date}
                onChange={this.onChangeDate}
              />
            </div>
          </div>

          <div className="form-group">
            <input
              type="submit"
              value="Edit Transaction"
              className="btn btn-primary"
            />
          </div>
        </form>
      </div>
    );
  }
}
