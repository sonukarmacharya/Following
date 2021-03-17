const db = require("../DB/db_connection");
module.exports = {
  postTask: (req, res, next) => {
    const body = req.body;
    let dateObj = new Date();
    let date = dateObj.toISOString().split("T")[0];
    try {
      db.query(
        `INSERT INTO admin_assign_customers(Prj_ID,Co_ID,S_ID,A_ID,Date) VALUES ('${body.prjid}','${body.coid}','${body.sid}','${body.aid}','${date}')`,
        (err, result) => {
          if (err) {
            res.json({
              status: 400,
              message: "error inserting",
              error: err,
            });
          } else {
            res.json({
              status: 200,
              message: "succefully inserted",
              data: result,
            });
          }
        }
      );
    } catch (error) {}
  },

  getTaskCompany: (req, res, next) => {
    const body = req.params;
    console.log("params", body.id);
    try {
      db.query(
        `SELECT Co_ID,Prj_ID FROM admin_assign_customers WHERE S_ID='${body.id}'`,
        (err, result) => {
          if (err) {
            res.json({
              status: 400,
              message: "error displaying",
              error: err,
            });
          } else {
            if (result == "") {
              res.json({
                status: 400,
                message: "Empty",
              });
            } else {
              const S = [];

              result.forEach((element) => {
                S.push(element.Co_ID);
                console.log(S);
              });
              db.query(
                `SELECT company.Co_ID,company.Co_Name,company.Co_Landline,master_db.Prj_Name,master_db.Prj_Amt
                 FROM company INNER JOIN master_db ON company.Co_ID=master_db.Co_ID WHERE company.Co_ID IN (${S})`,
                (err, result) => {
                  console.log(result);
                  if (err) {
                    res.json({
                      status: 400,
                      message: "error displaying",
                      error: err,
                    });
                  } else {
                    res.json({
                      status: 200,
                      message: "succefully displaying",
                      data: result,
                    });
                  }
                }
              );
            }
          }
        }
      );
    } catch (error) {
      res.json({
        status: 400,
        message: "error",
        error: error,
      });
    }
  },

  getTaskProject: (req, res, next) => {
    const body = req.params;
    console.log("params", body.id);
    try {
      db.query(
        `SELECT Prj_ID FROM admin_assign_customers WHERE S_ID='${body.id}'`,
        (err, result) => {
          if (err) {
            res.json({
              status: 400,
              message: "error displaying",
              error: err,
            });
          } else {
            if (result == "") {
              res.json({
                status: 400,
                message: "Empty",
              });
            } else {
              const S = [];

              result.forEach((element) => {
                S.push(element.Prj_ID);
                console.log(S);
              });
              db.query(
                `SELECT Prj_Name,Prj_Amt FROM project WHERE Prj_ID IN (${S})`,
                (err, result) => {
                  if (err) {
                    res.json({
                      status: 400,
                      message: "error displaying",
                      data: result,
                    });
                  } else {
                    res.json({
                      status: 200,
                      message: "succefully displaying",
                      data: result,
                    });
                  }
                }
              );
            }
          }
        }
      );
    } catch (error) {
      res.json({
        status: 400,
        message: "error",
        error: error,
      });
    }
  },

  getTaskCustomerIn: (req, res, next) => {
    const body = req.params;
    try {
      db.query(
        `SELECT M_ID FROM admin_assign_customer WHERE S_ID='${body.id}'`,
        (err, result) => {
          const mid = JSON.stringify(result[0].M_ID);
          if (err) {
            res.json({
              status: 400,
              message: "Error displaying",
              error: err,
            });
          } else {
            db.query(
              `SELECT CpI_ID FROM master_db WHERE M_ID='${mid}'`,
              (err, result) => {
                const cpiid = JSON.stringify(result[0].CpI_ID);
                console.log("Cpiid", cpiid);
                if (err) {
                  res.json({
                    status: 400,
                    message: "Error displaying",
                    error: err,
                  });
                } else {
                  db.query(
                    `SELECT * FROM contact_person_industry WHERE CpI_ID='${cpiid}'`,
                    (err, result) => {
                      if (err) {
                        res.json({
                          status: 400,
                          message: "Error displaying",
                          error: err,
                        });
                      } else {
                        res.json({
                          status: 200,
                          message: "successfull displaying",
                          data: result,
                        });
                      }
                    }
                  );
                }
              }
            );
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

  getTaskCustomerDept: (req, res, next) => {
    const body = req.params;
    try {
      db.query(
        `SELECT M_ID FROM admin_assign_customer WHERE S_ID='${body.id}'`,
        (err, result) => {
          const mid = JSON.stringify(result[0].M_ID);
          if (err) {
            res.json({
              status: 400,
              message: "Error displaying",
              error: err,
            });
          } else {
            db.query(
              `SELECT Cp_ID FROM master_db WHERE M_ID='${mid}'`,
              (err, result) => {
                const cpid = JSON.stringify(result[0].Cp_ID);
                console.log("Cpiid", cpid);
                if (err) {
                  res.json({
                    status: 400,
                    message: "Error displaying",
                    error: err,
                  });
                } else {
                  db.query(
                    `SELECT * FROM contact_person_department WHERE Cp_ID='${cpid}'`,
                    (err, result) => {
                      if (err) {
                        res.json({
                          status: 400,
                          message: "Error displaying",
                          error: err,
                        });
                      } else {
                        res.json({
                          status: 200,
                          message: "successfull displaying",
                          data: result,
                        });
                      }
                    }
                  );
                }
              }
            );
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

  getTodayTask: (req, res, next) => {
    const body = req.params;
    let dateObj = new Date();
    let date = dateObj.toISOString().split("T")[0];
    console.log(body.id, date);
    try {
      db.query(
        `SELECT COUNT(*) as total FROM admin_assign_customers WHERE S_ID='${body.id}' AND Date='${date}'`,
        (err, result) => {
          console.log(result);
          if (err) {
            res.json({
              status: 400,
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
        error: error,
      });
    }
  },

  getTask: (req, res, next) => {
    try {
      db.query(
        `SELECT company.Co_ID,company.Co_Name,company.Co_Landline,project.Prj_ID,
          project.Prj_Name,project.Prj_Amt FROM admin_assign_customers
          INNER JOIN company ON company.Co_ID=admin_assign_customers.Co_ID
          INNER JOIN project ON project.Prj_ID=admin_assign_customers.Prj_ID
           WHERE admin_assign_customers.S_ID='${req.params.id}'`,
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

  deleteAsgTask: (req, res, next) => {
    console.log(req.params.coid, req.params.prjid, req.params.sid);
    try {
      db.query(
        `DELETE FROM admin_assign_customers WHERE Co_ID='${req.params.coid}' AND
          Prj_ID='${req.params.prjid}' AND S_ID='${req.params.sid}'`,
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

  countAsgTable: (req, res, next) => {
    try {
      db.query(
        `SELECT COUNT(*) AS TOTAL,Date FROM admin_assign_customers WHERE S_id=${req.params.id} GROUP BY Date`,
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
  countAsg: (req, res, next) => {
    try {
      db.query(
        `SELECT COUNT(*) AS TOTAL FROM admin_assign_customers WHERE S_id=${req.params.id} `,
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
