const db = require("../DB/db_connection");
module.exports = {
    getBestSalesPerson:(req,res,next) =>{
        try{
            db.query(` Select S_Id, count(*) as coun from dealing group by C_Id having  coun>=10 order by coun desc`,(err,result)=>{

              if(err){
                res.json({
                    status:400,
                    message:"Error",
                    error:err
                })
               }else{
                const S=[]
              
                result.forEach(element=>{
                    S.push(element.S_Id)
                    })
                    
                   db.query(`SELECT S_username FROM salesperson WHERE S_ID IN (${S}) `,(err,result)=>{
                    res.json({
                        status:200,
                        message:"Success",
                        data:result
                    })
                  })
                   
                }
               
                })
        }
        catch(e){
            res.json({
                status:400,
                message:"Error",
                error:e
            })
        }
    },
    getsalespersontask:(req,res,next)=>{
        const data = req.params
      
        try {
          db.query(`SELECT T_taskassign,T_date,customers.C_name FROM task INNER JOIN customers ON customers.C_Id=task.C_Id WHERE task.S_Id=${data.id}`, (err, resultAdmin) => {
         
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
      getSalespersonById: (req, res, next) => {
        const sid = req.params.id
        try {
          db.query(`SELECT * FROM salesperson WHERE S_Id=(${sid}) `, (err, resultAdmin) => {
        
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
    
      getSalespersonBranch: (req, res, next) => {
        const sid = req.params.id
        try {
          db.query(`SELECT * FROM branch WHERE S_Id=(${sid}) `, (err, resultAdmin) => {
           
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
    
    
  };