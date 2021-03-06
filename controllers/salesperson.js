const db = require("../DB/db_connection");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");

module.exports = {
  getSalesperson: (req, res, next) => {
    try {
      db.query(`SELECT * FROM salesperson`, (err, result) => {
        res.json({
          status: 200,
          message: "Success",
          data: result,
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

  getSalespersonById: (req, res, next) => {
    try {
      db.query(
        `SELECT * FROM salesperson WHERE S_ID='${req.params.id}'`,
        (err, result) => {
          res.json({
            status: 200,
            message: "Success",
            data: result,
          });
        }
      );
    } catch (e) {
      res.json({
        status: 400,
        message: "Error",
        error: e,
      });
    }
  },

  postSalesperson: (req, res, next) => {
    const data = req.body;
    var storage = multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, __basedir + "/public/Sales/");
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
      if (err) {
        console.log("in");
        res.json({ status: 400, message: err });
      } else {
        const data = req.body;
        db.query(
          `SELECT * FROM salesperson WHERE S_username="${data.username}" `,
          (err, resultAdmin) => {
            console.log(">>>");
            if (resultAdmin == "") {
              bcrypt.hash(data.password, 10, (err, hash) => {
                console.log("pp", req.file);
                db.query(
                  `INSERT INTO salesperson(S_Image,S_Username,S_Password,S_Address,S_Email,A_ID) VALUES("${req.file.filename}","${data.username}","${hash}","${data.address}","${data.email}","${data.aid}")`,
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

  deleteSalesperson: (req, res, next) => {
    const data = req.params;

    try {
      db.query(
        `DELETE FROM salesperson WHERE S_ID=${data.id}`,
        (err, result) => {
          console.log("del");
          if (err) {
            res.json({
              status: 400,
              message: "error deleting",
              error: err,
            });
          } else {
            res.json({
              status: 200,
              message: "deleted successfully",
              data: result,
            });
          }
        }
      );
    } catch (e) {
      res.json({
        status: 400,
        message: "Error",
        error: e,
      });
    }
  },

  countSalesperson: (req, res, next) => {
    try {
      db.query(`SELECT COUNT(*) FROM salesperson`, (err, result) => {
        res.json({
          status: 400,
          message: "Count successfull",
          data: result,
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

  updateSalesperson:(req,res,next)=>{
    const data = req.body
    try {
      db.query(`UPDATE salesperson SET S_Username='${data.username}',S_Address='${data.address}',S_Email='${data.email}',A_ID='${data.aid}' 
      WHERE S_ID='${req.params.id}'`,(err,result)=>{
        if(err){
          res.json({
            status:400,
            message:"Error",
            error:err
          })
        }
        else{
          res.json({
            status:200,
            message:"Success",
            data:result
          })
        }
      })
    } catch (error) {
      res.json({
        status:400,
        message:"Error",
        error:error
      })
      
    }
  }
};
