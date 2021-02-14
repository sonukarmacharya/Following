import React,{useEffect,useState} from "react";
import "../assets/sass/app.css";
import axios from 'axios'

const Welcome = (props) => {
  const [username, setusername] = useState('')
  const [image, setimage] = useState()

  useEffect(async()=> {
    const Id = localStorage.getItem("user")
  let user= await axios.get(`/auth/admin/${Id}`)
  console.log(Id)
  setimage(user.data.data[0].A_Image)
  setusername( user.data.data[0].A_Username)
  }, [])
 
  return (
      <div className="container  pad-top">
        {!image?<i className="icon icon-profile"></i>:<img className="img-container" src='http://localhost:5000/Admin/image-1606199832232.jpg'/>}
        <span>Welcome,{username}</span>
        {props.title?
          <p className="text-center">Welcome to {props.title} page</p>:
          <p className="text-center">Welcome to our community,</p>

         }
        <hr className="welcome-hr"></hr>
      </div>
  );
};

export default Welcome;
      