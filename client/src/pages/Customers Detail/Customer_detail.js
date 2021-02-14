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
        <div>
          <Welcome />
          <div className="container custom">
            <div className="column">
              <div className="row ml-2">
                <div className="bg-light  d-flex justify-content-between mr-3">
                  {priority.map((pr) => (
                    <div className="cust-prior p-4 ml-3">
                      <p className="cust-prior-label">{pr.Pr_Name}</p>
                      <span
                        className="cust-prior-circle-hot"
                        style={{ backgroundColor: `${pr.Pr_Color}` }}
                      ></span>
                      <h1 className="cust-prior-num">{pr.Pr_Days}</h1>
                    </div>
                  ))}
                  <hr className="cust-prior-hr" />
                </div>
                <div className="d-flex ml-4 pad-top">
                  <div className="top-search pr-5 pt-4 ">
                    <p className="search-head">
                      Search by Name of Contact Person Industry
                    </p>
                    <div className="search-box">
                      <input
                        type="text"
                        className="search-inputtext"
                        onChange={(e) => setSearch(e.target.value)}
                      />
                      <i className="search-icon  icon-search"></i>
                    </div>
                  </div>
                  <div
                    className="sort"
                    onClick={(e) => {
                      setSortState(!sortState);
                    }}
                  >
                    <div className="sort-one pl-5 ml-5">
                      <p className="sort-label">Name </p>
                      <i className="sort-icon  icon-a-z"></i>
                    </div>
                  </div>
                </div>
              </div>
              <div className="d-flex pad-top">
                <Scrollbars style={{ height: 500 }}>
                  <table class="table table-hover">
                    <thead class="thead-dark">
                      <tr>
                        <th scope="col">Company Name</th>
                        <th scope="col">District</th>
                        <th scope="col">Address</th>
                        <th scope="col">Landline</th>
                        <th scope="col">Industry</th>
                        <th scope="col">Edit or Delete</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredCust.map((comp, key) => (
                        <tr key={comp.Co_ID}>
                          {editreview === key ? (
                            <>
                              <th scope="row">
                                <input
                                  id={comp.Co_ID}
                                  type="text"
                                  name="coname"
                                  className="reviewhistory-h1"
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
                              </th>
                              <td>
                                <input
                                  id={comp.Co_ID}
                                  type="text"
                                  name="district"
                                  className="reviewhistory-h1"
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
                                  className="reviewhistory-h1"
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
                                  className="reviewhistory-h1"
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
                                  className="reviewhistory-h1"
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
                              <th
                                scope="row"
                                onClick={() =>
                                  handleTable(comp.Co_ID, comp.Si_ID)
                                }
                              >
                                <p>
                                  {comp.Co_Name}
                                  {comp.Co_ID}
                                </p>
                              </th>
                              <td
                                onClick={() =>
                                  handleTable(comp.Co_ID, comp.Si_ID)
                                }
                              >
                                {comp.Co_District}
                              </td>
                              <td
                                onClick={() =>
                                  handleTable(comp.Co_ID, comp.Si_ID)
                                }
                              >
                                {comp.Co_Address}
                              </td>
                              <td
                                onClick={() =>
                                  handleTable(comp.Co_ID, comp.Si_ID)
                                }
                              >
                                {comp.Co_Landline}
                              </td>
                              <td
                                onClick={() =>
                                  handleTable(comp.Co_ID, comp.Si_ID)
                                }
                              >
                                {comp.Si_Name}
                              </td>

                              <td>
                                <i
                                  id={comp.Co_ID}
                                  className="pl-4 pr-4 reviewhistory-iconedit icon-edit"
                                  onClick={(e) => {
                                    setEditreview(key);
                                    console.log(comp.Co_ID);
                                  }}
                                ></i>
                                <i
                                  id={comp.Co_ID}
                                  className="reviewhistory-icondelete icon-delete"
                                  onClick={() => {
                                    setmodalIsOpen(true);
                                    setid(comp.Co_ID);
                                  }}
                                ></i>
                                <Modal
                                  className=""
                                  isOpen={modalIsOpen}
                                  style={{
                                    overlay: {},
                                    content: {
                                      top: "100px",
                                      left: "400px",
                                      width: "300px",
                                      height: "200px",
                                    },
                                  }}
                                  id={comp.Co_ID}
                                >
                                  Are you sure you want to delete??
                                  <br />
                                  <button
                                    id={comp.Co_ID}
                                    className="btn btn-primary"
                                    onClick={() => {
                                      console.log(id);
                                      handleDelete(id);
                                      setmodalIsOpen(false);
                                    }}
                                  >
                                    ok
                                  </button>
                                  <button
                                    className="btn btn-primary"
                                    onClick={() => setmodalIsOpen(false)}
                                  >
                                    cancel
                                  </button>
                                </Modal>
                              </td>
                            </>
                          )}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </Scrollbars>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default Customers;
