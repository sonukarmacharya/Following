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
    db.query(
      `SELECT * FROM salesperson WHERE S_username="${data.username}" `,
      (err, resultAdmin) => {
        console.log(">>>");
        if (resultAdmin == "") {
          bcrypt.hash(data.password, 10, (err, hash) => {
            console.log("pp", req.file);
            db.query(
              `INSERT INTO salesperson(S_Username,S_Password,S_Address,S_Email,A_ID) VALUES("${data.username}","${hash}","${data.address}","${data.email}","${data.aid}")`,
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

  updateSalesperson: (req, res, next) => {
    const data = req.body;
    console.log("edit", data, req.params.sid, req.params.aid);
    try {
      db.query(
        `UPDATE salesperson SET S_Username='${data.username}',S_Address='${data.address}',S_Email='${data.email}',A_ID='${req.params.aid}' 
      WHERE S_ID='${req.params.sid}'`,
        (err, result) => {
          if (err) {
            res.json({
              status: 400,
              message: "Error",
              error: err,
            });
          } else {
            res.json({
              status: 200,
              message: "Success",
              data: result,
            });
          }
        }
      );
    } catch (error) {
      res.json({
        status: 400,
        message: "Error",
        error: error,
      });
    }
  },
};
