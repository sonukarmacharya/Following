import React, { useState, useEffect } from "react";
import Header from "../../layouts/Header";
import Welcome from "../../layouts/Welcome";
import { Link, useParams } from "react-router-dom";
import "../../assets/sass/app.css";
import axios from "axios";

const Asales = () => {
  const id = useParams();
  console.log("id", id.id);
  const userid = localStorage.getItem("user");
  const [task, setTask] = useState([]);
  const [detail, setDetail] = useState([]);
  const [branch, setBranch] = useState([]);
  const [company, setCompany] = useState([]);
  const [asgcompany, setAsgCompany] = useState([]);
  const [asgproject, setAsgProject] = useState([]);
  const [salesPerson, setSalesPerson] = useState([]);
  const [project, setProject] = useState([]);
  const [dataform, setDataform] = useState([]);
  const [error, setError] = useState(false);
  const [coid, setcoid] = useState([]);
  const [modalIsOpen, setmodalIsOpen] = useState(false);
  const [editreview, setEditreview] = useState(null);
  const [val, setval] = useState("");

  useEffect(async () => {
    const comp = await axios(`/auth/company`);
    //const sales = await axios(`/auth/DisplaysalespersonId/${id.id}`);
    const asgcomp = await axios(`/auth/gettask/${id.id}`);
    const asgpro = await axios(`/auth/DisplayTaskProject/${id.id}`);
    console.log("ss", comp.data.data);
    setCompany(comp.data.data);
    //setSalesPerson(sales.data.data);
    setAsgCompany(asgcomp.data.data);
    setAsgProject(asgpro.data.data);
  }, []);

  useEffect(() => {
    console.log(asgcompany);
  }, [asgcompany]);

  let handleChange = (e) => {
    e.preventDefault();
    console.log([e.target.value]);
    setcoid([e.target.value]);
    axios(`/auth/companyProjectId/${[e.target.value]}`).then((data) =>
      setProject(data.data.data)
    );
  };

  let handle = (e) => {
    setDataform({
      ...dataform,
      [e.target.name]: [e.target.value],
      aid: userid,
      sid: id.id,
      coid,
    });
  };
  let handleSubmit = (e) => {
    e.preventDefault();
    console.log(dataform);
    axios
      .post(`/auth/Insertadminassign`, dataform)
      .then((data) => {
        alert("inserted successfully");

        window.location.reload();
      })
      .catch((err) => console.log(err));
  };
  let handleDelete = (coid, prjid) => {
    console.log("del", id.id, coid, prjid);
    axios
      .delete(`/auth/DeleteAsg/${id.id}/${coid}/${prjid}`)
      .then(() => window.location.reload());
  };
  return (
    (error && <h1>Error</h1>) || (
      <div>
        <Header />
        <div>
          <Link to="/salesperson">
            <i className="back icon-left"></i>
          </Link>
          <Welcome title="Salesperson" />
          <div className="container custom">
            <div className="row">
              <div className="col-md-4 col-6  mr-5">
                <div className="bg-light p-5 mb-3">
                  <h4 className="salesD-top-h1">Add Task</h4>
                  <hr className="salesD-top-hr" />
                  <form onSubmit={handleSubmit}>
                    <label className="salesD-label">Company Name</label>
                    <br />
                    <select
                      name="category"
                      id="category"
                      className="form-control"
                      name="coid"
                      onChange={handleChange}
                    >
                      <option name="coid" value=""></option>
                      {company ? (
                        company.map((ct) => (
                          <option name="coid" value={ct.Co_ID}>
                            {ct.Co_Name}
                          </option>
                        ))
                      ) : (
                        <option name="coid" value=""></option>
                      )}
                    </select>
                    <br />
                    <label className="salesD-label">Project Name</label>
                    <br />
                    <select
                      name="category"
                      id="category"
                      className="form-control"
                      name="prjid"
                      onChange={handle}
                    >
                      <option name="prjid" value=""></option>
                      {project ? (
                        project.map((ct) => (
                          <option name="prjid" value={ct.Prj_ID}>
                            {ct.Prj_Name}
                          </option>
                        ))
                      ) : (
                        <option name="prjid" value=""></option>
                      )}
                    </select>
                    <br />
                    <input
                      type="submit"
                      className="btn btn-primary btn-block mt-4"
                      value="ADD"
                    />
                  </form>
                </div>
              </div>
              <div className="col-md-6 col-12 pl-5">
                <h1 className="salesD-h1">Task Details</h1>
                <hr className="salesD-hr" />
                <div className="pad-top">
                  <table className="table table-hover">
                    <thead className="thead-dark">
                      <tr>
                        <th scope="col">Company Name</th>
                        <th scope="col">Landline</th>
                        <th scope="col">Project name</th>
                        <th scope="col">Project amount</th>
                        <th scope="col">Delete</th>
                      </tr>
                    </thead>
                    <tbody>
                      {asgcompany
                        ? asgcompany.map((t) => (
                            <tr key={t.Co_ID}>
                              <td>
                                {t.Co_Name}mmmm{t.Co_ID}n{t.Si_ID}
                              </td>
                              <td>{t.Co_Landline}</td>
                              <td>{t.Prj_Name}</td>
                              <td>{t.Prj_Amt}</td>
                              <td>
                                <i
                                  className="reviewhistory-icondelete icon-delete"
                                  onClick={() => {
                                    handleDelete(t.Co_ID, t.Prj_ID);
                                  }}
                                ></i>
                              </td>
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
      </div>
    )
  );
};

export default Asales;
