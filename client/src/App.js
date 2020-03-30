import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import TransactionList from "./components/transactions-list.component";
import EditTransaction from "./components/edit-transaction.component";
import CreateTransaction from "./components/create-transaction.component";
import "../src/App.css";

function App() {
  return (
    <Router>
      <br />
      <div className="container">
        <Route path="/" exact component={TransactionList} />
        <Route path="/edit/:id" exact component={EditTransaction} />
        <Route path="/create" exact component={CreateTransaction} />
      </div>
    </Router>
  );
}

export default App;
