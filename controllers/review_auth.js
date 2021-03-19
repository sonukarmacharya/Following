const db = require("../DB/db_connection");
const jwt = require("jsonwebtoken");

module.exports = {
  reviewUpdate: (req, res, next) => {
    const RID = req.params;
    const body = req.body;

    db.query(
      `UPDATE review SET R_Review="${body.body}" WHERE R_ID=${RID.id}`,
      (err, result) => {
        if (err) {
          res.json({
            status: 400,
            message: "Error",
            error: err,
          });
        } else {
          res.json({
            status: 400,
            message: "Updated successfull",
            data: result,
          });
        }
      }
    );
  },

  reviewDelete: (req, res, next) => {
    const RID = req.params;
    db.query(`DELETE FROM  review  WHERE R_ID=${RID.id}`, (err, result) => {
      if (err) {
        res.json({
          status: 400,
          message: "Error",
          error: err,
        });
      } else {
        res.json({
          status: 400,
          message: "Deleted successfull",
          data: result,
        });
      }
    });
  },

  reviewInsert: (req, res, next) => {
    const body = req.body;
    let dateObj = new Date();
    let date = dateObj.toISOString().split("T")[0];
    db.query(
      `INSERT INTO review (R_Review,Co_ID,Si_ID,Inquiry_via,Date,S_ID) VALUES ("${body.review}","${body.coid}","${body.siid}","${body.inquiry}","${date}","${body.sid}")`,
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
  },

  reviewDate: (req, res, next) => {
    const CID = req.params.id;
    try {
      db.query(`SELECT R_date FROM review WHERE C_ID=${CID}`, (err, result) => {
        if (err) {
          res.json({
            status: 200,
            message: "Error",
            error: err,
          });
        } else {
          res.json({
            status: 200,
            message: "success",
            data: result,
          });
        }
      });
    } catch (e) {
      res.json({
        status: 400,
        message: "Error",
        error: e,
      });
    }
  },

  getReview: (req, res, next) => {
    const SID = req.params.id;
    try {
      db.query(`SELECT * FROM review WHERE Co_ID=${SID}`, (err, result) => {
        if (err) {
          res.json({
            status: 200,
            message: "Error",
            error: err,
          });
        } else {
          res.json({
            status: 200,
            message: "success",
            data: result,
          });
        }
      });
    } catch (e) {
      res.json({
        status: 400,
        message: "Error",
        error: e,
      });
    }
  },

  getReviewComp: (req, res, next) => {
    const COID = req.params.coid;
    const SID = req.params.siid;
    console.log("sid", SID, "coid", COID);
    try {
      db.query(
        `SELECT review.*,sectorwise_industry.Si_Name FROM review
      INNER JOIN sectorwise_industry ON sectorwise_industry.Si_ID=review.Si_ID 
      WHERE review.S_ID='${SID}' AND review.Co_ID=${COID}`,
        (err, result) => {
          if (err) {
            res.json({
              status: 200,
              message: "Error",
              error: err,
            });
          } else {
            res.json({
              status: 200,
              message: "success",
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

  countReviewTable: (req, res, next) => {
    try {
      db.query(
        `SELECT COUNT(*) AS TOTAL,Date FROM review WHERE S_id=${req.params.id} GROUP BY Date`,
        (err, result) => {
          console.log("rv", result);
          if (err) {
            res.json({
              status: 200,
              message: "Error",
              error: err,
            });
          } else {
            res.json({
              status: 200,
              message: "success",
              data: result,
            });
          }
        }
      );
    } catch (error) {
      res.json({
        status: 400,
        message: "Error",
        error: e,
      });
    }
  },
  countReview: (req, res, next) => {
    try {
      db.query(
        `SELECT COUNT(*) AS TOTAL FROM review WHERE S_id=${req.params.id}`,
        (err, result) => {
          console.log("rv", result);
          if (err) {
            res.json({
              status: 200,
              message: "Error",
              error: err,
            });
          } else {
            res.json({
              status: 200,
              message: "success",
              data: result,
            });
          }
        }
      );
    } catch (error) {
      res.json({
        status: 400,
        message: "Error",
        error: e,
      });
    }
  },
};
