const db = require("../DB/db_connection");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
const multer = require("multer");
const path = require("path");

module.exports = {
  getAdmin: (req, res, next) => {
    const id = req.params.id
    
    try {
      db.query(`SELECT * FROM admin WHERE A_ID=${id}`, (err, resultAdmin) => {
      
        res.json({
          status: 200,
          message: "Success",
          data: resultAdmin,
        });
      });
    } catch (e) {
      res.json({
        status: 400,
        message: "Error",
        error: e,
      });
    }
  },

  postAdmin: (req, res, next) => {
    const data = res.body;
    var storage = multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null,  __basedir +'/public/Admin');
      },
      filename: function (req, file, cb) {
        cb(
          null,
          file.fieldname +
            "-" +
            "" +
            Date.now() +
            "" +
            path.extname(file.originalname)
        );
      },
    });

    var upload = multer({
      storage: storage,
      fileFilter: (req, file, cb) => {
        const filetype = /jpeg|jpg|png|gif|zip|pdf/;
        const extname = filetype.test(
          path.extname(file.originalname).toLowerCase()
        );
        if (extname) {
          return cb(null, true);
        } else {
          cb("Error:Images or zip or pdf files only");
        }
      },
    }).single("image");
    upload(req, res, (err) => {
      console.log("in")
      if (err) {
        res.json({ status: 400, message: err });
      } else {
        const data = req.body
        db.query(
          `SELECT * FROM admin WHERE A_username="${data.username}" `,
          (err, resultAdmin) => {
            // console.log(resultAdmin)
            if (resultAdmin == "") {
              bcrypt.hash(data.password, 10, (err, hash) => {
                console.log("pp",req.file.destination);
                db.query(
                  `INSERT INTO admin(A_Image,A_Username,A_Password,A_Address,A_Email) VALUES("${req.file.filename}","${data.username}","${hash}","${data.address}","${data.email}")`,
                  (err, result) => {
                    if (err) {
                      res.json({
                        status: 400,
                        message: "error inserrting",
                        error: err,
                      });
                    } else {
                      res.json({
                        status: 200,
                        message: "Inserted successfully",
                        data: result,
                      });
                    }
                  }
                );
              });
            } else {
              res.json({
                status: 200,
                message: "Username exist",
                data: resultAdmin,
              });
            }
          }
        );
      }
    });
  },

  Login: (req, res, next) => {
    const data = req.body;
    console.log(data.password);
    try {
      if (!data.username || !data.password) {
        res.json({
          status: 400,
          message: "Please enter username and password",
          data: "",
        });
      } else {
        db.query(
          `SELECT * FROM admin WHERE A_Username="${data.username}"`,
          (err, resultAdmin) => {
            console.log(">>",resultAdmin);
            if (resultAdmin == "") {
              db.query(
                `SELECT * FROM salesperson WHERE S_Username="${data.username}"`,
                (err, resultsales) => {
                  console.log(resultsales)
                  if (resultsales == "") {
                    res.json({
                      status: 200,
                      message: "username and password not match",
                      data: resultsales,
                    });
                  } 
                  else {
                    let bool = bcrypt.compare(
                      data.password,
                      resultsales[0].S_password
                    );
                
                    console.log(bool);
                    if (bool == false) {
                      res.json({
                        status: 200,
                        message: "username and password not match",
                        error: err,
                      });
                    } else {
                      const token = jwt.sign(
                        { id: resultsales[0].S_Id },
                        process.env.SECRET_KEY,
                        {
                          expiresIn: 5000,
                        }
                      );
                      res.json({
                        status: 200,
                        message: "salesperson",
                        data: resultsales,
                        token: token,
                      });
                    }
                  }
                }
              );
            }
             else {
              let bool = bcrypt.compare(
                data.password,
                resultAdmin[0].A_password
              );
              // console.log(data.password)
              console.log("<><>",bool);
              if (bool == false) {
                res.json({
                  status: 200,
                  message: "username and password not match",
                  error: err,
                });
              } else {
                const token = jwt.sign(
                  { id: resultAdmin[0].A_Id },
                  process.env.SECRET_KEY,
                  {
                    expiresIn: 5000,
                  }
                );
                res.json({
                  status: 200,
                  message: "admin",
                  data: resultAdmin,
                  token: token,
                });
              }
            }
          }
        );
      }
    } catch (e) {
      res.json({
        status: 400,
        message: "username and password not match",
        error: e,
      });
    }
  },

};
