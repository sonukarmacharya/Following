const db = require("../DB/db_connection");
module.exports = {
    getProducts: (req, res, next) => {
        try {
            db.query(`SELECT * FROM product`, (err, result) => {
             
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
    
    postProducts: (req, res, next) => {
        const data = req.body
     
        try {
          db.query(`INSERT INTO product(P_Name,P_Model,P_Quantity,P_Price,A_ID) VALUES("${data.name}","${data.model}","${data.quantity}","${data.price}","${data.aid}")`,(err,result)=>{
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

      lowQuantity:(req,res,next)=>{
        try{
          db.query(`SELECT * FROM product WHERE P_Quantity<=20`,(err,result)=>{
            res.json({
              status: 200,
              message: "Low Quantity Products",
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
          db.query(`SELECT COUNT(*) FROM product`,(err,result)=>{
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

      productQuantity:(req,res,next)=>{
        try {
          db.query(`SELECT * FROM product WHERE P_ID='${req.params.id}'`,(err,result)=>{
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
                message:"success",
                data:result
              })
            }
          })
        } catch (error) {
          res.json({
            status:400,
            message:"error",
            err:error
          })
        }
      },

      updateProduct:(req,res,next)=>{
        const data= req.body
        console.log(data)
        try {
          db.query(`UPDATE product SET P_Name="${data.name}",P_Model= "${data.model}",P_Quantity="${data.quantity}",P_Price="${data.price}"
          WHERE P_ID='${req.params.id}'`,(err,result)=>{
            if(err){
              res.json({
                status: 400,
                message: "Error",
                error: err,
              });
            }
            else{
              res.json({
                status: 200,
                message: "Success",
               data:result,
              });
            }
          })
        } catch (error) {
          res.json({
            status: 400,
            message: "Error",
            error: error,
          });
        }
      },

      deleteProduct:(req,res,next)=>{
        try {
          db.query(`DELETE FROM product WHERE P_ID='${req.params.id}'`,(err,result)=>{
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
}