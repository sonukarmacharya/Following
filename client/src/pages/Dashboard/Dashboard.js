import React, { useState, useEffect } from "react";
import Header from "../../layouts/Header";
import Welcome from "../../layouts/Welcome";
import "../../assets/sass/app.css";
import { Doughnut } from "react-chartjs-2";
import * as XLSX from "xlsx";
import axios from "axios";

const Dashboard = () => {
  const [visible, setVisible] = useState("true");
  const [check, setCheck] = useState("checked");
  const [low, setLow] = useState("");
  const [countProduct, setCountProduct] = useState("");
  const [countCustomersIn, setCountCustomersIn] = useState("");
  const [countCustomersDep, setCountCustomersDep] = useState("");
  const [countSalesperson, setCountSalesperson] = useState("");
  const [dropdown, setDropdown] = useState("product");
  const [form, setForm] = useState([]);
  const [image, setImage] = useState(null);
  const [excel, setExcel] = useState(null);
  const [error, setError] = useState({});
  const [company, setCompany] = useState();
  const [ind, setInd] = useState();

  const state = {
    labels: [
      "No of Products " + countProduct,
      "No of customers by industry" + countCustomersIn,
      "No of customers by department" + countCustomersDep,
      "No of Users " + countSalesperson,
    ],
    datasets: [
      {
        backgroundColor: ["#222FB9", "#09105F", "#D3D6EE"],

        data: [
          countProduct,
          countCustomersIn,
          countCustomersDep,
          countSalesperson,
        ],
      },
    ],
  };

  let handelImage = (e) => {
    setImage(e.target.files[0]);
  };

  let handleUpload = (e) => {
    setExcel(e.target.files[0]);
  };

  let handleuploadSubmit = () => {
    let formData = new FormData();
    excel && formData.append("file", excel);
    Object.keys(form).map((data, key) => {
      formData.append(`${data}`, form[data]);
    });
    axios.post(`/api/uploadfile`, formData).then((res) => {
      alert(res.data.message);
      setForm();
    });
  };

  let handelChange = (e) => {
    if (dropdown == "project") {
      const id = [e.target.value];
      axios(`/auth/companyIndustryId/${id}`).then((data) => {
        setInd(data.data.data);
        console.log("ii", data.data.data);
      });
      setForm({
        ...form,
        [e.target.name]: e.target.value,
        aid: localStorage.getItem("user"),
      });
    }

    setForm({
      ...form,
      [e.target.name]: e.target.value,
      aid: localStorage.getItem("user"),
    });
  };

  let handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
    if (dropdown == "product") {
      if (form == "") {
        setError({ empty: "field is empty" });
      } else {
        if (!Number(form.quantity)) {
          alert("quantity must be in number");
        } else {
          if (!Number(form.price)) {
            alert("price must be in number");
          } else {
            axios.post(`/auth/Insertproduct`, form).then((res) => {
              alert(res.data.message);
              setForm();
              window.location.reload();
            });
          }
        }
      }
    } else if (dropdown == "company") {
      if (form == "") {
        setError({ empty: "field is empty" });
      } else {
        if (!Number(form.landline)) {
          alert("landline must be in number");
        } else {
          axios.post(`/auth/Insertcompany`, form).then((res) => {
            alert(res.data.message);
            setForm();
            window.location.reload();
          });
        }
      }
    } else if (dropdown == "salesperson") {
      if (form == "") {
        setError({ empty: "field is empty" });
      } else {
        if (form.password.length < 5) {
          setError({ password: "should be at least 6 characters" });
        } else {
          if (!form.image) {
            setError({ image: "Image field is empty" });
          }
          if (form.email) {
            if (!form.email.match(/^[a-zA-Z]+$/)) {
              let formData = new FormData();
              image && formData.append("image", image);
              Object.keys(form).map((data, key) => {
                formData.append(`${data}`, form[data]);
              });
              console.log("here");
              axios.post(`/auth/Insertsalesperson`, form).then((res) => {
                alert(res.data.message);
                setForm();
                window.location.reload();
              });
            } else {
              setError({ email: "email not valid" });
            }
          } else {
            setError({ empty: "field is empty" });
          }
        }
      }
    } else if (dropdown == "project") {
      console.log(form);
      if (!Number(form.prjamount)) {
        alert("project amount must be in number");
      } else {
        axios.post(`/auth/Insertmaster`, form).then((res) => {
          alert(res.data.message);
          window.location.reload();
        });
      }
    } else if (dropdown == "priority") {
      if (!Number(form.days)) {
        alert("Days must be in number");
      } else {
        axios.post(`/auth/Insertpriority`, form).then((res) => {
          alert(res.data.message);
          window.location.reload();
        });
      }
    }
  };

  useEffect(async () => {
    await axios.get(`/auth/Lowproduct`).then((data) => {
      let datas = data.data.data;
      setLow(datas.length);
      console.log("low", datas);
    });

    await axios.get(`/auth/Countproduct`).then((data) => {
      let datas = data.data.data[0]["COUNT(*)"];
      console.log("count product", datas);
      setCountProduct(datas);
    });

    await axios.get(`/auth/Countsalesperson`).then((data) => {
      let datas = data.data.data[0]["COUNT(*)"];
      setCountSalesperson(datas);
    });

    await axios.get(`/auth/CountcutomerIndustry`).then((data) => {
      let datas = data.data.data[0]["COUNT(*)"];
      setCountCustomersIn(datas);
    });

    await axios.get(`/auth/CountcutomerDepartment`).then((data) => {
      let datas = data.data.data[0]["COUNT(*)"];
      setCountCustomersDep(datas);
    });

    await axios.get(`/auth/company`).then((data) => {
      let datas = data.data.data;
      setCompany(datas);
      console.log("comp", datas);
    });
  }, []);

  return (
    <div>
      <Header />
      <div>
        <div class="main-content">
          <Welcome />

          {/* <div class="path">
            <span>
              <b>Dashboard</b>
            </span>
          </div>
          <div class="welcome-container">
            <h4 class="theme-color">Welcome to our community</h4>
            <p>Manage product, sales person, customer details</p>
          </div> */}
          <div class="row">
            <div class="col-md-12 col-lg-6 diag-info">
              <div>
                {low ? (
                  <div class="message-danger">
                    <b class="danger-color">Product Quality Low</b>
                    <small>Please, wait product detail page for more job</small>
                  </div>
                ) : null}
              </div>
              <div class="pie-container img-container">
                <Doughnut
                  data={state}
                  options={{
                    legend: {
                      display: true,
                      position: "right",
                    },
                  }}
                />
              </div>
            </div>
            <div class="col-md-8 col-lg-6">
              <div class=" form-container">
                <h4 class="form-title">Category Option</h4>
                <form action="">
                  {/* <!-- select category  --> */}
                  <div class="form-group">
                    <small>Select category</small>
                    <select
                      name="category"
                      id="category"
                      className="form-control"
                      onChange={(e) => setDropdown(e.target.value)}
                    >
                      <option value="product">Product</option>
                      <option value="salesperson">Salesperson</option>

                      <option value="company">Company</option>
                      <option value="project">Project</option>
                    </select>
                  </div>

                  {/* <!-- radio btn  --> */}
                  <div class="radio-btn text-center">
                    <div class="form-check form-check-inline">
                      <input
                        type="radio"
                        id="choice1-1"
                        name="choice1"
                        value="add"
                        onClick={() => {
                          setVisible("true");
                          setCheck("checked");
                        }}
                        checked={check}
                      />
                      <small class="form-check-label">Add yourself</small>
                    </div>
                    <div class="form-check form-check-inline">
                      <input
                        type="radio"
                        id="choice1-2"
                        name="choice1"
                        value="sub"
                        onClick={() => {
                          setVisible("false");
                          setCheck("");
                        }}
                      />
                      <small class="form-check-label">Upload file</small>
                    </div>
                  </div>

                  <div class="form-group">
                    {visible == "true" ? (
                      dropdown == "product" ? (
                        <div>
                          <small>Model</small>
                          <input
                            type="text"
                            className="form-control"
                            name="model"
                            onChange={handelChange}
                          />
                          {error.empty ? <p>{error.empty}</p> : null}
                          <small>Product name</small>
                          <input
                            type="text"
                            className="form-control"
                            name="name"
                            onChange={handelChange}
                          />
                          {error.empty ? <p>{error.empty}</p> : null}
                          <small>Quantity</small>
                          <input
                            type="text"
                            className="form-control"
                            name="quantity"
                            onChange={handelChange}
                          />
                          {error.empty ? <p>{error.empty}</p> : null}
                          <small>Price</small>
                          <input
                            type="text"
                            className="form-control"
                            name="price"
                            onChange={handelChange}
                          />
                          {error.empty ? <p>{error.empty}</p> : null}
                          <button
                            type="submit"
                            class="common-btn gutter-top-md"
                            onClick={handleSubmit}
                          >
                            Submit
                          </button>
                        </div>
                      ) : dropdown == "company" ? (
                        <div>
                          <small>Company name</small>
                          <input
                            type="text"
                            className="form-control"
                            name="name"
                            onChange={handelChange}
                          />

                          {error.empty ? <p>{error.empty}</p> : null}
                          <small>District</small>
                          <input
                            type="text"
                            className="form-control"
                            name="district"
                            onChange={handelChange}
                          />

                          {error.empty ? <p>{error.empty}</p> : null}
                          <small>Industry</small>
                          <input
                            type="text"
                            className="form-control"
                            name="iname"
                            onChange={handelChange}
                          />

                          {error.empty ? <p>{error.empty}</p> : null}
                          <small>Address</small>

                          <input
                            type="text"
                            className="form-control"
                            name="address"
                            onChange={handelChange}
                          />

                          {error.empty ? <p>{error.empty}</p> : null}
                          <small>Landline</small>

                          <input
                            type="text"
                            className="form-control"
                            name="landline"
                            onChange={handelChange}
                          />

                          {error.empty ? <p>{error.empty}</p> : null}

                          <button
                            type="submit"
                            class="common-btn float-right"
                            onClick={handleSubmit}
                          >
                            Submit
                          </button>
                        </div>
                      ) : dropdown == "salesperson" ? (
                        <div>
                          <small>salesperson username</small>
                          <input
                            type="text"
                            className="form-control"
                            name="username"
                            onChange={handelChange}
                          />
                          {error.name || error.empty ? (
                            <p>
                              {error.name}
                              {error.empty}
                            </p>
                          ) : null}
                          <small>password</small>
                          <input
                            type="password"
                            className="form-control"
                            name="password"
                            onChange={handelChange}
                          />
                          {error.password || error.empty ? (
                            <p>
                              {error.password} {error.empty}
                            </p>
                          ) : null}
                          <small>Address</small>
                          <input
                            type="text"
                            className="form-control"
                            name="address"
                            onChange={handelChange}
                          />
                          {error.empty ? <p>{error.empty}</p> : null}
                          <small>Email</small>
                          <input
                            type="email"
                            className="form-control"
                            name="email"
                            onChange={handelChange}
                          />
                          {error.email || error.empty ? (
                            <p>
                              {error.email}
                              {error.empty}
                            </p>
                          ) : null}

                          <button
                            type="submit"
                            class="common-btn float-right"
                            onClick={handleSubmit}
                          >
                            Submit
                          </button>
                        </div>
                      ) : dropdown == "project" ? (
                        <div>
                          <form>
                            <small>Company name</small>
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
                            <small>Industry</small>
                            <select
                              className="form-control"
                              name="sid"
                              onChange={handelChange}
                            >
                              <option value="" name="coid"></option>
                              {ind
                                ? ind.map((i) => (
                                    <option value={i.Si_ID} name="coid">
                                      {i.Si_Name}
                                    </option>
                                  ))
                                : null}
                            </select>
                            <small>Project name</small>
                            <input
                              type="text"
                              className="form-control"
                              name="prjname"
                              onChange={handelChange}
                            />
                            <small>Project Amount</small>
                            <input
                              type="text"
                              className="form-control"
                              name="prjamount"
                              onChange={handelChange}
                            />
                          </form>
                          <button
                            type="submit"
                            class="common-btn float-right"
                            onClick={handleSubmit}
                          >
                            Submit
                          </button>
                          {/* <input
                            type="submit"
                            value="SUBMIT"
                            className="common-btn float-right"
                            onClick={handleSubmit}
                          /> */}
                        </div>
                      ) : null
                    ) : (
                      <div>
                        <input
                          type="file"
                          name="file"
                          onChange={handleUpload}
                          className="pt-4 ml-5"
                        />
                        <button
                          type="submit"
                          class="common-btn float-right"
                          onClick={handleSubmit}
                        >
                          Submit
                        </button>
                      </div>
                    )}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="container custom">
          <div className="row">
            <div className="col-md-6 col-12">
              {low ? (
                <div className="warning-message bg-danger">
                  <h5 className="text-center text-light">
                    Product Quatity LOW!!! :
                  </h5>
                  <p className="text-center text-light">
                    Please, visit “Product Detail page” for more info
                  </p>
                </div>
              ) : null}
              <div className="Dash-pie pt-4">
                <Pie
                  data={state}
                  options={{
                    legend: {
                      display: true,
                      position: "right",
                    },
                  }}
                />
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div class="form group pb-4">
                <small>Select Catagory</small>
                <select
                  name="category"
                  id="category"
                  className="form-control"
                  onChange={(e) => setDropdown(e.target.value)}
                >
                  <option value="product">Product</option>
                  <option value="salesperson">Salesperson</option>
                  <option value="priority">Priority</option>
                  <option value="company">Company</option>
                  <option value="project">Project</option>
                </select>
              </div>
              <div className="Dash-radio text-center bg ml-5 mr-5">
                <small className="radio-button">
                  <input
                    type="radio"
                    className="radio-button__input"
                    id="choice1-1"
                    name="choice1"
                    value="add"
                    onClick={() => {
                      setVisible("true");
                      setCheck("checked");
                    }}
                    checked={check}
                  />
                  <span className="radio-button__control"></span>
                  <span className="radio-button__label pl-2 pr-4 text-white">
                    Add Yourself
                  </span>
                </label>
                <label className="radio-button">
                  <input
                    type="radio"
                    className="radio-button__input "
                    id="choice1-2"
                    name="choice1"
                    value="sub"
                    onClick={() => {
                      setVisible("false");
                      setCheck("");
                    }}
                  />
                  <span className="radio-button__control"></span>
                  <span className="radio-button__label pl-2 text-white">
                    Upload File
                  </span>
                </label>
              </div>
              {visible == "true" ? (
                dropdown == "product" ? (
                  <div>
                    <label className="label">Model</label>
                    <input
                      type="text"
                      className="form-control"
                      name="model"
                      onChange={handelChange}
                    />
                    {error.empty ? <p>{error.empty}</p> : null}
                    <label className="label">Product name</label>
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      onChange={handelChange}
                    />
                    {error.empty ? <p>{error.empty}</p> : null}
                    <label className="label">Quantity</label>
                    <input
                      type="text"
                      className="form-control"
                      name="quantity"
                      onChange={handelChange}
                    />
                    {error.empty ? <p>{error.empty}</p> : null}
                    <label className="label">Price</label>
                    <input
                      type="text"
                      className="form-control"
                      name="price"
                      onChange={handelChange}
                    />
                    {error.empty ? <p>{error.empty}</p> : null}
                    <input
                      type="submit"
                      value="SUBMIT"
                      className="btn btn-primary btn-block mt-4"
                      onClick={handleSubmit}
                    />
                  </div>
                ) : dropdown == "priority" ? (
                  <div>
                    <label className="label">Priority Name</label>
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      onChange={handelChange}
                    />
                    {error.empty ? <p>{error.empty}</p> : null}
                    <label className="label">Priority Color</label>
                    <input
                      type="text"
                      className="form-control"
                      name="color"
                      onChange={handelChange}
                    />
                    {error.empty ? <p>{error.empty}</p> : null}
                    <label className="label">Priority Dyas</label>
                    <input
                      type="text"
                      className="form-control"
                      name="days"
                      onChange={handelChange}
                    />
                    {error.empty ? <p>{error.empty}</p> : null}
                    <input
                      type="submit"
                      value="SUBMIT"
                      className="btn btn-primary btn-block mt-4"
                      onClick={handleSubmit}
                    />
                  </div>
                ) : dropdown == "company" ? (
                  <div>
                    <label className="label">Company name</label>
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      onChange={handelChange}
                    />

                    {error.empty ? <p>{error.empty}</p> : null}
                    <label className="label">District</label>
                    <input
                      type="text"
                      className="form-control"
                      name="district"
                      onChange={handelChange}
                    />

                    {error.empty ? <p>{error.empty}</p> : null}
                    <label className="label">Industry</label>
                    <input
                      type="text"
                      className="form-control"
                      name="iname"
                      onChange={handelChange}
                    />

                    {error.empty ? <p>{error.empty}</p> : null}
                    <label className="label">Address</label>

                    <input
                      type="text"
                      className="form-control"
                      name="address"
                      onChange={handelChange}
                    />

                    {error.empty ? <p>{error.empty}</p> : null}
                    <label className="label">Landline</label>

                    <input
                      type="text"
                      className="form-control"
                      name="landline"
                      onChange={handelChange}
                    />

                    {error.empty ? <p>{error.empty}</p> : null}

                    <input
                      type="submit"
                      value="SUBMIT"
                      className="btn btn-primary btn-block mt-4"
                      onClick={handleSubmit}
                    />
                  </div>
                ) : dropdown == "salesperson" ? (
                  <div>
                    <label className="label">salesperson username</label>

                    <input
                      type="text"
                      className="form-control"
                      name="username"
                      onChange={handelChange}
                    />

                    {error.name || error.empty ? (
                      <p>
                        {error.name}
                        {error.empty}
                      </p>
                    ) : null}
                    <label className="label">password</label>

                    <input
                      type="password"
                      className="form-control"
                      name="password"
                      onChange={handelChange}
                    />

                    {error.password || error.empty ? (
                      <p>
                        {error.password} {error.empty}
                      </p>
                    ) : null}
                    <label className="label">Address</label>

                    <input
                      type="text"
                      className="form-control"
                      name="address"
                      onChange={handelChange}
                    />

                    {error.empty ? <p>{error.empty}</p> : null}
                    <label className="label">Email</label>

                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      onChange={handelChange}
                    />

                    {error.email || error.empty ? (
                      <p>
                        {error.email}
                        {error.empty}
                      </p>
                    ) : null}
                    <label className="label">Image</label>

                    <input
                      type="file"
                      className="pt-4"
                      name="image"
                      onChange={handelImage}
                    />
                    {error.image || error.image ? (
                      <p>
                        {error.image}
                        {error.empty}
                      </p>
                    ) : null}
                    <input
                      type="submit"
                      value="SUBMIT"
                      className="btn btn-primary btn-block mt-4"
                      onClick={handleSubmit}
                    />
                  </div>
                ) : dropdown == "project" ? (
                  <div>
                    <form>
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
                      <label className="label">Industry</label>
                      <select
                        className="form-control"
                        name="sid"
                        onChange={handelChange}
                      >
                        <option value="" name="coid"></option>
                        {ind
                          ? ind.map((i) => (
                              <option value={i.Si_ID} name="coid">
                                {i.Si_Name}
                              </option>
                            ))
                          : null}
                      </select>
                      <label className="label">Project name</label>
                      <input
                        type="text"
                        className="form-control"
                        name="prjname"
                        onChange={handelChange}
                      />
                      <label className="label">Project Amount</label>
                      <input
                        type="text"
                        className="form-control"
                        name="prjamount"
                        onChange={handelChange}
                      />
                    </form>
                    <input
                      type="submit"
                      value="SUBMIT"
                      className="btn btn-primary btn-block mt-4"
                      onClick={handleSubmit}
                    />
                  </div>
                ) : null
              ) : (
                <div className="Dash-upload col-md-4 col-6 text-center ml-5">
                  <input
                    type="file"
                    name="file"
                    onChange={handleUpload}
                    className="pt-4 ml-5"
                  />
                  <input
                    type="submit"
                    value="SUBMIT"
                    className="btn btn-primary mt-4 ml-5"
                    onClick={handleuploadSubmit}
                  />
                </div>
              )}
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Dashboard;
