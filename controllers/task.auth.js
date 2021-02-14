const db = require("../DB/db_connection");
module.exports = {

    getTaskdate:(req,res,next)=>{
        console.log(req.params.id)
        db.query(`SELECT T_date FROM task WHERE C_Id=('${req.params.id}')`,(err,result)=>{
            if(err){
                res.json({
                    status:400,
                    message:"Error",
                    eerr:err
                })
            }else{
                res.json({
                    status:200,
                    message:"success",
                    data:result
                })
            }
        })
    }
}
