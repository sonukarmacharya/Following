import React from "react";
import "../assets/sass/app.css";
import dash from "../assets/images/dashboard.png";
import product from "../assets/images/product.png";
import sp from "../assets/images/sales person.png";
import cust from "../assets/images/customer.png";
import report from "../assets/images/report.png";
import logout from "../assets/images/logout.png";
import sideImage from "../assets/images/side-image.png";

export default function SideBar() {
  return (
    <div className="sidebar">
      <ul className="sidebar-menu pad-top">
        <li className="menu-item">
          <a href="" className="menu-btn active">
            <img src={dash} alt="" />
            <span>Dashboard</span>
          </a>
        </li>
        <li className="menu-item">
          <a href="" className="menu-btn">
            <img src={product} alt="" />
            <span>Product Details</span>
          </a>
        </li>
        <li className="menu-item">
          <a href="" className="menu-btn">
            <img src={sp} alt="" />
            <span>Sales Person Details</span>
          </a>
        </li>
        <li className="menu-item">
          <a href="" className="menu-btn">
            <img src={cust} alt="" />
            <span>Customer Details</span>
          </a>
        </li>
        <li className="menu-item">
          <a href="" className="menu-btn">
            <img src={report} alt="" />
            <span>Report</span>
          </a>
        </li>
        <hr />

        <li class="menu-item">
          <a href="" class="menu-btn">
            <img src={logout} alt="" />
            <span>Logout</span>
          </a>
        </li>
      </ul>
      <img src={sideImage} alt="" class="side-image" />
    </div>
  );
}
