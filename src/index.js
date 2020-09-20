import React from "react";
import ReactDOM from "react-dom";
import App from "./Components/App";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Register from "./Auth/Register";
import Login from "./Auth/Login";
import "semantic-ui-css/semantic.min.css";

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" exact component={App} />
      <Route path="/register" exact component={Register} />
      <Route path="/login" exact component={Login} />
    </Switch>
  </BrowserRouter>
);
ReactDOM.render(
  <React.StrictMode>
    <Routes />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
