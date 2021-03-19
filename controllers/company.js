const db = require("../DB/db_connection");
module.exports = {
  getCompany: (req, res, next) => {
    try {
      db.query(
        `SELECT company.Co_ID,company.Co_Name,company.Co_District,company.Co_Landline,company.Co_Address,sectorwise_industry.Si_Name,sectorwise_industry.Si_ID FROM 
        company INNER JOIN sectorwise_industry ON sectorwise_industry.Co_ID=company.Co_ID `,
        (err, result) => {
          if (err) {
            res.json({
              status: 400,
              message: "Error displaying company",
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
        error: e,
      });
    }
  },

  getCompanyByID: (req, res, next) => {
    try {
      db.query(
        `SELECT * FROM company WHERE Co_ID='${req.params.id}'`,
        (err, result) => {
          if (err) {
            res.json({
              status: 400,
              message: "Error displaying company",
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
        error: e,
      });
    }
  },

  getIndustryByID: (req, res, next) => {
    try {
      db.query(
        `SELECT * FROM sectorwise_industry WHERE Co_ID='${req.params.id}'`,
        (err, result) => {
          if (result == " ") {
            res.json({
              status: 400,
              message: "Error displaying company",
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
        error: e,
      });
    }
  },

  getProjectByID: (req, res, next) => {
    try {
      db.query(
        `SELECT * FROM project WHERE Co_ID='${req.params.id}'`,
        (err, result) => {
          if (result == " ") {
            res.json({
              status: 400,
              message: "Error displaying company",
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
        error: e,
      });
    }
  },

  postCompany: (req, res, next) => {
    const body = req.body;
    try {
      db.query(
        `INSERT INTO company(Co_Name,Co_District,Co_Landline,Co_Address) VALUES ('${body.name}','${body.district}','${body.landline}','${body.address}')`,
        (err, result) => {
          if (err) {
            res.json({
              status: 400,
              message: "Error displaying company",
              error: err,
            });
          } else {
            db.query(
              `SELECT Co_ID FROM company WHERE Co_Name='${body.name}'`,
              (err, result) => {
                const coid = JSON.stringify(result[0].Co_ID);
                console.log(coid);
                if (err) {
                  res.json({
                    status: 400,
                    message: "Error displaying company",
                    error: err,
                  });
                } else {
                  db.query(
                    `INSERT INTO sectorwise_industry(Si_Name,Co_ID) VALUES ('${body.iname}','${coid}')`,
                    (err, result) => {
                      if (err) {
                        res.json({
                          status: 400,
                          message: "Error displaying company",
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
        error: e,
      });
    }
  },

  postIndustry: (req, res, next) => {
    const body = req.body;
    try {
      db.query(
        `INSERT INTO sectorwise_industry(Si_Name,Co_ID) VALUES ('${body.name}','${body.coid}')`,
        (err, result) => {
          if (err) {
            res.json({
              status: 400,
              message: "Error inserting industry",
              error: err,
            });
          } else {
            res.json({
              status: 200,
              message: "successfully inserted industry",
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

  postPriority: (req, res, next) => {
    const body = req.body;
    console.log("b", req.body);
    try {
      db.query(
        `INSERT INTO priority_company(Pr_ID,Co_ID,Si_ID) VALUES('${body.prid}','${req.params.cid}','${req.params.siid}')`,
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
        error: errro,
      });
    }
  },

  getPriority: (req, res, next) => {
    try {
      db.query(
        `SELECT * FROM  priority_company WHERE Co_ID='${req.params.cid}' AND Si_ID='${req.params.siid}'`,
        (err, result) => {
          if (result == "") {
            res.json({
              status: 200,
              message: "Empty",
            });
            console.log("empty", result);
          } else {
            console.log("not empty", result);
            const prid = JSON.stringify(result[0].Pr_ID);
            console.log("rr", prid);
            if (err) {
              res.json({
                status: 400,
                message: "Error",
                error: err,
              });
            } else {
              db.query(
                `SELECT * FROM priority WHERE Pr_ID=('${prid}')`,
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
            }
          }
        }
      );
    } catch (error) {
      res.json({
        status: 400,
        message: "error",
        erro: error,
      });
    }
  },
  getDepartment: (req, res, next) => {
    const data = req.params;
    const id1 = data.sid;
    const id2 = data.coid;
    db.query(
      `SELECT * FROM contact_person_department WHERE Si_ID='${id1}' AND Co_ID='${id2}'`,
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

  getCompanyByMaster: (req, res, next) => {
    try {
      db.query(`SELECT * FROM master_db`, (err, result) => {
        if (err) {
          res.json({
            status: 400,
            message: "error",
            error: err,
          });
        } else {
          console.log(result);
          const S = [];
          result.forEach((element) => {
            S.push(element.Co_Id);
            console.log(S);
          });
          //  db.query(`SELECT * FROM company WHERE Co_ID IN (${S})`,(err,result)=>{
          //   if(err){
          //     res.json({
          //       status:400,
          //       message:"error",
          //       error:err
          //     })
          //   }
          //   else{

          //     res.json({
          //       status:200,
          //       message:"success",
          //       data:result

          //    })
          //   }
          //  })
        }
      });
    } catch (error) {
      res.json({
        status: 400,
        message: "error",
        error: error,
      });
    }
  },

  getIndustryBySID: (req, res, next) => {
    try {
      db.query(
        `SELECT * FROM sectorwise_industry WHERE Si_ID='${req.params.id}'`,
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
              message: "Sucess",
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

  updateCompany: (req, res, next) => {
    const data = req.body;
    try {
      db.query(
        `UPDATE company SET Co_Name='${data.coname}',Co_District='${data.district}',Co_Landline='${data.landline}',
        Co_Address='${data.address}' WHERE Co_ID='${req.params.id}'`,
        (err, result) => {
          if (err) {
            res.json({
              status: 400,
              message: "Error",
              error: err,
            });
          } else {
            db.query(
              `UPDATE sectorwise_industry SET Si_Name='${data.siname}' WHERE Co_ID='${req.params.id}'`,
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

  deleteCompany: (req, res, next) => {
    console.log(req.params.id);
    try {
      db.query(
        `DELETE FROM sectorwise_industry WHERE Si_ID='${req.params.sid}'`,
        (err, result) => {
          if (err) {
            res.json({
              status: 400,
              message: "Error",
              error: err,
            });
          } else {
            db.query(
              `DELETE FROM company WHERE Co_ID='${req.params.cid}'`,
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
                    message: "Success",
                    data: result,
                  });
                }
              }
            );
          }
        }
      );
    } catch (error) {
      res.json({
        status: 400,
        message: "Success",
        error: error,
      });
    }
  },

  deletePriority: (req, res, next) => {
    console.log("herer>>", req.params.cid, req.params.siid);
    try {
      db.query(
        `DELETE FROM priority_company WHERE 
      Co_ID='${req.params.cid}' AND Si_ID='${req.params.siid}'`,
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
