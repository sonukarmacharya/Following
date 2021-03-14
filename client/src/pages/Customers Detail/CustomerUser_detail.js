import React, { useEffect, useState } from "react";
import HeaderUser from "../../layouts/HeaderUser";
import "../../assets/sass/app.css";
import srch from "../search";
import axios from "axios";
import Header from "../../layouts/HeadSales";
import { useHistory, Link } from "react-router-dom";

const CustomersUser = () => {
  const id = localStorage.getItem("user");
  const [inquiry, setinquiry] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredCust, setFilteredCust] = useState([]);
  const [asgcompany, setAsgCompany] = useState([]);
  const history = useHistory();

  useEffect(async () => {
    const inq = await axios.get(`/auth/Displaytodaytask/${id}`);
    setinquiry(inq.data.data);
    const asgcomp = await axios(`/auth/gettask/${id}`);
    setAsgCompany(asgcomp.data.data);
  }, []);

  useEffect(() => {
    let se = srch.searchCustomer(asgcompany, search);
    setFilteredCust(se);
  }, [search, asgcompany]);

  useEffect(() => {
    console.log(asgcompany);
  }, [asgcompany]);

  let handleTable = (cid, siid) => {
    history.push(`/dasuser/${cid}/${siid}`);
  };

  return (
    <div>
      <Header />
      {/* <HeaderUser /> */}
      <div class="">
        <div class="path">
          <span>SalesPerson Dashboard</span>
        </div>
        <div class="welcome-container">
          <div class="heading-h4 theme-color">
            Welcome to Sales person dashboard
          </div>
          <p>Sales person can add manage customers</p>
        </div>
        <div class="table-responsive-md table-container gutter-top-md ">
          <div class="table-top">
            <div class="form-title">Customer Information</div>
            <div class="search-container">
              <i class="fas fa-search"></i>
              <input
                type="search"
                name=""
                id=""
                placeholder="Search products"
              />
            </div>
            <div class="sort">
              <i class="fas fa-sort-alpha-down"></i>
            </div>
          </div>
          <div class="row">
            <div class="col-lg-2">
              <div class="overview">
                <div class="number">
                  24<span> Today inquiry</span>
                </div>
              </div>
              <div class="overview">
                <div class="number">
                  24<span> Today inquiry</span>
                </div>
              </div>
            </div>
            <div class="col-lg-10">
              <div class="table-wrap">
                <table class="table table-hover">
                  <thead class="bg-theme">
                    <tr>
                      <th scope="col">Company name</th>
                      <th scope="col">Landline</th>
                      <th scope="col">Project name</th>
                      <th scope="col">Project Amount</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <a href="/dasuser/3/4" style={{ color: "black" }}>
                        <td>ABC Company</td>
                      </a>
                      <td>01727364</td>
                      <td>B2</td>
                      <td>1234</td>
                      <td>
                        <i class="fas fa-edit"></i>
                        <i class="fas fa-trash"></i>
                      </td>
                    </tr>
                    <tr>
                      <td>ABC Company</td>
                      <td>District 1</td>
                      <td>B2</td>
                      <td>1234</td>
                      <td>
                        <i class="fas fa-edit"></i>
                        <i class="fas fa-trash"></i>
                      </td>
                    </tr>
                    <tr>
                      <td>ABC Company</td>
                      <td>District 1</td>
                      <td>B2</td>
                      <td>1234</td>
                      <td>
                        <i class="fas fa-edit"></i>
                        <i class="fas fa-trash"></i>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="container custom">
        <div className="pad-top container custom">
          <h2 className="text-center">Customers Detail</h2>
          <hr className="dashuser-hr" />
        </div>
        <div className="column">
          <div className="d-flex ml-3 ">
            <div className="bg-light">
              <h1 className="cust-main-left-content-head">
                Today's Total Number Of Inquiries
              </h1>
              <hr className="cust-left-below-hr" />
              {inquiry
                ? inquiry.map((i) => (
                    <div className="cust-left-below">
                      <h1 className="cust-left-below-p">{i.total}</h1>
                    </div>
                  ))
                : null}
            </div>
            <div className="pad-top ml-5 top-search">
              <p className="search-head">Customers Name</p>
              <div className="search-box">
                <input
                  type="text"
                  className="search-inputtext"
                  onChange={(e) => setSearch(e.target.value)}
                />
                <i className="search-icon  icon-search"></i>
              </div>
            </div>
            <div className="sort">
              <div className="sort-one">
                <p className="sort-label">Name </p>
                <i className="sort-icon  icon-a-z"></i>
              </div>
            </div>
          </div>
          <div className="pad-top">
            <table class="table table-hover">
              <thead class="thead-dark">
                <tr>
                  <th scope="col">Company Name</th>
                  <th scope="col">Landline</th>
                  <th scope="col">Project Name</th>
                  <th scope="col">Project Amount</th>
                </tr>
              </thead>
              <tbody>
                {filteredCust.map((comp) => (
                  <tr
                    className="table-tr"
                    key={comp.Co_ID}
                    onClick={() => handleTable(comp.Co_ID, comp.Si_ID)}
                  >
                    <th scope="row">
                      <p> {comp.Co_Name}</p>
                    </th>
                    <td> {comp.Co_Landline}</td>
                    <td> {comp.Prj_Name}</td>
                    <td> {comp.Prj_Amt}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default CustomersUser;
