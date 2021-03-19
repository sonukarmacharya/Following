import React, { useState, useEffect } from "react";
import Header from "../../layouts/HeadSales";
import Welcome from "../../layouts/Welcome";
import { Link, useParams } from "react-router-dom";
import "../../assets/sass/app.css";
import axios from "axios";
import { Scrollbars } from "rc-scrollbars";
import piepic from "../../assets/images/pie.png";
import { Bar } from "react-chartjs-2";

const Report = () => {
  const [ind, setInd] = useState();
  const [dept, setDept] = useState(null);
  const [prj, setPrj] = useState(null);
  const [coi, setCoi] = useState();
  const [si, setSi] = useState();
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
    await axios
      .get(`/auth/counttasktable/${id.id}`)
      .then((result) => setcountCustAsgTable(result.data.data));

    await axios.get(`/auth/counttask/${id.id}`).then((result) => {
      let datas = result.data.data[0]["TOTAL"];
      setcountCustAsg(result);
    });

    await axios
      .get(`/auth/countProductsTable/${id.id}`)
      .then((result) => setcountProductTable(result.data.data));

    await axios.get(`/auth/countProducts/${id.id}`).then((result) => {
      // let datas = result.data.data[0]["TOTAL"];
      // setcountProduct(datas);
    });

    await axios
      .get(`/auth/countreviewTable/${id.id}`)
      .then((result) => setcountReviewTable(result.data.data));

    await axios.get(`/auth/countreview/${id.id}`).then((result) => {
      // let datas = result.data.data[0]["TOTAL"];
      // setcountReview(datas);
    });
  }, []);

  useEffect(() => {
    console.log(countCustAsg, id.id);
  }, [countCustAsg]);
  return (
    <div>
      <Header />
      <div className="main-content">
        <div class="path">
          <span>
            <b>Report</b>
          </span>
        </div>
        <div class="row mb-4">
          <div class="col-md-4 col-lg-3">
            <div class="report-card">
              <small>Total Customers Assigned</small>
              <div class="number">{countCustAsg}</div>
            </div>
          </div>
          <div class="col-md-4 col-lg-3">
            <div class="report-card">
              <small>Total Products Assigned</small>
              <div class="number">{countProduct}</div>
            </div>
          </div>
          <div class="col-md-4 col-lg-3">
            <div class="report-card">
              <small>Total Review</small>
              <div class="number">{countReview}</div>
            </div>
          </div>
        </div>
        <div class="row report-row gutter-bot-md">
          <div class="col-md-12 bar-graph bg-white gutter-bot-md">
            <div class="img-container">
              <Bar data={data} options={options} />
            </div>
          </div>
        </div>
        <div class="d-flex table-wrap gutter-top-md ">
          <table class="mr-3 table table-hover bg-white">
            <thead class="bg-theme">
              <tr>
                <th scope="col">Date</th>
                <th scope="col">Reviews</th>
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
          <table class="mr-3 table table-hover gutter-top-md bg-white">
            <thead class="bg-theme">
              <tr>
                <th scope="col">Date</th>
                <th scope="col">Products Assigned</th>
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
          <table class="mr-3 table table-hover gutter-top-md bg-white">
            <thead class="bg-theme">
              <tr>
                <th scope="col">Date</th>
                <th scope="col">Customers Assigned</th>
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

export default Report;
