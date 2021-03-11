import React, { useState, history } from "react";
import axios from "axios";
import logo from "../../assets/images/logo.svg";
import "../../assets/sass/app.css";
import { useHistory } from "react-router-dom";
import auth from "../auth";

const Login = () => {
  const [formdata, setFormdata] = useState([]);
  const [Error, setError] = useState("");
  const history = useHistory();

  let handelChange = (e) => {
    setFormdata({ ...formdata, [e.target.name]: e.target.value });
  };

  let handleSubmit = (e) => {
    e.preventDefault();
    axios.post(`http://localhost:5000/auth/login`, formdata).then((result) => {
      if (result.data.message == "admin") {
        localStorage.setItem("user", JSON.stringify(result.data.data[0].A_ID));
        auth.login(() => {
          history.push("/dashboard");
        });
      } else if (result.data.message == "salesperson") {
        console.log("sales");
        localStorage.setItem("user", JSON.stringify(result.data.data[0].S_ID));
        auth.login(() => {
          history.push("/customersUser");
        });
      } else {
        setError(result.data.message);
        console.log("err");
      }
    });
  };

  return (
    <div>
      <section class="login-section">
        <div class="login-container">
          <div class="login-title">
            <h2 class="text-center">Welcome</h2>
            <h4 class="text-center">Customer follow up System</h4>
          </div>
          <div class="login-form">
            <b class="text-center">Login form</b>
            {Error ? <p>{Error}</p> : null}
            <form action="" class=" d-flex flex-column" onSubmit={handleSubmit}>
              <div class="form-group">
                <label>Username</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Enter your username"
                  name="username"
                  onChange={handelChange}
                />
              </div>
              <div class="form-group">
                <label>Password</label>
                <input
                  type="password"
                  class="form-control"
                  placeholder="Enter your password"
                  onChange={handelChange}
                  name="password"
                />
              </div>

              <button type="submit" class="login-btn pad-top">
                Login
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
