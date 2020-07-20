import React from "react";
import HomePage from "./HomePage";
import { Router, Route } from "react-router-dom";
import { createBrowserHistory as createHistory } from "history";
import TopBar from "./TopBar";
import { DocumentStore } from "./store";
import "./App.css";
const history = createHistory();
const documentStore = new DocumentStore();
function App() {
  return (
    <div className="App">
      <Router history={history}>
        <TopBar />
        <Route
          path="/"
          exact
          component={props => (
            <HomePage {...props} documentStore={documentStore} />
          )}
        />
      </Router>
    </div>
  );
}
export default App;