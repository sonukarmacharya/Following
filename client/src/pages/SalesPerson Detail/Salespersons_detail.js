import React, { useState, useEffect } from "react";
import Header from "../../layouts/Header";
import Welcome from "../../layouts/Welcome";
import "../../assets/sass/app.css";
import srt from "../sort";
import srch from "../search";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { Scrollbars } from "rc-scrollbars";
import Modal from "react-modal";
Modal.setAppElement("#root");

const SalesPerson = () => {
  const [salesperson, setSalesperson] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredSales, setFilteredSales] = useState([]);
  const [sortState, setSortState] = useState(false);
  const history = useHistory();
  const [val, setval] = useState("");
  const [editreview, setEditreview] = useState(null);
  const [modalIsOpen, setmodalIsOpen] = useState(false);
  const [id, setid] = useState();

  useEffect(async () => {
    const sales = await axios.get(`/auth/Displaysalesperson`);
    console.log(sales.data.data);
    setSalesperson(sales.data.data);
  }, []);

  useEffect(() => {
    let se = srch.searchSalesPerson(salesperson, search);
    setFilteredSales(se);
  }, [search, salesperson]);

  useEffect(() => {
    if (!sortState) {
      let de = srt.descSales(salesperson);
      setFilteredSales(de);
    } else {
      let as = srt.ascSales(salesperson);
      setFilteredSales(as);
    }
  }, [sortState]);

  let handleTable = (id) => {
    history.push(`/asalesperson/${id}`);
  };

  let handleEdit = (e, name, key) => {
    const { value } = e.target;
    setval({ ...val, [e.target.name]: e.target.value });
    console.log("vv", val);
  };

  let handleEnter = async (id) => {
    setEditreview(null);
    console.log("edit", val);
    axios.post(`/auth/updatesalesperson/${id}`, val).then(() => {
      alert("edited");
      window.location.reload();
    });
  };
  let handleDelete = (id) => {
    console.log("del", id);
    axios
      .delete(`/auth/Deletesalesperson/${id}`)
      .then(() => window.location.reload());
  };
  return (
    <div>
      <Header />
      <div>
        <Welcome />
        <div className="container custom">
          <div className="column">
            <div className="d-flex row">
              <div className="top-search col-md-8 pt-4">
                <p className="search-head">SalesPersons Name</p>
                <div className="search-box">
                  <input
                    type="text"
                    className="search-inputtext"
                    name="typehead"
                    onChange={(e) => setSearch(e.target.value)}
                  />
                  <i className="search-icon  icon-search"></i>
                </div>
              </div>
              <div
                className="sort "
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
            <div className="pad-top">
              <Scrollbars style={{ height: 300 }}>
                <table class="table table-hover">
                  <thead class="thead-dark">
                    <tr>
                      <th scope="col">SalesPerson Name</th>
                      <th scope="col">Address</th>
                      <th scope="col">Email</th>
                      <th scope="col">Edit or Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {salesperson
                      ? filteredSales.map((s, key) => (
                          <tr key={s.S_ID}>
                            {editreview === key ? (
                              <>
                                <th scope="row">
                                  <input
                                    id={s.S_ID}
                                    type="text"
                                    name="username"
                                    className="reviewhistory-h1"
                                    onChange={(e) => {
                                      handleEdit(e, s.S_Username, key);
                                    }}
                                    onKeyPress={(e) => {
                                      if (e.key === "Enter") {
                                        console.log("id", s.S_ID);
                                        handleEnter(s.S_ID);
                                      }
                                    }}
                                  />
                                </th>
                                <td>
                                  <input
                                    id={s.S_ID}
                                    type="text"
                                    name="address"
                                    className="reviewhistory-h1"
                                    onChange={(e) => {
                                      handleEdit(e, s.S_Address, key);
                                    }}
                                    onKeyPress={(e) => {
                                      if (e.key === "Enter") {
                                        console.log("id", s.S_ID);
                                        handleEnter(s.S_ID);
                                      }
                                    }}
                                  />{" "}
                                </td>
                                <td>
                                  <input
                                    id={s.S_ID}
                                    type="text"
                                    name="email"
                                    className="reviewhistory-h1"
                                    onChange={(e) => {
                                      handleEdit(e, s.S_Email, key);
                                    }}
                                    onKeyPress={(e) => {
                                      if (e.key === "Enter") {
                                        console.log("id", s.S_ID);
                                        handleEnter(s.S_ID);
                                      }
                                    }}
                                  />{" "}
                                </td>
                              </>
                            ) : (
                              <>
                                <th
                                  scope="row"
                                  onClick={() => handleTable(s.S_ID)}
                                >
                                  {s.S_Username}
                                </th>
                                <td onClick={() => handleTable(s.S_ID)}>
                                  {s.S_Address}
                                </td>
                                <td onClick={() => handleTable(s.S_ID)}>
                                  {s.S_Email}
                                </td>

                                <td>
                                  <i
                                    id={s.S_ID}
                                    className="pl-4 pr-4 reviewhistory-iconedit icon-edit"
                                    onClick={(e) => {
                                      setEditreview(key);
                                    }}
                                  ></i>
                                  <i
                                    className="reviewhistory-icondelete icon-delete"
                                    onClick={() => {
                                      setid(s.S_ID);
                                      setmodalIsOpen(true);
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
                                  >
                                    Are you sure you want to delete??
                                    <br />
                                    <button
                                      className="btn btn-primary"
                                      onClick={() => {
                                        console.log(s.S_ID);
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
                        ))
                      : null}
                  </tbody>
                </table>
              </Scrollbars>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesPerson;
