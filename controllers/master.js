const db = require("../DB/db_connection");
module.exports = {
  postMaster: (req, res, next) => {
    const data = req.body;
    let dateObj = new Date();
    let date = dateObj.toISOString().split("T")[0];
    try {
      console.log(data.coid, date);
      db.query(
        `INSERT INTO master_db(M_Date,Co_ID,Si_ID,Prj_Name,Prj_Amt) VALUES
                ('${date}','${data.coid}','${data.sid}','${data.prjname}','${data.prjamount}')`,
        (err, result) => {
          if (err) {
            console.log("Err", err);
            res.json({
              status: 400,
              message: "Error inserting",
              error: err,
            });
          } else {
            db.query(
              `INSERT INTO project (Prj_Name,Prj_Amt,Co_ID,A_ID) VALUES ('${data.prjname}','${data.prjamount}','${data.coid}','${data.aid}')`,
              (err, result) => {
                if (err) {
                  console.log(err)
                  res.json({
                    status: 400,
                    message: "error inserted",
                    error: err,
                  });
                } else {
                  res.json({
                    status: 200,
                    message: "successfully inserted",
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
        message: "Error ",
        error: error,
      });
    }
  },

  getMaster: (req, res, next) => {
    try {
      db.query(
        `SELECT master_db.M_ID,company.Co_Name ,company.Co_ID ,master_db.Prj_Name FROM master_db INNER JOIN company ON master_db.Co_ID= company.Co_ID`,
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
              message: "succesfully displayed",
              data: result,
            });
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

  getMasterProject: (req, res, next) => {
    try {
      db.query(
        `SELECT project.Prj_ID,project.Prj_Name,master_db.M_ID FROM project INNER JOIN master_db ON project.Co_ID=master_db.Co_ID WHERE project.Co_ID='${req.params.id}'`,
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
    } catch (error) {}
  },

  getMasterCustDept: (req, res, next) => {
    console.log(req.params.id);
    const id = req.params.id;
    try {
      db.query(
        `SELECT * FROM master_db WHERE Co_ID = '${id}'`,
        (err, result) => {
          if (result == "") {
            console.log("empty", result);
            res.json({
              status: 400,
              message: "Empty",
            });
          } else {
            const cpid = JSON.stringify(result[0].Cp_ID);
            console.log("not", cpid);
            if (cpid == 0) {
              res.json({
                status: 200,
                message: "Success",
                data: 0,
              });
            } else {
              db.query(
                `SELECT Cp_Name,Cp_Number FROM contact_person_department WHERE Cp_ID ='${cpid}' `,
                (err, result) => {
                  res.json({
                    status: 200,
                    message: "Success",
                    data: result,
                  });
                }
              );
            }
          }
        }
      );
    } catch (error) {
      res.json({
        status: 400,
        message: "Error",
        err: error,
      });
    }
  },

  getMasterCustIn: (req, res, next) => {
    console.log(req.params.id);
    const id = req.params.id;
    try {
      db.query(
        `SELECT * FROM master_db WHERE Co_ID = '${id}'`,
        (err, result) => {
          if (result == "") {
            console.log("empty", result);
            res.json({
              status: 400,
              message: "Empty",
            });
          } else {
            console.log("not");

            const cpiid = JSON.stringify(result[0].CpI_ID);
            db.query(
              `SELECT CpI_Name,CpI_Number FROM contact_person_industry WHERE CpI_ID='${cpiid}' `,
              (err, result) => {
                res.json({
                  status: 200,
                  message: "Success",
                  data: result,
                });
              }
            );
          }
        }
      );
    } catch (error) {
      res.json({
        status: 400,
        message: "Error",
        err: error,
      });
    }
  },

  getMasterProduct: (req, res, next) => {
    const data = req.params;
    try {
      db.query(
        `SELECT P_ID FROM master_db WHERE Co_ID='${body.id}'`,
        (err, result) => {
          if (result == "") {
            console.log("empty", result);
            res.json({
              status: 400,
              message: "Empty",
            });
          } else {
            console.log("Not empty", result);
            const pid = JSON.stringify(result[0].P_ID);
            db.query(
              `SELECT * FROM product WHERE P_ID='${pid}'`,
              (err, result) => {
                if (err) {
                  res.json({
                    status: 400,
                    message: "Error",
                    error: err,
                  });
                } else {
                  res.json({
                    message: "not empty",
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
        message: "error",
        error: error,
      });
    }
  },

  getProject:(req,res,next)=>{
    try {
      const data = req.params
      const id1 = data.sid
      const id2 = data.coid
      db.query(`SELECT * FROM master_db WHERE Si_ID='${id1}' AND Co_ID='${id2}'`,(err,result)=>{
        
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
      })    } catch (error) {
        res.json({
          status:400,
          message:"Error",
          error:err
        })
      
    }
  },

  getProjectCount:(req,res,next)=>{
    try {
      db.query(`SELECT COUNT(*) AS total FROM master_db WHERE Co_ID='${req.params.coid}' AND Si_ID='${req.params.siid}'`,(err,result)=>{
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
  },

  postMasterProuct:(req,res,next)=>{
    const body=req.body
    console.log("p>",body)
    try {
      db.query(`INSERT INTO master_product(P_ID,Co_ID,Si_ID,Quantity,Price,S_ID) VALUES ('${body.pid}','${body.coid}','${body.siid}','${body.quantity}','${body.price}','${body.sid}')`,(err,result)=>{
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
  },

  getPurchaseHistory:(req,res,next)=>{
    console.log(req.params.coid,req.params.siid)
    try {
      db.query(`SELECT master_product.Mp_ID,product.P_ID,product.P_Name,product.P_Model,master_product.Quantity,master_product.Price FROM master_product
       INNER JOIN product ON product.P_ID=master_product.P_ID
      WHERE master_product.Co_ID='${req.params.coid}' AND master_product.Si_ID='${req.params.siid}'`,(err,result)=>{
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
  },

  deletePurchaseHistory:(req,res,next)=>{
    console.log(req.params.id)
    try {
      db.query(`DELETE FROM master_product WHERE Mp_ID='${req.params.id}'`,(err,result)=>{
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
