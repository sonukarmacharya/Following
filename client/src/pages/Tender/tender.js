import React, { useState, useEffect } from "react";
import Header from "../../layouts/Header";
import Welcome from "../../layouts/Welcome";
import { Link, useParams } from "react-router-dom";
import "../../assets/sass/app.css";
import axios from "axios";
import { Scrollbars } from "rc-scrollbars";
import Modal from "react-modal";
Modal.setAppElement("#root");

const Tender = () => {
  const [ind, setInd] = useState();
  const [company, setCompany] = useState();
  const [dept, setDept] = useState(null);
  const [prj, setPrj] = useState(null);
  const [coi, setCoi] = useState();
  const [si, setSi] = useState();
  const [tender, setTender] = useState();
  const [tableone, setTableOne] = useState();
  const [modalIsOpen, setmodalIsOpen] = useState(false);
  const [deptfalg, setdeptfalg] = useState(false);
  const [prjfalg, setprjfalg] = useState(false);
  const [id, setid] = useState();

  useEffect(async () => {
    await axios.get(`/auth/company`).then((data) => {
      let datas = data.data.data;
      setCompany(datas);
      console.log("comp", datas);
    });
    await axios.get(`/auth/tender`).then((data) => {
      console.log("ttt", data.data.data);
      setTableOne(data.data.data);
    });
  }, []);

  let handelChange = (e) => {
    if ([e.target.name] == "coid") {
      const id = [e.target.value];
      setCoi(id);
      axios(`/auth/companyIndustryId/${id}`).then((data) =>
        setInd(data.data.data)
      );
    } else if ([e.target.name] == "sid") {
      const id = [e.target.value];
      console.log("Sid", id);
      setSi(id);
      axios(`/auth/department/${id}/${coi}`).then((data) =>
        setDept(data.data.data)
      );
      axios(`/auth/Dispayproject/${id}/${coi}`).then((data) => {
        console.log(">>", data);
        setPrj(data.data.data);
      });
    } else if ([e.target.name] == "depname") {
      setdeptfalg(true);
    } else if ([e.target.name] == "project") {
      setprjfalg(true);
      console.log("prjname", [e.target.value]);
      let prjname = [e.target.value];
      setTender({ ...tender, prjname });
    }
    setdata();
  };
  let setdata = () => {};

  useEffect(() => {
    setTender({ coid: coi, sid: si });
    console.log("pp", si);
  }, [coi, si]);

  let handle = (e) => {
    e.preventDefault();
    console.log("t", tender);
    if (
      tender.coid === undefined ||
      tender.sid === undefined ||
      deptfalg === false ||
      prjfalg === false
    ) {
      alert("Box is empty");
    } else {
      axios.post(`/auth/tender`, tender).then((res) => alert("success"));
      window.location.reload();
    }
  };
  let handleDelete = (id) => {
    axios
      .delete(`/auth/deletetender/${id}`)
      .then(() => window.location.reload());
  };
  return (
    <div className="mainContainer">
      <Header />
      <div className="body">
        <Link to="/customers">
          <i className="back icon-left"></i>
        </Link>
        <Welcome title="Customer" />
        <div className="container custom">
          <div className="row">
            <div className="p-2 d-flex">
              <div className="col-md-5">
                <label className="label">Company name</label>
                <select
                  className="form-control"
                  name="coid"
                  onChange={handelChange}
                >
                  <option value="" name="coid"></option>
                  {company
                    ? company.map((m) => (
                        <option value={m.Co_ID} name="coid">
                          {m.Co_Name}
                        </option>
                      ))
                    : null}
                </select>
              </div>
              <div className="col-md-5">
                <label className="label">Industry</label>
                <select
                  className="form-control"
                  name="sid"
                  onChange={handelChange}
                >
                  <option value="" name="sid"></option>
                  {ind
                    ? ind.map((m) => (
                        <option value={m.Si_ID} name="sid">
                          {m.Si_Name}
                        </option>
                      ))
                    : null}
                </select>
              </div>
              <div className="col-md-5">
                <label className="label">Department</label>
                <select
                  className="form-control"
                  name="depname"
                  onChange={handelChange}
                >
                  <option value="" name="depname"></option>
                  {dept
                    ? dept.map((m) => (
                        <option value={m.Department_Name} name="depname">
                          {m.Department_Name}
                        </option>
                      ))
                    : null}
                </select>
              </div>
              <div className="col-md-5">
                <label className="label">Project</label>
                <select
                  className="form-control"
                  name="project"
                  onChange={handelChange}
                >
                  <option value="" name="project"></option>
                  {prj
                    ? prj.map((m) => (
                        <option value={m.Prj_ID} name="project">
                          {m.Prj_Name}
                        </option>
                      ))
                    : null}
                </select>
              </div>
              <div className="col-md-3">
                <input
                  type="submit"
                  className="btn btn-primary btn-block mt-4"
                  onClick={handle}
                />
              </div>
            </div>
          </div>
          <div className="pad-top">
            <p style={{ color: "green" }}>
              NOte:Every boxes above must have value
            </p>
            <Scrollbars style={{ height: 500 }}>
              <table class="table table-hover">
                <thead class="thead-dark">
                  <tr>
                    <th scope="col">Date</th>
                    <th scope="col">Company Name</th>
                    <th scope="col">Address</th>
                    <th scope="col">Landline</th>
                    <th scope="col">Project Name</th>
                    <th scope="col">Contact Person Name</th>
                    <th scope="col">Number</th>
                    <th scope="col">Department</th>
                    <th scope="col">Amount</th>
                    <th scope="col">Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {tableone
                    ? tableone.map((t) => (
                        <tr className="table-tr">
                          <th>{t.T_Date}</th>
                          <th>
                            {t.Co_Name}
                            {t.T_ID}
                          </th>
                          <th>{t.Co_Address}</th>
                          <th>{t.Co_Landline}</th>
                          <th>{t.Prj_Name}</th>
                          <th>{t.Cp_Name}</th>
                          <th>{t.Cp_Number}</th>
                          <th>{t.Department_Name}</th>
                          <th>{t.Prj_Amt}</th>
                          <th>
                            {" "}
                            <i
                              className="reviewhistory-icondelete icon-delete"
                              onClick={() => {
                                setid(t.T_ID);
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
                          </th>
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
  );
};

export default Tender;
