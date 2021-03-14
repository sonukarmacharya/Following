import React from "react";
import Header from "../../layouts/Header";

function ReportDetail() {
  return (
    <div>
      <Header />
      <div class="main-content">
        <div class="path" style="width:100%">
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
              <img src="./images/pie.png" alt="" class="img-fitted" />
            </div>
          </div>
          <div class="col-md-6 diag-info">
            <div class="pie-container img-container">
              <img src="./images/pie.png" alt="" class="img-fitted" />
            </div>
          </div>
          <div class="col-md-6 diag-info">
            <div class="pie-container img-container">
              <img src="./images/pie.png" alt="" class="img-fitted" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReportDetail;
