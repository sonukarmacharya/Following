import React, { useState, useEffect } from "react";
import Header from "../../layouts/Header";
import Welcome from "../../layouts/Welcome";
import { Link, useParams } from "react-router-dom";
import image from "../../assets/images/pop.jpg";
import "../../assets/sass/app.css";
import axios from "axios";
import Modal from "react-modal";
import { Scrollbars } from "rc-scrollbars";
Modal.setAppElement("#root");

const Acustomer_Detail = () => {
  const ids = useParams();
  const userid = localStorage.getItem("user");
  const [val, setval] = useState("");
  const [modalIsOpen, setmodalIsOpen] = useState(false);
  const [detail, setDetail] = useState([]);
  // const [custDept, setCustDept] = useState([]);
  const [history, setHistory] = useState([]);
  const [review, setreview] = useState([]);
  const [editreview, setEditreview] = useState(null);
  const [sendForm, setSendForm] = useState([]);
  const [Color, setColor] = useState([]);
  const [inquiry, setinquiry] = useState();
  const [visible, setvisible] = useState(false);
  const [ind, setInd] = useState();
  const [contact, setContact] = useState();
  const [project, setproject] = useState();
  const id = ids.cid;
  const [c, setc] = useState();
  const siid = ids.siid;
  const coid = ids.cid;

  useEffect(async () => {
    const company = await axios.get(`/auth/companyId/${id}`);
   // const custde = await axios.get(`/auth/DisplaymasterCustDept/${id}`);
    const cont = await axios.get(`/auth/Customer/${id}/${ids.siid}`);
    const prj = await axios.get(`/auth/Displaycountproject/${id}/${ids.siid}`);
    const ph = await axios(`/auth/getmasterproduct/${coid}/${siid}`);
    const col = await axios(`/auth/priorityColor/${coid}/${siid}`);
    console.log(ph);
    setColor(col.data.data);
    setHistory(ph.data.data);
    setContact(cont.data.data);
    setproject(prj.data.data);
    axios(`/auth/industry/${ids.siid}`).then((data) => {
      setInd(data.data.data);
    });
    axios(`/auth/review/${id}/${ids.siid}`).then((data) => {
      console.log("R>>>", data);
      setreview(data.data.data);
    });
    setDetail(company.data.data);
    // if (custde.data.data == 0) {
    //   console.log("zero");
    //   setCustDept(custde.data.data);
    // } else {
    //   console.log("mm", custde);
    //   setCustDept(custde.data.data);
    // }
  }, []);

  useEffect(() => {
    Color.map((Color) => setc(Color.Pr_Color));
  }, [Color]);

  let handelChange = (e) => {
    setSendForm({
      ...sendForm,
      [e.target.name]: e.target.value,
      aid: userid,
      coid: ids.cid,
      siid: ids.siid,
    });
  };

  let handleSubmitform = (e) => {
    e.preventDefault();
    console.log(sendForm);
    axios.post(`/auth/InsertCustomer`, sendForm).then((data) => {
      alert("inserted successfully");
      window.location.reload();
    });
  };

  let handleEdit = (e, name, key) => {
    const { value } = e.target;
    setval({ ...val, [e.target.name]: e.target.value });
    console.log("vv", val);
    review.map((row, j) => (j === key ? { ...row, [name]: value } : row));
  };

  let handleEnter = async (id) => {
    console.log(id);
    setEditreview(null);
    axios.post(`/auth/reviewupdate/${id}`, val);
    alert("edited");
  };

  return (
    <div className="mainContainer">
      <Header />
      <div className="body">
        <Link to="/customers">
          <i className="back icon-left"></i>
        </Link>
        {visible == true ? <img src={image} className="pop-image" /> : null}
        <Welcome title="Customer" />
        <div className="container custom">
          <div className="row">
            <div className="mr-5 col-3">
              <div className="bg text-light p-3 mb-4">
                {detail ? (
                  detail.map((de) => (
                    <div className="">
                      <div className="d-flex">
                        {c == "Yellow" ? (
                          <h1
                            style={{
                              backgroundColor: `${c}`,
                              color: "black",
                            }}
                          >
                            {de.Co_Name}
                          </h1>
                        ) : (
                          <h1
                            style={{
                              backgroundColor: `${c}`,
                            }}
                          >
                            {de.Co_Name}
                          </h1>
                        )}
                        <i
                          className="pl-4 icon-help"
                          onClick={() => setvisible(!visible)}
                        ></i>
                      </div>
                      <hr />
                      <h1 className="custD-left-top-h1">Address</h1>
                      <p>{de.Co_Address}</p>
                      <h1 className="custD-left-top-h1"> District</h1>
                      <p>{de.Co_District}</p>
                      <h1 className="custD-left-top-h1">Phone Number</h1>
                      <p>{de.Co_Landline}</p>
                      <h1 className="custD-left-top-h1">Number of Project</h1>
                      {project ? (
                        project.map((p) => <p>{p.total}</p>)
                      ) : (
                        <p>No projects</p>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="custD-left-detail-list">
                    <div className="custD-left-detail-list-name">
                      <h1 className="custD-left-Name"></h1>
                      <i className="i icon-help"></i>
                    </div>
                    <hr className="custD-left-top-hr" />
                    <h1 className="font-weight-bold">Address</h1>
                    <p></p>
                    <h1 className="font-weight-bold">Phone Number</h1>
                    <p></p>
                    <h1 className="font-weight-bold"> Email Id</h1>
                    <p></p>
                    <h1 className="font-weight-bold">Branch Deal</h1>
                    <p></p>
                    <h1 className="font-weight-bold">Zone</h1>
                    <p></p>
                  </div>
                )}
              </div>

              <form>
                <label className="label">Industry</label>
                <select
                  className="form-control"
                  name="siid"
                  onChange={handelChange}
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
                <br />
                <div className="bg-light text-dark p-3 mb-4 pad-top">
                  <label className="label">Contact Person Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="iname"
                    onChange={handelChange}
                  />
                  <label className="label">Email</label>
                  <input
                    type="text"
                    className="form-control"
                    name="iemail"
                    onChange={handelChange}
                  />
                  <label className="label">Number</label>
                  <input
                    type="text"
                    className="form-control"
                    name="inumber"
                    onChange={handelChange}
                  />
                </div>
                <div className="bg-light text-dark p-3 mb-4 pad-top">
                  <label className="label">Department</label>
                  <input
                    type="text"
                    className="form-control"
                    name="depname"
                    onChange={handelChange}
                  />
                  <label className="label">Contact Person Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    onChange={handelChange}
                  />
                  <label className="label">Number</label>
                  <input
                    type="text"
                    className="form-control"
                    name="number"
                    onChange={handelChange}
                  />
                </div>
              </form>
              <input
                type="submit"
                value="SUBMIT"
                className="btn btn-primary btn-block mt-4"
                onClick={handleSubmitform}
              />
            </div>
            <div className="col-md-4 col-8 bg-light p-4 mr-4">
              <Scrollbars style={{ width: 500, height: 1248 }}>
                <h5 className="custD-mid-top-h1">Purchase history</h5>
                <div className="">
                  <table className="table table-hover"  style={{width:300}}>
                    <thead className="thead-dark">
                      <tr>
                        <th scope="col">Product Name</th>
                        <th scope="col">Model</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Price</th>
                      </tr>
                    </thead>
                    {history ? (
                      history.map((history) => (
                        <tr>
                          <td>{history.P_Name}</td>
                          <td>{history.P_Model}</td>
                          <td>{history.Quantity}</td>
                          <td>{history.Price}</td>
                        </tr>
                      ))
                    ) : (
                      <tr className="table-body">
                        <td></td>
                        <td></td>
                      </tr>
                    )}
                  </table>
                </div>
              </Scrollbars>
            </div>
            <div className="col-md-4 col-6">
              <div className="bg-light">
                <div className=" p-3">
                  <h1 className="custD-review-p">Review history</h1>
                  <Scrollbars style={{ width: 340, height: 300 }}>
                    {review
                      ? review.map((rv, key) => (
                          <div className="">
                            <p className="date">{rv.Date}</p>
                            <p>inquiry via:{rv.Inquiry_via}</p>
                            <p>Industry:{rv.Si_Name}</p>

                            <p className="d-flex">
                              {editreview === key ? (
                                <input
                                  id={rv.R_ID}
                                  type="text"
                                  name="body"
                                  className="reviewhistory-text"
                                  onChange={(e) => {
                                    handleEdit(e, rv.R_Review, key);
                                  }}
                                  onKeyPress={(e) => {
                                    if (e.key === "Enter") {
                                      console.log("id", rv.R_ID);
                                      handleEnter(rv.R_ID);
                                    }
                                  }}
                                />
                              ) : (
                                <p className="reviewhistory-text">
                                  {rv.R_Review}
                                </p>
                              )}
                              <i
                                id={rv.R_ID}
                                className="reviewhistory-iconedit pl-5 pr-4 icon-edit"
                                onClick={(e) => {
                                  setEditreview(key);
                                }}
                              ></i>
                              <i
                                className="reviewhistory-icondelete icon-delete"
                                onClick={() => setmodalIsOpen(true)}
                              ></i>
                              <Modal
                                isOpen={modalIsOpen}
                                style={{
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
                                  onClick={() => {
                                    axios.delete(
                                      `/auth/reviewdelete/${rv.R_ID}`
                                    );
                                    setmodalIsOpen(false);
                                  }}
                                >
                                  ok
                                </button>
                                <button onClick={() => setmodalIsOpen(false)}>
                                  cancel
                                </button>
                              </Modal>
                            </p>
                          </div>
                        ))
                      : null}
                  </Scrollbars>
                </div>
              </div>
              <div className="bg-light p-3 mb-4 mt-5">
                {contact
                  ? contact.map((c) => (
                      <div>
                        <h2 className="font-weight-bold">
                          Industry Name
                          <i
                            className="reviewhistory-icondelete ml-5 icon-delete"
                            onClick={() => setmodalIsOpen(true)}
                          ></i>
                          <Modal
                            isOpen={modalIsOpen}
                            style={{
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
                              onClick={() => {
                                axios.delete(`/auth/contact/${coid}/${siid}`);
                                setmodalIsOpen(false);
                              }}
                            >
                              ok d
                            </button>
                            <button onClick={() => setmodalIsOpen(false)}>
                              cancel
                            </button>
                          </Modal>
                        </h2>
                        <p>{c.Si_Name}</p>
                        <h2 className="font-weight-bold">
                          Contact Person Name
                        </h2>
                        <p>{c.CpI_Name}</p>
                        <h2 className="font-weight-bold">Phone Number</h2>
                        <p>{c.CpI_Number}</p>
                        <h2 className="font-weight-bold">Department</h2>
                        <p>{c.Department_Name}</p>
                        <h2 className="font-weight-bold">
                          Contact Person Name
                        </h2>
                        <p>{c.Cp_Name}</p>
                        <h2 className="font-weight-bold">Number</h2>
                        <p>{c.CpI_Number}</p>
                        <hr />
                      </div>
                    ))
                  : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Acustomer_Detail;
