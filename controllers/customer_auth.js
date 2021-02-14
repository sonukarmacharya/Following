const db = require("../DB/db_connection");
const jwt = require("jsonwebtoken");

module.exports = {
  customers:(req,res,next)=>{
    
    try {
      db.query(`SELECT * FROM customers`, (err, resultAdmin) => {
       
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
  getCustomers: (req, res, next) => {
    const data = req.params
  
    try {
      db.query(`SELECT * FROM customers WHERE C_Id=${data.id}`, (err, resultAdmin) => {
       
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
  
  postCustomers: (req, res, next) => {
    const data = req.body
    
    try {
      db.query(`INSERT INTO customers(C_name,C_address,C_email,C_phno,C_province,A_Id) VALUES("${data.name}","${data.address}","${data.email}","${data.phno}","${data.province}","${data.aid}")`,(err,result)=>{
        if(err){
          res.json({
            status:200,
            message:"Error",
            err:err
          })  
          
        }
        else{
        //  db.query(`INSERT INTO branch(B_name,)`)
          res.json({
            status:200,
            message:"success",
            data:result
          })
        }
      })
      
    } catch (e) {
      res.json({
        status: 400,
        message: "Error",
        error: e,
      });
    }
  },

  deleteCustomers: (req, res, next) => {
    const data = req.params
    
    try {
      db.query(`DELETE FROM customers WHERE C_Id=${data.id}`,(err,result)=>{
        if(err){
          res.json({
            status:400,
            message:"error deleting",
            error:err
          })
        }
        else{
          res.json({
            status:200,
            message:"deleted successfully",
            data:result
          })
        }
      })
      
    } catch (e) {
      res.json({
        status: 400,
        message: "Error",
        error: e,
      });
    }
  },

  countCustomers:(req,res,next) =>{
    try{
      db.query(`SELECT COUNT(*) FROM customers`,(err,result)=>{
        res.json({
          status: 400,
          message: "Count successfull",
          data: result,
        });
      })
    }
    catch(e){
      res.json({
        status: 400,
        message: "Error",
        error: e,
      });
    }
  },

  getcustomertask:(req,res,next)=>{
    const data = req.params
    
    try {
      db.query(`SELECT T_taskassign,T_date FROM task WHERE C_Id=${data.id}`, (err, resultAdmin) => {
       
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

  assigncustomertask:(req,res,next)=>{
        const SID = req.params.id
        let dateObj = new Date();
        let date=dateObj.toISOString().split('T')[0];
        const body = req.body
        db.query(`INSERT INTO task (T_taskassign,S_Id,C_Id,A_Id,T_date) VALUES ("${body.task}","${SID}","${body.cid}","${body.aid}","${date}")`,(err,result)=>{
          if(err){
              res.json({
                  status:400,
                  message:"Error",
                  error:err
              })
          }else{
              res.json({
                  status:200,
                  message:"Inserted successfully",
                  data:result
              })
          }
      })
 
    
  },

  assignCustomerProducts:(req,res,next)=>{
        const CID = req.params.id       
        const body = req.body
        db.query(`INSERT INTO salesperson_add (S_Id,C_Id,P_Id,Sa_quantity,Sa_price,M_Id) VALUES ("${body.sid}","${CID}","${body.pid}","${body.quantity}","${body.price}","${body.mid}")`,(err,result)=>{
          if(err){
              res.json({
                  status:400,
                  message:"Error",
                  error:err
              })
          }else{
            db.query(`SELECT B_Id FROM branch WHERE C_ID=${CID}`,(err,result)=>{
              const BID = JSON.stringify(result[0].B_Id)
              
              if(err){
                res.json({
                  status:400,
                  message:"Error",
                  error:err
              })  
              }else{
                db.query(`INSERT INTO purchase_history(C_Id,P_Id,B_Id) VALUES("${CID}","${body.pid}","${BID}")`,(err,result)=>{
                  if(err){
                    res.json({
                      status:400,
                      message:"Error",
                      error:err
                  })
                  }else{
                    res.json({
                      status:200,
                      message:"Inserted successfully",
                      data:result
                  })
                  }
                })
              }
            })
             
          }
      })
    
  },

  getCustomersBranch: (req, res, next) => {
    const cid = req.params.id
    try {
      db.query(`SELECT * FROM branch WHERE C_Id=(${cid}) `, (err, resultAdmin) => {
       
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

  getCustomerOfSales:(req,res,next)=>{
    const id = req.params.id
     try {
      db.query(`SELECT * FROM customers INNER JOIN task ON customers.C_Id = task.C_ID WHERE task.S_Id=${id}`, (err, resultAdmin) => {
        
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
  }
};
