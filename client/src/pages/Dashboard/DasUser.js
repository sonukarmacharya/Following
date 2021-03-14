import React, { useEffect, useState } from "react";
import Header from "../../layouts/HeadSales";
import Calender from "../../layouts/Calender";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { Scrollbars } from "rc-scrollbars";
import Modal from "react-modal";
Modal.setAppElement("#root");

export default function DasUser() {
  const id = useParams();
  const [review, setreview] = useState([]);
  const [dataform, setdataform] = useState({});
  const [modalIsOpen, setmodalIsOpen] = useState(false);
  const [val, setval] = useState("");
  const [editreview, setEditreview] = useState(null);
  const userid = localStorage.getItem("user");
  const [contact, setContact] = useState();
  const [ind, setInd] = useState();
  const [priority, setPriority] = useState([]);
  const [priorityComp, setPriorityComp] = useState();

  useEffect(async () => {
    const prio = await axios.get(`/auth/Displaypriority`);
    setPriority(prio.data.data);
    const pcomp = await axios.get(`/auth/priority/${id.siid}/${id.cid}`);
    setPriorityComp(pcomp.data.data);
    console.log("prioritycomp", pcomp, "priority", prio);
    const cont = await axios.get(`/auth/Customer/${id.cid}/${id.siid}`);
    setContact(cont.data.data);
    axios(`/auth/industry/${id.siid}`).then((data) => {
      setInd(data.data.data);
      console.log(data);
    });
    axios.get(`/auth/review/${id.cid}/${id.siid}`).then((data) => {
      setreview(data.data.data);
    });
  }, []);

  useEffect(() => {
    console.log(">>", review);
  }, [review]);

  let handleChange = (e, btnData) => {
    setdataform({
      ...dataform,
      [e.target.name]: e.target.value,
      coid: id.cid,
      sid: userid,
    });
  };

  let handlebtnChange = (btnData) => {
    setdataform({ ...dataform, [btnData.name]: btnData.value });
    let prid = { [btnData.name]: btnData.value };
    axios
      .post(`/auth/priority/${id.siid}/${id.cid}`, prid)
      .then(() => alert("Success"))
      .catch((err) => alert(err));
    console.log("DD", prid);
  };

  let handleSubmit = () => {
    console.log(dataform);
    axios.post(`/auth/reviewinsert`, dataform).then(() => {
      alert("success");
      //window.location.reload();
    });
  };

  let handleEdit = (e, name, key) => {
    const { value } = e.target;
    setval({ ...val, [e.target.name]: e.target.value });
    console.log("vv", val);
    review.map((row, j) => (j === key ? { ...row, [name]: value } : row));
  };

  let handleEnter = async (id) => {
    setEditreview(null);
    axios.post(`/auth/reviewupdate/${id}`, val).then(() => {
      alert("edited");
      window.location.reload();
    });
  };
  let handleDelete = (id) => {
    axios
      .delete(`/auth/reviewdelete/${id}`)
      .then(() => window.location.reload());
  };

  return (
    <div>
      <Header />
      <div className="welcome-container">
        <div class="path">
          <span>
            <b> Customer details</b>
          </span>
        </div>
        <div class="row" style={{ paddingTop: "20px" }}>
          <div class="d-flex col-lg-14 col-md-12">
            <div
              class="col-lg-6 col-md-4"
              //style={{ backgroundColor: "#f5f6f8" }}
            >
              <div class="form-title">Details</div>
              <ul class="item-list">
                <li>
                  Industry Name: <span>abc industry</span>
                </li>
                <li>
                  Contact Person Name: <span>John</span>
                </li>
                <li>
                  Phone Number: <span>99826734521</span>
                </li>
                <li>
                  Department: <span>IT</span>
                </li>
              </ul>
              <button type="submit" class="common-btn mt-3">
                <Link to={`/addproducts/2/2`} style={{ color: "white" }}>
                  Add Product +
                </Link>
              </button>
            </div>

            <div class="form-container col-lg-6 col-md-6 ">
              <div class="form-title">Write a review</div>
              <small>Note: Both the field must be selected</small>
              <div class="form-row mt-4">
                <div class="form-group col-md-5">
                  <small>Select Categoty*</small>
                  <select class="form-control">
                    <option>Product 1</option>
                    <option>Product 2</option>
                    <option>Product 3</option>
                    <option>Product 4</option>
                    <option>Product 5</option>
                  </select>
                </div>
                <div class="form-group col-md-5">
                  <small>Select Review*</small>
                  <select class="form-control">
                    <option>Excellent</option>
                    <option>Product 2</option>
                    <option>Product 3</option>
                    <option>Product 4</option>
                    <option>Poor</option>
                  </select>
                </div>
                <button
                  class="common-btn col-md-2"
                  style={{ marginTop: "27px" }}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
          <div class="review-section col-lg-12 col-md-12 ">
            <div class="form-title">Review History</div>
            <div class="review-container row">
              <div class="col-md-12 col-lg-6 review-card">
                <div class="title bg-theme text-center">Sonu Karmachraya</div>
                <ul class="item-list">
                  <li>
                    Industry: <span>via</span>
                  </li>
                  <li>
                    Category: <span>Honda123 Model</span>
                  </li>
                  <li>Good</li>
                  <li>
                    10:00 AM<span> 3rd July, 2021</span>
                  </li>
                  <li>
                    <i class="fas fa-edit"></i>
                    <i class="fas fa-trash"></i>
                  </li>
                </ul>
              </div>
              <div class="col-lg-6 col-md-12 review-card">
                <div class="title bg-theme text-center">Sonu Karmachraya</div>
                <ul class="item-list">
                  <li>
                    Industry: <span>via</span>
                  </li>
                  <li>
                    Category: <span>Honda123 Model</span>
                  </li>
                  <li>Good</li>
                  <li>
                    10:00 AM<span> 3rd July, 2021</span>
                  </li>
                  <li>
                    <i class="fas fa-edit"></i>
                    <i class="fas fa-trash"></i>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <Link to="/customersUser">
        <i className="back icon-left"></i>
      </Link> */}
      {/* <div className="container custom">
        <div className="pad-top container custom"> */}
      {/* {data ? (
            data.map((data) => <h2 className="text-center">{data.Co_Name}</h2>)
          ) : (
            <h2>here</h2>
          )} */}
      {/* <hr className="dashuser-hr" />
        </div>
        <div className="dashuser-priority">
          {priorityComp
            ? priorityComp.map((p) => (
                <>
                  <button
                    className="dashuser-priority-list"
                    name="prid"
                    value={p.Pr_ID}
                    onClick={(e) =>
                      handlebtnChange({ name: "prid", value: p.Pr_ID })
                    }
                    disabled
                  >
                    <span
                      className="cust-prior-circle-hot"
                      style={{ backgroundColor: `${p.Pr_Color}` }}
                    ></span>
                    <p
                      className="dashuser-priority-list-p"
                      name="prid"
                      value={p.Pr_ID}
                    >
                      {p.Pr_Name}
                    </p>
                    <span
                      className="dashuser-priority-list-circle-hot"
                      name="prid"
                      value={p.Pr_ID}
                    ></span>
                  </button>
                  <i
                    className="reviewhistory-icondelete icon-delete"
                    onClick={() => setmodalIsOpen(true)}
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
                        console.log("DD", id.cid, id.siid);
                        axios.delete(`/auth/priority/${id.cid}/${id.siid}`);
                        window.location.reload();
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
                </>
              ))
            : priority.map((p) => (
                <button
                  className="dashuser-priority-list"
                  name="prid"
                  value={p.Pr_ID}
                  onClick={(e) =>
                    handlebtnChange({ name: "prid", value: p.Pr_ID })
                  }
                >
                  <span
                    className="cust-prior-circle-hot"
                    style={{ backgroundColor: `${p.Pr_Color}` }}
                  ></span>
                  <p
                    className="dashuser-priority-list-p"
                    name="prid"
                    value={p.Pr_ID}
                  >
                    {p.Pr_Name}
                  </p>
                  <span
                    className="dashuser-priority-list-circle-hot"
                    name="prid"
                    value={p.Pr_ID}
                  ></span>
                </button>
              ))}
        </div>

        <div className="row">
          <div className="col-md-4 col-12 ">
            <div className="bg-light">
              {contact
                ? contact.map((c) => (
                    <div>
                      <h2 className="font-weight-bold">Industry Name</h2>
                      <p>{c.Si_Name}</p>
                      <h2 className="font-weight-bold">Contact Person Name</h2>
                      <p>{c.CpI_Name}</p>
                      <h2 className="font-weight-bold">Phone Number</h2>
                      <p>{c.CpI_Number}</p>
                      <h2 className="font-weight-bold">Department</h2>
                      <p>{c.Department_Name}</p>
                      <h2 className="font-weight-bold">Contact Person Name</h2>
                      <p>{c.Cp_Name}</p>
                      <h2 className="font-weight-bold">Number</h2>
                      <p>{c.CpI_Number}</p>
                      <hr />
                    </div>
                  ))
                : null}
            </div>
            <div className="bg-light mt-5"></div>
            <div className="text-center">
              <p className="mt-4">Need to add produst or see history</p>
              <h1>
                <Link to={`/addproducts/${id.cid}/${id.siid}`}>
                  <i className="icon-add" />
                </Link>
              </h1>
            </div>
          </div>
          <div className="col-md-8 col-12">
            <div className="">
              <div className="d-flex">
                <h2 className="col-md-8 col-12">Write review</h2>
                <label className="label">Industry</label>
                <select
                  className="form-control"
                  name="siid"
                  onChange={handleChange}
                >
                  <option value="" name="siid"></option>
                  {ind
                    ? ind.map((i) => (
                        <option value={i.Si_ID} name="siid">
                          {i.Si_Name}
                        </option>
                      ))
                    : null}
                </select>
                <label className="dashuser-bottom-right-top-label">
                  Inquiry
                </label>
                <select
                  className="form-control"
                  name="inquiry"
                  onChange={handleChange}
                >
                  <option name="inquiry" value=""></option>
                  <option name="inquiry" value="call">
                    call
                  </option>
                  <option name="inquiry" value="walk">
                    walk
                  </option>
                  <option name="inquiry" value="pending">
                    pending
                  </option>
                </select>
              </div>
              <div className="col-md-12 col-12 mt-4">
                <textarea
                  className="form-control p-4"
                  onChange={handleChange}
                  name="review"
                />
                <button
                  className="float-right btn btn-primary mt-3 mb-3"
                  onClick={handleSubmit}
                >
                  submit
                </button>
              </div>
            </div>
            <div className="d-flex pad-top">
              <div className="col-md-6 col-12 mt-5 mr-5">
                <label className="dashuser-bottom-right-down-review-label">
                  Review
                </label>
                <Scrollbars style={{ width: 700, height: 400 }}>
                  {review
                    ? review.map((r, key) => (
                        <div className="bg-light p-4">
                          <p className="dashuser-bottom-right-down-review-p">
                            {r.Date}
                          </p>
                          <p>inquiry via:{r.Inquiry_via}</p>
                          <p>Industry:{r.Si_Name}</p>
                          <div className="d-flex">
                            {editreview === key ? (
                              <input
                                id={r.R_ID}
                                type="text"
                                name="body"
                                className="reviewhistory-h1"
                                onChange={(e) => {
                                  handleEdit(e, r.R_Review, key);
                                }}
                                onKeyPress={(e) => {
                                  if (e.key === "Enter") {
                                    console.log("id", r.R_ID);
                                    handleEnter(r.R_ID);
                                  }
                                }}
                              />
                            ) : (
                              <p>{r.R_Review}</p>
                            )}
                            <i
                              id={r.R_ID}
                              className="pl-4 pr-4 reviewhistory-iconedit icon-edit"
                              onClick={(e) => {
                                setEditreview(key);
                              }}
                            ></i>
                            <i
                              className="reviewhistory-icondelete icon-delete"
                              onClick={() => setmodalIsOpen(true)}
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
                                  handleDelete(r.R_ID);
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
                          </div>
                        </div>
                      ))
                    : null}
                </Scrollbars>
              </div>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
}
