import React,{useEffect,useState} from "react";
import { NavLink} from "react-router-dom";
import "../assets/sass/app.css";
import logo from "../assets/images/logo.svg";
import axios from 'axios'
import { useHistory  } from 'react-router-dom'
import auth from '../pages/auth'

const HeaderUser = () => {
  const [username, setusername] = useState('')
  const [image, setimage] = useState()
  const history = useHistory();
  useEffect(async()=> {
    const id = localStorage.getItem("user")
    console.log("id",id)
  let us= await axios.get(`/auth/DisplaysalespersonId/${id}`)
  //console.log(us.data.data[0].S_Username)
  setusername( us.data.data[0].S_Username)
  setimage(us.data.data[0].S_Image)
    
  }, [])

  useEffect(() => {
    console.log(image)
  }, [image])

  return (
  <div>
    <header className="headUser">
      <nav class="navbar navbar-expand-lg navbar-dark head__custom-nav">
        <a class="navbar-brand d-flex align-items-center" href="#">
          <img src={logo} className="login-logo " />
          <span className="text-light">Construction Solution Pvt Ltd</span>
        </a>
         <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav">
            <span><i class="fa fa-navicon text-white"></i></span>
          </button>
        <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
            <ul class="navbar-nav">
              <li class="welcome d-flex">
                <p className=" text-light pt-4">Welcome,{username}</p>
                {!image?<i className="icon mt-3 icon-profile"></i>:
                        <img className="img-container" src={`http://localhost:5000/Sales/${image}`}/>}

              </li>
              <li>
                <NavLink
                  className="nav-link"
                      to="/"
                      onClick={() => {
                        auth.logout(() => {
                        history.push("/");
                        });
                      }}
                      >
                  logout
                </NavLink>
            </li>
          </ul>
        </div>
   </nav>
  </header>
   
   </div>

    
  );
};

export default HeaderUser;
