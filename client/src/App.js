import React, { useEffect, useState } from "react";
import Login from "./pages/login/login";
import Dashboard from "./pages/Dashboard/Dashboard";
import DasUser from "./pages/Dashboard/DasUser";
import Customers from "./pages/Customers Detail/Customer_detail";
import CustomersUser from "./pages/Customers Detail/CustomerUser_detail";
import Acustomer_Detail from "./pages/Customers Detail/Acustomer_Detail";
import Products from "./pages/Products Detail/Products_detail";
import SalesPerson from "./pages/SalesPerson Detail/Salespersons_detail";
import Asales from "./pages/SalesPerson Detail/Asales";
import Tender from "./pages/Tender/tender";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import CustomersUser_detail from "./pages/Customers Detail/CustomerUser_detail";
import Addproduct from "./pages/Addproduct/Addproduct";
import Report from "./pages/ReportDetail/ReportDetail";
import { ProtectedRoute } from "./pages/portected.route";

function App() {
  const local = localStorage.getItem("user");
  useEffect(async () => {
    const local = await localStorage.getItem("user");
  }, [local]);
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Login} />
          <ProtectedRoute exact path="/dashboard" component={Dashboard} />
          <ProtectedRoute exact path="/customers" component={Customers} />
          <ProtectedRoute exact path="/products" component={Products} />
          <ProtectedRoute exact path="/salesperson" component={SalesPerson} />
          <ProtectedRoute
            exact
            path="/acustomer/:cid/:siid"
            component={Acustomer_Detail}
          />
          <ProtectedRoute exact path="/salesperson" component={SalesPerson} />
          <ProtectedRoute exact path="/asalesperson/:id" component={Asales} />
          <ProtectedRoute
            exact
            path="/customersUser"
            component={CustomersUser}
          />
          <ProtectedRoute
            exact
            path="/dasuser/:cid/:siid"
            component={DasUser}
          />
          <ProtectedRoute
            exact
            path="/customersUserdetail"
            component={CustomersUser_detail}
          />
          <ProtectedRoute
            exact
            path="/addproducts/:cid/:siid"
            component={Addproduct}
          />
          <ProtectedRoute
            exact
            path="/customersUser"
            component={CustomersUser}
          />
          <ProtectedRoute exact path="/report/:id" component={Tender} />
          <Route path="*" component={() => "404 NOT FOUND"} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
