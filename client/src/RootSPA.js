import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";

import CustomerSPA from "./customer-app/pages/CustomerSPA";
import VendorSPA from "./vendor-app/pages/VendorSPA";
import Header from "./shared/components/Header/Header";
import Login from "./customer-app/pages/Login";
import Menu from "./customer-app/pages/Menu";
import Order from "./customer-app/pages/Order";
import Pickup from "./customer-app/pages/Pickup";
import Rate from "./customer-app/pages/Rate";
import Welcome from "./customer-app/pages/welcome";

export function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/customer" exact>
          <CustomerSPA />
        </Route>
        <Route path="/customer/welcome">
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
        <Route path="/vendor">
          <VendorSPA />
        </Route>
        <Route path="/help">
          <CustomerSPA />
        </Route>
        <Route path="/contactus">
          <CustomerSPA />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Redirect to="/customer" />
      </Switch>
    </Router>
  );
}

export default App;
