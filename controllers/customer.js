const db = require("../DB/db_connection");
module.exports = {
  getCustomerByDepartment: (req, res, next) => {
    try {
      db.query(`SELECT * FROM contact_person_department`, (err, result) => {
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

  postCustomerByDepartment: (req, res, next) => {
    const body = req.body;
    try {
      db.query(
        `SELECT * FROM contact_person_department WHERE Cp_Number = '${body.number}'`,
        (err, result) => {
          console.log(result);
          if (result=="") {
            console.log(" empty");
            db.query(`INSERT INTO contact_person_department(Cp_Name,Cp_Number) VALUES ('${body.name}','${body.number}')`, (err, result) => {
              if(err){
                res.json({
                  status: 400,
                  message: "Error inserting",
                  error: err
                });
              }
              else{
               db.query(`SELECT * FROM contact_person_industry WHERE CpI_Number = '${body.inumber}'`,(err,result)=>{
                console.log(result)
                if(result==""){
                console.log("empty")
                db.query(`INSERT INTO contact_person_industry(CpI_Name,CpI_Email,CpI_Number) VALUES ('${body.iname}','${body.iemail}','${body.inumber}')`, (err, result) => {
                  if(err){
                    res.json({
                      status: 400,
                      message: "Error inserting",
                      error: err
                    });
                  }
                  else{
                    db.query(`SELECT Cp_ID FROM contact_person_department WHERE Cp_Number='${body.number}' `,(err,result)=>{
                     console.log("cpid",result)
                     const cpid=JSON.stringify(result[0].Cp_ID)
                     if(err){
                       res.json({
                         status: 400,
                         message: "Error inserting",
                         error: err
                       });
                     }
                     else{
                       db.query(`SELECT CpI_ID FROM contact_person_industry WHERE CpI_Number='${body.inumber}'`,(err,result)=>{
                          console.log("cpiid",result,body.inumber)
                          const cpiid = JSON.stringify(result[0].CpI_ID)
                          db.query(`INSERT INTO compay_contactperson(Co_ID,CpI_ID,Cp_ID) VALUES ('${body.coid}','${cpiid}','${cpid}')`,(err,result)=>{
                            if(err){
                             res.json({
                               status: 400,
                               message: "Error inserting",
                               error: err
                             });
                            }
                            else{
                             res.json({
                               status: 200,
                               message: "success inserting",
                               data:result
                             });
                            }
                          })
                       })
                     }
                    })
                  }

                })
                
              }
              else{
                console.log("not")
                res.json({
                  status:400,
                  message:"Already exist contact person industry"
                })
                
                 }
               })
              }
             });

          } else {
            console.log("  not empty");
            res.json({
              status: 400,
              message: "Already exist contact person department",
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

  getCustomerByIndustry: (req, res, next) => {
    try {
      db.query(`SELECT * FROM contact_person_industry`, (err, result) => {
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

  postCustomerByIndustry: (req, res, next) => {
    const body = req.body;
    try {
      db.query(
        `INSERT INTO contact_person_industry(CpI_Name,CpI_Email,CpI_Number) VALUES ('${body.name}','${body.email}','${body.number}')`,
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

  countCustomerByIndustry: (req, res, next) => {
    try {
      db.query(
        `SELECT COUNT(*) FROM contact_person_industry`,
        (err, result) => {
          const data = result;
          res.json({
            status: 400,
            message: "Count successfull",
            data: data,
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

  countCustomerByDepartment: (req, res, next) => {
    try {
      db.query(
        `SELECT COUNT(*) FROM contact_person_department`,
        (err, result) => {
          const data = result;
          res.json({
            status: 400,
            message: "Count successfull",
            data: data,
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

  postCustomer:(req,res,next)=>{
    const body = req.body
    try {
      db.query(`INSERT INTO contact_person_industry(CpI_Name,CpI_Email,CpI_Number,Si_ID,Co_ID) VALUES ('${body.iname}','${body.iemail}','${body.inumber}','${body.siid}','${body.coid}')`,(err,result)=>{
        if(err){
          res.json({
            status:400,
            message:"Error",
            error:err
          })
        }
        else{
          db.query(`INSERT INTO contact_person_department(Cp_Name,Cp_Number,Department_Name,Si_ID,Co_ID) VALUES ('${body.name}','${body.number}','${body.depname}','${body.siid}','${body.coid}')`,(err,result)=>{
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
        }
      })
    } catch (error) {
      
    }
  },

  getCustomer:(req,res,next)=>{
    console.log(req.params.id)
    try {
      db.query(`SELECT master_db.M_ID,sectorwise_industry.Si_ID,sectorwise_industry.Si_Name,contact_person_industry.CpI_Name,contact_person_industry.CpI_Number,contact_person_department.Department_Name,contact_person_department.Cp_Name ,contact_person_department.Cp_Number FROM ((sectorwise_industry 
        INNER JOIN contact_person_industry ON sectorwise_industry.Si_ID=contact_person_industry.Si_ID)
        INNER JOIN master_db ON contact_person_industry.Co_ID=master_db.Co_ID AND contact_person_industry.Si_ID=master_db.Si_ID)
         INNER JOIN contact_person_department ON sectorwise_industry.Si_ID=contact_person_department.Si_ID WHERE contact_person_department.Co_ID=('${req.params.cid}') AND contact_person_department.Si_ID=('${req.params.siid}')`,(err,result)=>{
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

  getCustomerDepartment:(req,res,next)=>{
  
      try {
        const data = req.params
        const id1 = data.sid
        const id2 = data.coid
        db.query(`SELECT * FROM contact_person_department WHERE Si_ID='${id1}' AND Co_ID='${id2}'`,(err,result)=>{
          
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

  deleteContact:(req,res,next)=>{
    console.log("del",req.params.coid,req.params.siid)
    try {
      db.query(`DELETE FROM contact_person_department WHERE Co_ID='${req.params.coid}' AND Si_ID='${req.params.siid}'`,(err,result)=>{
        if(err){
          res.json({
            status:400,
            message:"Error",
            error:err
          })
        }
        else{
          db.query(`DELETE FROM contact_person_industry WHERE Co_ID='${req.params.coid}' AND Si_ID='${req.params.siid}'`,(err,result)=>{
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
