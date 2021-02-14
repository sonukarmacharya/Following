import React, { useEffect, useState } from "react";
import HeaderUser from "../../layouts/HeaderUser";
import { Link, useParams } from "react-router-dom";
import { Scrollbars } from 'rc-scrollbars';
import axios from "axios";
import "../../assets/sass/app.css";
import Modal from "react-modal";
Modal.setAppElement("#root");


export default function Addproduct() {
  const id = useParams();
  const [data, setdata] = useState([]);
  const [model, setModel] = useState([]);
  const [product, setProduct] = useState([]);
  const [dataform, setdataform] = useState([]);
  const [history, setHistory] = useState([]);
  const userid = localStorage.getItem("user");
  const [qty, setqty] = useState();
  const [qt, setqt] = useState("0");
  const [price, setprice] = useState(0);
  const [val, setval] = useState("");
  const [modalIsOpen, setmodalIsOpen] = useState(false);

  useEffect(async () => {
    const siid=id.siid
    const coid=id.cid
    const prod = await axios(`/auth/Displayproduct`);
    const ph= await axios(`/auth/getmasterproduct/${coid}/${siid}`)
    console.log("p>>", ph.data.data);
    setProduct(prod.data.data);
    setHistory(ph.data.data)
    
  }, []);

  let handleChange = (e) => {
    const idp = [e.target.value];
    console.log("e", { [e.target.value]: [e.target.value] });
    if ([e.target.name] == "pid") {
      axios
        .get(`/auth/DisplayproductByID/${idp}`)
        .then((data) => setqty(data.data.data));
        setdataform({
          ...dataform,[e.target.name]: e.target.value
        })
    } else if ([e.target.name] == "quantity") {
      setqt([e.target.value]);
      qty.map((q) => {
        setprice([e.target.value] * q.P_Price);
        console.log("mul", [e.target.value] * q.P_Price);
        setdataform({
          ...dataform,
          [e.target.name]: e.target.value,
          siid: id.siid,
          coid: id.cid,
          sid: userid,
          price: [e.target.value] * q.P_Price,
        });
      });
    }
  };

  let handleSubmit = (e) => {
    e.preventDefault();
    console.log(dataform, price);
    axios.post(`/auth/postmasterproduct`, dataform).then((data) => {
      alert("inserted successfully");
      setdataform();
    });
  };

  return (
    <div>
      <HeaderUser />
      <Link to={`/customersUser`}>
        <i className="back icon-left"></i>
      </Link>
      <div className="container custom">
        <div className="pad-top container custom">
          {/* {data? data.map((data) => (
                  <h2 className="text-center">{data.C_name}</h2>
                )):  <h2></h2>} */}
          <hr className="dashuser-hr" />
        </div>
        <div className="row">
          <div className="col-md-12 col-12 d-flex">
            <div className="col-md-4 col-12 mr-4">
              <h1 className="add-main-left-h1">Add Product</h1>
              <hr className="add-main-left-hr" />
              <form>
                <label className="">Product Name</label>
                <select
                  name="pid"
                  className="form-control"
                  onChange={handleChange}
                >
                  <option value="" name="pid">
                    {" "}
                  </option>
                  {product ? (
                    product.map((p) => (
                      <option value={p.P_ID} name="pid" onChange={handleChange}>
                        {p.P_Name}
                      </option>
                    ))
                  ) : (
                    <option value="" name="pid"></option>
                  )}
                </select>
                <label className="">Total Quantity Available</label>
                {qty ? (
                  qty.map((q) => <p>{q.P_Quantity}</p>)
                ) : (
                  <p>No product</p>
                )}

                <label className="">Quantity</label>
                <input
                  type="text"
                  className="form-control"
                  name="quantity"
                  onChange={handleChange}
                />
                <label className="">Price</label>
                {qty ? (
                  qty.map((q) => (
                    <input
                      type="text"
                      className="form-control"
                      name="price"
                      value={q.P_Price * qt}
                      onChange={handleChange}
                    />
                  ))
                ) : (
                  <p>No product</p>
                )}
                <label className="">Model</label>
                <select className="form-control">
                  <option value=""> </option>
                  {qty ? (
                    qty.map((p) => <option value={p.P_ID}>{p.P_Model}</option>)
                  ) : (
                    <option value="" name="product"></option>
                  )}
                </select>
                <input
                  type="submit"
                  value="Submit"
                  className="btn btn-primary btn-block mt-3"
                  onClick={handleSubmit}
                />
              </form>
            </div>
            <div className="col-md-7 col-12 bg-light ml-5">
              <div className="p-4">
                <h1 className="add-main-right-lists-h1">Purchase history</h1>
                <div className="add-main-right-lists-table">
                    <Scrollbars style={{height: 400 }}>
                  <table className="table table-hover">
                    <thead class="thead-dark">
                      <tr>
                        <th scope="col">Product Name</th>
                        <th scope="col">Model</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Price</th>
                        <th scope="col">Delete</th>
                      </tr>
                     </thead>
                    <tbody>
                      {history &&
                        history.map((history) => (
                          <tr>
                            <td className="table-body-cell">
                              {history.P_Name}
                            </td>
                            <td className="table-body-cell">
                              {history.P_Model}
                            </td>
                            <td className="table-body-cell">
                              {history.Quantity}
                            </td>
                            <td className="table-body-cell">
                              {history.Price}
                            </td>
                           <td>
                           <i
                              className="reviewhistory-icondelete icon-delete"
                              onClick={() => setmodalIsOpen(true)}
                            ></i>
                            <Modal
                              isOpen={modalIsOpen}
                              style={{
                                content: {
                                  top: "100px",
                                  left: "400px",
                                  width: "300px",
                                  height: "200px",
                                },
                              }}
                            >
                              Are you sure you want to delete??
                              <br />
                              <button
                                onClick={() => {
                                  console.log(history.Mp_ID)
                                axios.delete(`/auth/DeletePurchase/${history.Mp_ID}`);
                                window.location.reload()
                                  setmodalIsOpen(false);
                                }}
                              >
                                ok
                              </button>
                              <button onClick={() => setmodalIsOpen(false)}>
                                cancel
                              </button>
                            </Modal>
                           </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                        </Scrollbars>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
