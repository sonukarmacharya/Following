import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import axios from "axios";
import "../assets/sass/app.css";
import logo from "../assets/images/logo.png";
import { useHistory } from "react-router-dom";
import auth from "../pages/auth";
import Sidebar from "./SideBar";

const Header = (props) => {
  const { pathname } = useLocation();
  const history = useHistory();
  const [username, setusername] = useState("");
  const [image, setimage] = useState();

  useEffect(async () => {
    const Id = localStorage.getItem("user");
    let user = await axios.get(`/auth/admin/${Id}`);
    console.log(Id);
    // setimage(user.data.data[0].A_Image);
    setusername(user.data.data[0].A_Username);
  }, []);

  return (
    <div>
      <Sidebar />
      <header class="header">
        <div class="header-menu">
          <div class="sidebar-btn">
            <i class="fas fa-bars"></i>
          </div>
          <div class="logo">
            <img src={logo} alt="" />
            <span class="logo-title">Construction Pvt Ltd</span>
          </div>

          <div class="profile">
            {/* <i class="fas fa-user"></i>
            <span>Sujata khadka</span> */}
            {!image ? (
              <i className="fas fa-user"></i>
            ) : (
              <img
                className="img-container"
                src="http://localhost:5000/Admin/image-1606199832232.jpg"
              />
            )}
            <span>{username}</span>
          </div>
        </div>
      </header>
      {/* <header className="head">
        <nav class="navbar navbar-expand-lg navbar-dark head__custom-nav">
          <a class="navbar-brand d-flex align-items-center" href="#">
            <img src={logo} className="login-logo " />
            <span className="text-light">Construction Solution Pvt Ltd</span>
          </a>

          <button
            class="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
          >
            <span>
              <i class="fa fa-navicon text-white"></i>
            </span>
          </button>
          <div
            class="collapse navbar-collapse justify-content-end"
            id="navbarNav"
          >
            <ul class="navbar-nav">
              <li class="nav-item">
                <NavLink
                  activeClassName="header-list-active"
                  className="nav-link"
                  to="/dashboard"
                >
                  Dashboards
                </NavLink>
              </li>
              <li class="nav-item">
                <NavLink
                  exact
                  activeClassName="header-list-active"
                  className="nav-link"
                  to="/salesperson"
                  isActive={() =>
                    ["/salesperson", "/asalesperson/:id"].includes(pathname)
                  }
                >
                  SalesPerson Detail
                </NavLink>
              </li>
              <li class="nav-item">
                <NavLink
                  activeClassName="header-list-active"
                  className="nav-link"
                  to="/customers"
                  isActive={() =>
                    ["/customers", "/acustomer/:id", "/customersUser"].includes(
                      pathname
                    )
                  }
                >
                  Customer Details
                </NavLink>
              </li>
              <li class="nav-item">
                <NavLink
                  activeClassName="header-list-active"
                  className="nav-link"
                  to="/products"
                >
                  Product Details
                </NavLink>
              </li>
              <li class="nav-item">
                <NavLink
                  activeClassName="header-list-active"
                  className="nav-link"
                  to="/tender"
                >
                  Tender Detail
                </NavLink>
              </li>
              <li class="nav-item">
                <NavLink
                  className="nav-link"
                  to="/"
                  onClick={() => {
                    auth.logout(() => {
                      history.push("/");
                    });
                  }}
                >
                  logout
                </NavLink>
              </li>
            </ul>
          </div>
        </nav>
      </header> */}
    </div>
  );
};

export default Header;
