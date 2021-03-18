import React, { useState, useEffect } from "react";
import Header from "../../layouts/Header";
import Welcome from "../../layouts/Welcome";
import { Link, useParams } from "react-router-dom";
import "../../assets/sass/app.css";
import axios from "axios";
import { Scrollbars } from "rc-scrollbars";
import piepic from "../../assets/images/pie.png";
import { Bar } from "react-chartjs-2";

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
  const id = useParams();
  const [countCustAsgTable, setcountCustAsgTable] = useState();
  const [countCustAsg, setcountCustAsg] = useState();
  const [countProductTable, setcountProductTable] = useState();
  const [countProduct, setcountProduct] = useState();
  const [countReviewTable, setcountReviewTable] = useState();
  const [countReview, setcountReview] = useState();

  const data = {
    labels: ["1"],
    datasets: [
      {
        label: "Total No Of Reviews",
        data: [countReview],
        backgroundColor: "rgb(255, 99, 132)",
      },
      {
        label: "Total No Of Products Assigned",
        data: [countProduct],
        backgroundColor: "rgb(54, 162, 235)",
      },
      {
        label: "Total No Of Customers Assigned",
        data: [countCustAsg],
        backgroundColor: "rgb(75, 192, 192)",
      },
    ],
  };

  const options = {
    scales: {
      yAxes: [
        {
          stacked: true,
          ticks: {
            beginAtZero: true,
          },
        },
      ],
      xAxes: [
        {
          stacked: true,
        },
      ],
    },
  };

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
    await axios
      .get(`/auth/counttasktable/${id.id}`)
      .then((result) => setcountCustAsgTable(result.data.data));

    await axios.get(`/auth/counttask/${id.id}`).then((result) => {
      let datas = result.data.data[0]["TOTAL"];
      setcountCustAsg(datas);
    });

    await axios
      .get(`/auth/countProductsTable/${id.id}`)
      .then((result) => setcountProductTable(result.data.data));

    await axios.get(`/auth/countProducts/${id.id}`).then((result) => {
      let datas = result.data.data[0]["TOTAL"];
      setcountProduct(datas);
    });

    await axios
      .get(`/auth/countreviewTable/${id.id}`)
      .then((result) => setcountReviewTable(result.data.data));

    await axios.get(`/auth/countreview/${id.id}`).then((result) => {
      let datas = result.data.data[0]["TOTAL"];
      setcountReview(datas);
    });
  }, []);

  useEffect(() => {
    console.log(countCustAsgTable);
  }, [countCustAsgTable]);
  return (
    <div>
      <Header />
      <div className="main-content">
        <div class="path">
          <span>
            <b>Report</b>
          </span>
        </div>
        <div class="row">
          <div class="col-md-3 col-lg-2 mb-4">
            <div class="report-card">
              <small>Total Customers Assigned</small>
              <div class="number">{countCustAsg}</div>
            </div>
          </div>
          <div class="col-md-3 col-lg-2">
            <div class="report-card">
              <small>Total Products Assigned</small>
              <div class="number">{countProduct}</div>
            </div>
          </div>
          <div class="col-md-3 col-lg-2">
            <div class="report-card">
              <small>Total Review</small>
              <div class="number">{countReview}</div>
            </div>
          </div>
        </div>
        <div class="row report-row">
          <div class="col-md-6 diag-info">
            <div class="pie-container img-container">
              <Bar data={data} options={options} />
            </div>
          </div>
        </div>
        <div class="d-flex table-wrap">
          <table class="mr-3 table table-hover">
            <thead class="bg-theme">
              <tr>
                <th scope="col">Date</th>
                <th scope="col">Number of Review</th>
              </tr>
            </thead>
            <tbody>
              {countReviewTable ? (
                countReviewTable.map((c) => (
                  <tr>
                    <td scope="row">{c.Date}</td>
                    <td>{c.TOTAL}</td>
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
          <table class="mr-3 table table-hover">
            <thead class="bg-theme">
              <tr>
                <th scope="col">Date</th>
                <th scope="col">Number of Products Assigned</th>
              </tr>
            </thead>
            <tbody>
              {countProductTable ? (
                countProductTable.map((c) => (
                  <tr>
                    <td scope="row">{c.Date}</td>
                    <td>{c.TOTAL}</td>
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
          <table class="mr-3 table table-hover">
            <thead class="bg-theme">
              <tr>
                <th scope="col">Date</th>
                <th scope="col">Number of Customers Assigned</th>
              </tr>
            </thead>
            <tbody>
              {countCustAsgTable ? (
                countCustAsgTable.map((c) => (
                  <tr>
                    <td scope="row">{c.Date}</td>
                    <td>{c.TOTAL}</td>
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
  );
};

export default Tender;
