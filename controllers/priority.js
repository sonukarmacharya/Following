const db = require("../DB/db_connection");

module.exports ={
    getPriority:(req,res,next)=>{
        try {
            db.query(`SELECT * FROM priority `,(err,result)=>{
                if(err){
                    res.json({
                        status:400,
                        Message:"error",
                        error:err
                    })
                }else{
                    res.json({
                        status:200,
                        Message:"Success",
                        data:result
                    })
                }
            })
            
        } catch (error) {
            res.json({
                status:400,
                Message:"Error",
                error:error
            })
        }
    },

    postPriority:(req,res,next)=>{
        const body = req.body
        try {
            db.query(`INSERT INTO priority(Pr_Name,Pr_Color,Pr_Days) VALUES ('${body.name}','${body.color}','${body.days}')`,(err,result)=>{
                if(err){
                    res.json({
                        status:400,
                        message:"Error inserting",
                        error:err
                    })
                }
                else{
                    res.json({
                        status:200,
                        message:"Sccessfuly inserted",
                        data:result
                    })
                }
            })
            
        } catch (error) {
            res.json({
                status:400,
                Message:"Error inserting",
                error:error
            })
        }
    },

    getPriorityComp:(req,res,next)=>{
        try {
            db.query(`SELECT priority.Pr_Color FROM priority INNER JOIN priority_company ON priority_company.Pr_ID=priority.Pr_ID
            WHERE priority_company.Co_ID='${req.params.coid}' AND priority_company.Si_ID='${req.params.siid}'`,(err,result)=>{
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