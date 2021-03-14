import React, { useState, useEffect } from "react";
import Header from "../../layouts/Header";
import Welcome from "../../layouts/Welcome";
import { Link, useParams } from "react-router-dom";
import "../../assets/sass/app.css";
import axios from "axios";
import { Scrollbars } from "rc-scrollbars";
import piepic from "../../assets/images/pie.png";
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
    <div>
      <Header />
      <div className="main-content">
        <div
          class="path"
          // style={"width:100%"}
        >
          <span>
            <b>Report</b>
          </span>
        </div>
        <div class="row">
          <div class="col-md-3 col-lg-2 mb-4">
            <div class="report-card">
              <small>Total Review</small>
              <div class="number">60</div>
            </div>
          </div>
          <div class="col-md-3 col-lg-2">
            <div class="report-card">
              <small>Total Review</small>
              <div class="number">60</div>
            </div>
          </div>
          <div class="col-md-3 col-lg-2">
            <div class="report-card">
              <small>Total Review</small>
              <div class="number">60</div>
            </div>
          </div>
        </div>
        <div class="row report-row">
          <div class="col-md-6 diag-info">
            <div class="pie-container img-container">
              <img src={piepic} alt="" class="img-fitted" />
            </div>
          </div>
          <div class="col-md-6 diag-info">
            <div class="pie-container img-container">
              <img src={piepic} alt="" class="img-fitted" />
            </div>
          </div>
          <div class="col-md-6 diag-info">
            <div class="pie-container img-container">
              <img src={piepic} alt="" class="img-fitted" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tender;
