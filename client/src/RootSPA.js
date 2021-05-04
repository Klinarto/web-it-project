import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";

import Header from "./shared/components/Header/Header";
import Login from "./customer-app/pages/Login";
import Menu from "./customer-app/pages/Menu";
import Order from "./customer-app/pages/Order";
import Pickup from "./customer-app/pages/Pickup";
import Rate from "./customer-app/pages/Rate";
import Welcome from "./customer-app/pages/welcome";
import Register from "./customer-app/pages/Register";

export function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/customer" exact>
          <Welcome />
        </Route>
        <Route path="/customer/menu">
          <Menu />
        </Route>
        <Route path="/customer/pickup">
          <Pickup />
        </Route>
        <Route path="/customer/order">
          <Order />
        </Route>
        <Route path="/customer/rate">
          <Rate />
        </Route>
        <Route path="/vendor"></Route>
        <Route path="/help"></Route>
        <Route path="/contactus"></Route>
        <Route path="/customer/login">
          <Login />
        </Route>
        <Route path="/customer/register">
          <Register />
        </Route>
        <Redirect to="/customer" />
      </Switch>
    </Router>
  );
}

export default App;
