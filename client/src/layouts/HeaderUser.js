import React from "react";
import "../assets/sass/app.css";
import { NavLink, useLocation } from "react-router-dom";
import dash from "../assets/images/dashboard.png";
import product from "../assets/images/product.png";
import sp from "../assets/images/sales person.png";
import cust from "../assets/images/customer.png";
import report from "../assets/images/report.png";
import logout from "../assets/images/logout.png";
import sideImage from "../assets/images/side-image.png";
import auth from "../pages/auth";
import { useHistory } from "react-router-dom";

const HeaderUser = () => {
  // const [username, setusername] = useState("");
  // const [image, setimage] = useState();
  // const history = useHistory();
  // useEffect(async () => {
  //   const id = localStorage.getItem("user");
  //   console.log("id", id);
  //   let us = await axios.get(`/auth/DisplaysalespersonId/${id}`);
  //   //console.log(us.data.data[0].S_Username)
  //   setusername(us.data.data[0].S_Username);
  //   setimage(us.data.data[0].S_Image);
  // }, []);

  // useEffect(() => {
  //   console.log(image);
  // }, [image]);

  const { pathname } = useLocation();
  const history = useHistory();
  return (
    <div className="sidebar">
      <ul className="sidebar-menu pad-top">
        <li className="menu-item">
          <NavLink
            activeClassName="active"
            className="menu-btn"
            to="/customersUser"
          >
            <img src={dash} alt="" />
            Dashboards
          </NavLink>
        </li>
        <li className="menu-item">
          <NavLink activeClassName="active" className="menu-btn" to="/products">
            <img src={product} alt="" />
            Product Details
          </NavLink>
        </li>
        <li className="menu-item">
          <NavLink
            exact
            activeClassName="active"
            className="menu-btn"
            to="/salesperson"
            isActive={() =>
              ["/salesperson", "/asalesperson/:id"].includes(pathname)
            }
          >
            <img src={sp} alt="" />
            SalesPerson Detail
          </NavLink>
        </li>
        <li className="menu-item">
          <NavLink
            activeClassName="active"
            className="menu-btn"
            to="/customers"
            isActive={() =>
              ["/customers", "/acustomer/:id", "/customersUser"].includes(
                pathname
              )
            }
          >
            <img src={cust} alt="" />
            Customer Details
          </NavLink>
        </li>
        <li className="menu-item">
          <NavLink className="menu-btn" to="/report">
            <img src={report} alt="" />
            Report
          </NavLink>
        </li>
        <hr />

        <li class="menu-item">
          <NavLink
            className="menu-btn"
            to="/"
            onClick={() => {
              auth.logout(() => {
                history.push("/");
              });
            }}
          >
            <img src={logout} alt="" />
            logout
          </NavLink>
        </li>
      </ul>
      <img src={sideImage} alt="" class="side-image" />
    </div>
  );
  // return (
  // <div>
  //   <header className="headUser">
  //     <nav class="navbar navbar-expand-lg navbar-dark head__custom-nav">
  //       <a class="navbar-brand d-flex align-items-center" href="#">
  //         <img src={logo} className="login-logo " />
  //         <span className="text-light">Construction Solution Pvt Ltd</span>
  //       </a>
  //        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav">
  //           <span><i class="fa fa-navicon text-white"></i></span>
  //         </button>
  //       <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
  //           <ul class="navbar-nav">
  //             <li class="welcome d-flex">
  //               <p className=" text-light pt-4">Welcome,{username}</p>
  //               {!image?<i className="icon mt-3 icon-profile"></i>:
  //                       <img className="img-container" src={`http://localhost:5000/Sales/${image}`}/>}

  //             </li>
  //             <li>
  //               <NavLink
  //                 className="nav-link"
  //                     to="/"
  //                     onClick={() => {
  //                       auth.logout(() => {
  //                       history.push("/");
  //                       });
  //                     }}
  //                     >
  //                 logout
  //               </NavLink>
  //           </li>
  //         </ul>
  //       </div>
  //  </nav>
  // </header>

  //  </div>

  // );
};

export default HeaderUser;
