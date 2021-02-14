import React, { useEffect, useState } from "react";
import HeaderUser from "../../layouts/HeaderUser";
import "../../assets/sass/app.css";
import srch from "../search";
import axios from "axios";
import { useHistory } from "react-router-dom";

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

  let handleTable = (cid,siid) => {
    history.push(`/dasuser/${cid}/${siid}`);
  };

  return (
    <div>
      <HeaderUser />
      <div className="container custom">
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
                        onClick={() => handleTable(comp.Co_ID,comp.Si_ID)}
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
      </div>
    </div>
  );
};

export default CustomersUser;
