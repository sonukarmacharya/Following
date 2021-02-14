const db = require("../DB/db_connection");
module.exports = {
 
  postProducts: (req, res, next) => {
    const data = req.body
 
    try {
      db.query(`INSERT INTO master_product(P_ID,Co_ID,Si_ID,Quantity,S_ID) VALUES("${data.pid}","${data.coid}","${data.siid}","${data.quantity}","${data.sid}")`,(err,result)=>{
        if(err){
          res.json({
            status:400,
            message:"error inserrting",
            error:err
          })
        }
        else{
          res.json({
            status:200,
            message:"Inserted successfully",
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

 deleteProducts: (req, res, next) => {
    const data = req.params
 
    try {
      db.query(`DELETE FROM products WHERE P_Id=${data.id}`,(err,result)=>{
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

  lowQuantity:(req,res,next)=>{
    try{
      db.query(`SELECT * FROM products WHERE P_quantity<=2`,(err,result)=>{
        res.json({
          status: 200,
          message: "LowQuantity Products",
          data: result,
        })
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
  
  countProduct:(req,res,next) =>{
    try{
      db.query(`SELECT COUNT(*) FROM products`,(err,result)=>{
        const data = result
        res.json({
          status: 400,
          message: "Count successfull",
          data: data,
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

  

};
