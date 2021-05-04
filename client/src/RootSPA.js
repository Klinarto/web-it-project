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
      <Switch>
        <Route path="/customer" exact>
          <Header />
          <Welcome />
        </Route>
        <Route path="/customer/menu">
          <Header />
          <Menu />
        </Route>
        <Route path="/customer/pickup">
          <Header />
          <Pickup />
        </Route>
        <Route path="/customer/order">
          <Header />
          <Order />
        </Route>
        <Route path="/customer/rate">
          <Header />
          <Rate />
        </Route>
        <Route path="/vendor">
          <Header />
        </Route>
        <Route path="/help">
          <Header />
        </Route>
        <Route path="/contactus">
          <Header />
        </Route>
        <Route path="/customer/login">
          <Header />
          <Login />
        </Route>
        <Route path="/customer/register">
          <Header />
          <Register />
        </Route>
        <Redirect to="/customer" />
      </Switch>
    </Router>
  );
}

export default App;
