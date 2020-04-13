import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../src/App.css";
import TransactionList from "./components/transactions-list.component";
import EditTransaction from "./components/edit-transaction.component";

function App() {
  return (
    <Router>
      <br />
      <div className="container">
        <Route path="/" exact component={TransactionList} />
        <Route path="/edit/:id" exact component={EditTransaction} />
      </div>
    </Router>
  );
}

export default App;
