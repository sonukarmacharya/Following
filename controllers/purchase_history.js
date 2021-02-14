const db = require("../DB/db_connection");
module.exports = {
    getPurchaseHistoryProduct: (req, res, next) => {
        const CID =req.params.id
        
        try {
          db.query(`SELECT * FROM purchase_history WHERE C_ID=${CID}`, (err, result) => {
    
        if(err){console.log(err)}
        else{
          const P=[]
              
          result.forEach(element=>{
              P.push(element.P_Id)
              })
            
     
              db.query(`SELECT * FROM products WHERE P_Id IN (${P})`,(err,result)=>{
                res.json(
             {
              status:200,
              message:"success",   
               data:result}
            );
          })
        
        
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

      getPurchaseHistoryBranch: (req, res, next) => {
        const CID =req.params.id
     
        try {
          db.query(`SELECT * FROM purchase_history WHERE C_ID=${CID}`, (err, result) => {
    
        if(err){console.log(err)}
        else{
          const B=[]
              
          result.forEach(element=>{
              B.push(element.B_Id)
              })
               console.log(B)
     
              db.query(`SELECT * FROM branch WHERE B_Id IN (${B})`,(err,result)=>{
                res.json(
             {
              status:200,
              message:"success",   
               data:result}
            );
          })
        
        
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


}