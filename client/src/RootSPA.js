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

      <Switch>
        <Route path="/customer" exact>
          <Header />
          <CustomerSPA />
        </Route>
        {/* no header for welcome page */}
        <Route path="/customer/welcome">
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
          <VendorSPA />
        </Route>
        <Route path="/help">
          <Header />
          <CustomerSPA />
        </Route>
        <Route path="/contactus">
          <Header />
          <CustomerSPA />
        </Route>
        <Route path="/login">
          <Header />
          <Login />
        </Route>
        <Redirect to="/customer/welcome" />
      </Switch>
    </Router>
  );
}

export default App;
