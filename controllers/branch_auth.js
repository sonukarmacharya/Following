const db = require("../DB/db_connection");
const jwt = require("jsonwebtoken");

module.exports = {
    getBranch:(req,res,next)=>{
        db.query(`SELECT * FROM branchonly`,(err,result)=>{
            if(err){
                res.json({
                    status:400,
                    message:"Error",
                    err:err
                })
            }else{
                res.json({
                    status:200,
                    message:"Success",
                    data:result
                })
            }
        })
    },
    postBranch:(req,res,next)=>{
        const body = req.body
        console.log(body)
        db.query(`INSERT INTO branch(B_name,C_Id,A_Id,S_Id,B_province) VALUES ("${body.bname}","${body.cid}","${body.aid}","${body.sid}","${body.province}")`,(err,result)=>{
            if(err){
                res.json({
                    status:400,
                    message:"Error",
                    err:err
                })
                console.log(err)
            }else{
                res.json({
                    status:200,
                    message:"Success",
                    data:result
                })
            }
        })
    },
    postBranchOnly:(req,res,next)=>{
        const body = req.body
        console.log(body)
        db.query(`INSERT INTO branchonly(B_name) VALUES ("${body.name}")`,(err,result)=>{
            if(err){
                res.json({
                    status:400,
                    message:"Error",
                    err:err
                })
                console.log(err)
            }else{
                res.json({
                    status:200,
                    message:"Success",
                    data:result
                })
            }
        })
    }
}