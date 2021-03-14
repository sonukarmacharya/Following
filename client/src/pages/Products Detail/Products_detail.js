import React, { useState, useEffect } from "react";
import Header from "../../layouts/Header";
import Welcome from "../../layouts/Welcome";
import "../../assets/sass/app.css";
import srch from "../search";
import srt from "../sort";
import axios from "axios";
import { Scrollbars } from "rc-scrollbars";
import Modal from "react-modal";
Modal.setAppElement("#root");

const Products = () => {
  const [low, setLow] = useState([]);
  const [product, setProduct] = useState([]);
  const [error, setError] = useState(false);
  const [search, setSearch] = useState("");
  const [filteredPro, setFilteredPro] = useState([]);
  const [sortState, setSortState] = useState(false);
  const [modalIsOpen, setmodalIsOpen] = useState(false);
  const [editreview, setEditreview] = useState(null);
  const [val, setval] = useState("");
  const [id, setid] = useState();

  useEffect(async () => {
    const lowp = await axios(`/auth/Lowproduct`);
    const prod = await axios(`auth/Displayproduct`);
    console.log(prod.data.data);
    setLow(lowp.data.data);
    setProduct(prod.data.data);
  }, []);

  useEffect(() => {
    let se = srch.searchProduct(product, search);
    setFilteredPro(se);
  }, [search, product]);

  useEffect(() => {
    if (!sortState) {
      let de = srt.descCust(product);
      setFilteredPro(de);
      console.log(filteredPro);
    } else {
      let as = srt.ascProduct(product);
      setFilteredPro(as);
      console.log(filteredPro);
    }
  }, [sortState]);

  let handleEdit = (e, name, key) => {
    const { value } = e.target;
    setval({ ...val, [e.target.name]: e.target.value });
    console.log("vv", val);
  };

  let handleEnter = async (id) => {
    setEditreview(null);
    console.log("edit", val, id);
    axios.post(`/auth/Updateproduct/${id}`, val).then(() => {
      alert("edited");
      window.location.reload();
    });
  };
  let handleDelete = (id) => {
    console.log("del", id);
    axios
      .delete(`/auth/Deleteproduct/${id}`)
      .then(() => window.location.reload());
  };
  return (
    (error && <h1>Error</h1>) || (
      <div>
        <Header />
        <div class="main-content">
          <div class="path">
            <span>
              <b>Product Page</b>
            </span>
          </div>
          <div class="row white-bg gutter-top-md">
            <div class="col-md-8 col-lg-4 pad-0">
              <div class="table-responsive-md  table-container">
                <div
                  class="message-dange p-2"
                  // style="background: rgba(234, 18, 44, 0.13);"
                >
                  <b class="danger-color">Product Quality Low</b>
                </div>
                <div class="table-wrap">
                  <table class="table table-hover">
                    <thead class="bg-theme">
                      <tr>
                        <th scope="col">Product name</th>
                        <th scope="col">Model</th>
                        <th scope="col">Quantity</th>
                      </tr>
                    </thead>
                    <tbody>
                      {low ? (
                        low.map((low) => (
                          <tr className="" key={low.P_ID}>
                            <td scope="row">{low.P_Name}</td>
                            <td>{low.P_Model}</td>
                            <td>{low.P_Quantity}</td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td></td>
                          <td></td>
                          <td></td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div class="col-md-8">
              <div class="table-responsive-md  table-container">
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
                  <div
                    class="sort"
                    onClick={(e) => {
                      setSortState(!sortState);
                    }}
                  >
                    <i class="fas fa-sort-alpha-down"></i>
                  </div>
                </div>
                <div class="table-wrap">
                  <table class="table table-hover">
                    <thead class="bg-theme">
                      <tr>
                        <th scope="col">Product Name</th>
                        <th scope="col">Model</th>
                        <th scope="col">Quality</th>
                        <th scope="col">Price</th>
                        <th scope="col">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {product
                        ? filteredPro.map((table, key) => (
                            <tr key={table.P_ID}>
                              {editreview === key ? (
                                <>
                                  <td scope="row">
                                    <input
                                      id={table.P_ID}
                                      type="text"
                                      name="name"
                                      className="reviewhistory-h1"
                                      onChange={(e) => {
                                        handleEdit(e, table.P_Name, key);
                                      }}
                                      onKeyPress={(e) => {
                                        if (e.key === "Enter") {
                                          console.log("id", table.P_ID);
                                          handleEnter(table.P_ID);
                                        }
                                      }}
                                    />
                                  </td>
                                  <td>
                                    <input
                                      id={table.P_ID}
                                      type="text"
                                      name="model"
                                      className="reviewhistory-h1"
                                      onChange={(e) => {
                                        handleEdit(e, table.P_Model, key);
                                      }}
                                      onKeyPress={(e) => {
                                        if (e.key === "Enter") {
                                          console.log("id", table.P_ID);
                                          handleEnter(table.P_ID);
                                        }
                                      }}
                                    />
                                  </td>
                                  <td>
                                    <input
                                      id={table.P_ID}
                                      type="text"
                                      name="quantity"
                                      className="reviewhistory-h1"
                                      onChange={(e) => {
                                        handleEdit(e, table.P_Quantity, key);
                                      }}
                                      onKeyPress={(e) => {
                                        if (e.key === "Enter") {
                                          console.log("id", table.P_ID);
                                          handleEnter(table.P_ID);
                                        }
                                      }}
                                    />
                                  </td>
                                  <td>
                                    <input
                                      id={table.P_ID}
                                      type="text"
                                      name="price"
                                      className="reviewhistory-h1"
                                      onChange={(e) => {
                                        handleEdit(e, table.P_Price, key);
                                      }}
                                      onKeyPress={(e) => {
                                        if (e.key === "Enter") {
                                          console.log("id", table.P_ID);
                                          handleEnter(table.P_ID);
                                        }
                                      }}
                                    />
                                  </td>
                                </>
                              ) : (
                                <>
                                  <td>{table.P_Name}</td>
                                  <td>{table.P_Model}</td>
                                  <td>{table.P_Quantity}</td>
                                  <td>{table.P_Price}</td>

                                  <td>
                                    <i
                                      class="fas fa-edit"
                                      onClick={(e) => {
                                        setEditreview(key);
                                      }}
                                    ></i>
                                    <i
                                      class="fas fa-trash"
                                      onClick={() => {
                                        handleDelete(table.P_ID);
                                      }}
                                    ></i>
                                  </td>
                                </>
                              )}
                            </tr>
                          ))
                        : null}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="container custom">
            <div className="row">
              <div className="bg-light p-3">
                <h2 className="text-danger"> Low Quantity Products</h2>
                <hr />
                <div>
                  <Scrollbars style={{ width: 340, height: 300 }}>
                    <table class="table table-hover">
                      <thead class="thead-dark">
                        <tr>
                          <th scope="col">Name</th>
                          <th scope="col">Model</th>
                          <th scope="col">Quantity</th>
                        </tr>
                      </thead>
                      <tbody>
                        {low
                          ? low.map((low) => (
                              <tr className="" key={low.P_ID}>
                                <th scope="row">{low.P_Name}</th>
                                <th>{low.P_Model}</th>
                                <th>{low.P_Quantity}</th>
                              </tr>
                            ))
                          : null}
                      </tbody>
                    </table>
                  </Scrollbars>
                </div>
              </div>
              <div className="col-md-8 col-12 pad-top pl-5">
                <div className="d-flex">
                  <div className="top-search pr-5 pt-4">
                    <p className="search-head">Product Name</p>
                    <div>
                      <div className="search-box ">
                        <input
                          type="text"
                          className="search-inputtext"
                          onChange={(e) => setSearch(e.target.value)}
                        />
                        <i className="search-icon  icon-search"></i>
                      </div>
                    </div>
                  </div>
                  <div
                    className="sort"
                    onClick={(e) => {
                      setSortState(!sortState);
                    }}
                  >
                    <div className="sort-one pl-5 ml-5">
                      <p className="sort-label">Price</p>
                      <i className="sort-icon  icon-1-9"></i>
                    </div>
                  </div>
                </div>
                <div className="pad-top">
                  <Scrollbars style={{ height: 300 }}>
                    <table class="table table-hover">
                      <thead class="thead-dark">
                        <tr>
                          <th scope="col">Product Name</th>
                          <th scope="col">Model</th>
                          <th scope="col">Quantity</th>
                          <th scope="col">Price</th>
                          <th scope="col">Edit or Delete</th>
                        </tr>
                      </thead>
                      <tbody>
                        {product
                          ? filteredPro.map((table, key) => (
                              <tr key={table.P_ID}>
                                {editreview === key ? (
                                  <>
                                    <th scope="row">
                                      <input
                                        id={table.P_ID}
                                        type="text"
                                        name="name"
                                        className="reviewhistory-h1"
                                        onChange={(e) => {
                                          handleEdit(e, table.P_Name, key);
                                        }}
                                        onKeyPress={(e) => {
                                          if (e.key === "Enter") {
                                            console.log("id", table.P_ID);
                                            handleEnter(table.P_ID);
                                          }
                                        }}
                                      />
                                    </th>
                                    <td>
                                      <input
                                        id={table.P_ID}
                                        type="text"
                                        name="model"
                                        className="reviewhistory-h1"
                                        onChange={(e) => {
                                          handleEdit(e, table.P_Model, key);
                                        }}
                                        onKeyPress={(e) => {
                                          if (e.key === "Enter") {
                                            console.log("id", table.P_ID);
                                            handleEnter(table.P_ID);
                                          }
                                        }}
                                      />
                                    </td>
                                    <td>
                                      <input
                                        id={table.P_ID}
                                        type="text"
                                        name="quantity"
                                        className="reviewhistory-h1"
                                        onChange={(e) => {
                                          handleEdit(e, table.P_Quantity, key);
                                        }}
                                        onKeyPress={(e) => {
                                          if (e.key === "Enter") {
                                            console.log("id", table.P_ID);
                                            handleEnter(table.P_ID);
                                          }
                                        }}
                                      />
                                    </td>
                                    <td>
                                      <input
                                        id={table.P_ID}
                                        type="text"
                                        name="price"
                                        className="reviewhistory-h1"
                                        onChange={(e) => {
                                          handleEdit(e, table.P_Price, key);
                                        }}
                                        onKeyPress={(e) => {
                                          if (e.key === "Enter") {
                                            console.log("id", table.P_ID);
                                            handleEnter(table.P_ID);
                                          }
                                        }}
                                      />
                                    </td>
                                  </>
                                ) : (
                                  <>
                                    <th scope="row">
                                      <p>
                                        {table.P_Name}
                                        {table.P_ID}
                                      </p>
                                    </th>
                                    <td>{table.P_Model}</td>
                                    <td>{table.P_Quantity}</td>
                                    <td>{table.P_Price}</td>

                                    <td>
                                      <i
                                        id={table.P_ID}
                                        className="pl-4 pr-4 reviewhistory-iconedit icon-edit"
                                        onClick={(e) => {
                                          setEditreview(key);
                                        }}
                                      ></i>
                                      <i
                                        className="reviewhistory-icondelete icon-delete"
                                        onClick={() => {
                                          setid(table.P_ID);
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
                                            console.log(
                                              "deletebtn",
                                              table.P_ID
                                            );
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
          </div> */}
      </div>
    )
  );
};

export default Products;
