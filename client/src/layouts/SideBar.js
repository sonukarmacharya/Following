import React from "react";
import "../assets/sass/app.css";
import { NavLink, useLocation } from "react-router-dom";
import dash from "../assets/images/dashboard.png";
import product from "../assets/images/product.png";
import sp from "../assets/images/sales person.png";
import cust from "../assets/images/customer.png";
import report from "../assets/images/report.png";
import logout from "../assets/images/logout.png";
import sideImage from "../assets/images/side-image.png";
import auth from "../pages/auth";
import { useHistory } from "react-router-dom";

export default function SideBar() {
  const { pathname } = useLocation();
  const history = useHistory();
  return (
    <div className="sidebar">
      <ul className="sidebar-menu pad-top">
        <li className="menu-item">
          <NavLink
            activeClassName="active"
            className="menu-btn"
            to="/dashboard"
          >
            <img src={dash} alt="" />
            Dashboards
          </NavLink>
        </li>
        <li className="menu-item">
          <NavLink activeClassName="active" className="menu-btn" to="/products">
            <img src={product} alt="" />
            Product Details
          </NavLink>
        </li>
        <li className="menu-item">
          <NavLink
            exact
            activeClassName="active"
            className="menu-btn"
            to="/salesperson"
            isActive={() =>
              ["/salesperson", "/asalesperson/:id"].includes(pathname)
            }
          >
            <img src={sp} alt="" />
            SalesPerson Detail
          </NavLink>
        </li>
        <li className="menu-item">
          <NavLink
            activeClassName="active"
            className="menu-btn"
            to="/customers"
            isActive={() =>
              ["/customers", "/acustomer/:id", "/customersUser"].includes(
                pathname
              )
            }
          >
            <img src={cust} alt="" />
            Customer Details
          </NavLink>
        </li>
        {/* <li className="menu-item">
          <NavLink className="menu-btn" to="/report">
            <img src={report} alt="" />
            Report
          </NavLink>
        </li> */}
        <hr />

        <li class="menu-item">
          <NavLink
            className="menu-btn"
            to="/"
            onClick={() => {
              auth.logout(() => {
                history.push("/");
              });
            }}
          >
            <img src={logout} alt="" />
            logout
          </NavLink>
        </li>
      </ul>
      <img src={sideImage} alt="" class="side-image" />
    </div>
  );
}
