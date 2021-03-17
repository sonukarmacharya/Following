import React, { useState, useEffect } from "react";
import Header from "../../layouts/Header";
import Welcome from "../../layouts/Welcome";
import srch from "../search";
import srt from "../sort";
import "../../assets/sass/app.css";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { Scrollbars } from "rc-scrollbars";
import Modal from "react-modal";
Modal.setAppElement("#root");

const Customers = () => {
  const [priority, setPriority] = useState([]);
  const [comp, setComp] = useState([]);
  const [error, setError] = useState(false);
  const [search, setSearch] = useState("");
  const [filteredCust, setFilteredCust] = useState([]);
  const [sortState, setSortState] = useState(false);
  const history = useHistory();
  const [modalIsOpen, setmodalIsOpen] = useState(false);
  const [editreview, setEditreview] = useState(null);
  const [val, setval] = useState("");
  const [id, setid] = useState();

  useEffect(async () => {
    await axios
      .all([
        await axios.get(`/auth/Displaypriority`),
        await axios.get(`/auth/company`),
      ])
      .then(
        axios.spread((priority, company) => {
          setPriority(priority.data.data);
          setComp(company.data.data);
        })
      )
      .catch((err) => alert("ERROR", err));
  }, []);

  useEffect(() => {
    let se = srch.searchCustomer(comp, search);
    setFilteredCust(se);
  }, [search, comp]);

  useEffect(() => {
    console.log(sortState);
    if (!sortState) {
      let de = srt.descCust(comp);
      setFilteredCust(de);
      console.log(filteredCust);
    } else {
      let as = srt.ascCust(comp);
      setFilteredCust(as);
      console.log(filteredCust);
    }
  }, [sortState]);

  let handleTable = (cid, siid) => {
    history.push(`/acustomer/${cid}/${siid}`);
  };

  let handleEdit = (e, name, key) => {
    const { value } = e.target;
    setval({ ...val, [e.target.name]: e.target.value });
    console.log("vv", val);
  };

  let handleEnter = async (id) => {
    setEditreview(null);
    console.log("edit", val, id);
    axios.post(`/auth/Updatecompany/${id}`, val).then(() => {
      alert("edited");
      window.location.reload();
    });
  };
  let handleDelete = (id) => {
    console.log("del", id);
    axios.delete(`/auth/company/${id}`).then(() => window.location.reload());
  };
  return (
    (error && <h1>Error</h1>) || (
      <div>
        <Header />
        <div class="main-content">
          <div class="path">
            <span>
              <b> Customer details</b>
            </span>
          </div>
          <div class="table-responsive-md table-container ">
            <div class="table-top">
              <div class="search-container">
                <i class="fas fa-search"></i>
                <input
                  type="search"
                  name=""
                  id=""
                  placeholder="Search products"
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <div class="sort">
                <i
                  class="fas fa-sort-alpha-down"
                  onClick={(e) => {
                    setSortState(!sortState);
                  }}
                ></i>
              </div>
            </div>
            <div class="table-wrap">
              <table class="table table-hover">
                <thead class="bg-theme">
                  <tr>
                    <th scope="col">Company name</th>
                    <th scope="col">District</th>
                    <th scope="col">Address</th>
                    <th scope="col">Contact No</th>
                    <th scope="col">Industry</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCust.map((comp, key) => (
                    <tr key={comp.Co_ID}>
                      {editreview === key ? (
                        <>
                          <td>
                            <input
                              id={comp.Co_ID}
                              type="text"
                              name="coname"
                              onChange={(e) => {
                                handleEdit(e, comp.Co_Name, key);
                              }}
                              onKeyPress={(e) => {
                                if (e.key === "Enter") {
                                  console.log("id", comp.Co_ID);
                                  handleEnter(comp.Co_ID);
                                }
                              }}
                            />
                          </td>
                          <td>
                            <input
                              id={comp.Co_ID}
                              type="text"
                              name="district"
                              onChange={(e) => {
                                handleEdit(e, comp.Co_District, key);
                              }}
                              onKeyPress={(e) => {
                                if (e.key === "Enter") {
                                  console.log("id", comp.Co_ID);
                                  handleEnter(comp.Co_ID);
                                }
                              }}
                            />
                          </td>
                          <td>
                            <input
                              id={comp.Co_ID}
                              type="text"
                              name="address"
                              onChange={(e) => {
                                handleEdit(e, comp.Co_Address, key);
                              }}
                              onKeyPress={(e) => {
                                if (e.key === "Enter") {
                                  console.log("id", comp.Co_ID);
                                  handleEnter(comp.Co_ID);
                                }
                              }}
                            />
                          </td>
                          <td>
                            <input
                              id={comp.Co_ID}
                              type="text"
                              name="landline"
                              onChange={(e) => {
                                handleEdit(e, comp.Co_Landline, key);
                              }}
                              onKeyPress={(e) => {
                                if (e.key === "Enter") {
                                  console.log("id", comp.Co_ID);
                                  handleEnter(comp.Co_ID);
                                }
                              }}
                            />
                          </td>
                          <td>
                            <input
                              id={comp.Co_ID}
                              type="text"
                              name="siname"
                              onChange={(e) => {
                                handleEdit(e, comp.Si_Name, key);
                              }}
                              onKeyPress={(e) => {
                                if (e.key === "Enter") {
                                  console.log("id", comp.Co_ID);
                                  handleEnter(comp.Co_ID);
                                }
                              }}
                            />
                          </td>
                        </>
                      ) : (
                        <>
                          <td
                            scope="row"
                            onClick={() => handleTable(comp.Co_ID, comp.Si_ID)}
                          >
                            <p>
                              {comp.Co_Name}
                              {comp.Co_ID}
                            </p>
                          </td>
                          <td
                            onClick={() => handleTable(comp.Co_ID, comp.Si_ID)}
                          >
                            {comp.Co_District}
                          </td>
                          <td
                            onClick={() => handleTable(comp.Co_ID, comp.Si_ID)}
                          >
                            {comp.Co_Address}
                          </td>
                          <td
                            onClick={() => handleTable(comp.Co_ID, comp.Si_ID)}
                          >
                            {comp.Co_Landline}
                          </td>
                          <td
                            onClick={() => handleTable(comp.Co_ID, comp.Si_ID)}
                          >
                            {comp.Si_Name}
                          </td>

                          <td>
                            <i
                              class="fas fa-edit"
                              onClick={(e) => {
                                setEditreview(key);
                                console.log(comp.Co_ID);
                              }}
                            ></i>
                            <i
                              class="fas fa-trash"
                              onClick={() => {
                                console.log(id);
                                handleDelete(comp.Co_ID);
                                setmodalIsOpen(false);
                              }}
                            ></i>
                          </td>
                        </>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default Customers;
