import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";

import CustomerSPA from "./customer-app/pages/CustomerSPA";
import VendorSPA from "./vendor-app/pages/VendorSPA";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/customer">
          <CustomerSPA />
        </Route>
        <Route path="/vendor">
          <VendorSPA />
        </Route>
        <Redirect to="/customer" />
      </Switch>
    </Router>
  );
};

export default App;
