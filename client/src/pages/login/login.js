import React, {useState,history } from "react";
import axios from "axios";
import logo from "../../assets/images/logo.svg";
import "../../assets/sass/app.css";
import { useHistory  } from 'react-router-dom'
import auth from '../auth'


const Login =()=>{
 const [formdata, setFormdata] = useState([])
 const [Error, setError] = useState('')
 const history = useHistory();

 let handelChange = (e) =>{
  setFormdata({ ...formdata, [e.target.name]: e.target.value });
  
}

let handleSubmit =(e)=>{
  e.preventDefault()
  axios.post(`http://localhost:5000/auth/login`,formdata)
  .then((result)=>{
      if(result.data.message=='admin'){
        localStorage.setItem("user", JSON.stringify(result.data.data[0].A_ID));
        auth.login(() => {
         history.push("/dashboard");
        });
      }
      else if(result.data.message=='salesperson'){
        console.log('sales')
        localStorage.setItem("user", JSON.stringify(result.data.data[0].S_ID));
        auth.login(() => {
          history.push("/customersUser")
         });
      }
      else {
        setError(result.data.message)
        console.log("err")
      }
  })
}

  return(
    <div className="mainContainer">
    <img src={logo} className="login-logo" />
    <span className="dot" />

    <div className="login-box">
      <div className="login-container p-5">
        <div className="login-heading ">
          <h1 className="login-welcome">WELCOME</h1>
          <h2 className="login-companyname">
            Construction Solution PVT LTD
          </h2>
        </div>
    
        {Error? <p>{Error}</p>:null}
        <form className="form" onSubmit={handleSubmit}>
          <div className="login-form">
            <label className="login-label">Username</label>
            <div className="login-text-box">
              <i className=" login-inputtext-icon icon-profile"></i>

              <input type="text" className="form-control" name="username" onChange={handelChange} />
            </div>
          </div>
          <div className="login-form">
            <label>Password</label>
            <div className="login-text-box">
              <i className="login-inputtext-icon icon-login"></i>
              <input type="password" className="form-control custom" name="password" onChange={handelChange} />
            </div>
          </div>

          <input type="submit" value="LOGIN" className="btn btn-primary btn-block mt-4"/>
        </form>
      </div>
    </div>
    <span className="dot-bottom" />
  </div>
);
}

export default Login;
