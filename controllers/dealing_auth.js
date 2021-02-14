const db = require("../DB/db_connection");

module.exports ={
    InsertDeal:(req,res,next)=>{
        const body = req.body
        const CID = req.params
      
        let dateObj = new Date();
      let date=dateObj.toISOString().split('T')[0];
    
        db.query(`INSERT INTO dealing (S_Id,C_Id,Pr_Id,Inquiry,R_Id,De_dealStatus,De_date) VALUES ("${body.sid}","${body.cid}","${body.prid}","${body.inquiry}","${body.rid}","${body.dealstatus}","${date}")`,(err,result)=>{
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

    getDealSalesPerson:(req,res,next) =>{
        const CID = req.body.CID
        try{
            db.query(`SELECT * FROM dealing WHERE C_ID=${CID}`,(err,result)=>{
                
            if(err){
                res.json({
                    status: 200,
                    message: "Error",
                    error: err,
                  });
            }else{
                const S=[]
              
                result.forEach(element=>{
                    S.push(element.S_Id)
                    })
                    
           
                    db.query(`SELECT * FROM salesperson WHERE S_Id IN (${S})`,(err,result)=>{
                      res.json(
                   {
                    status:200,
                    message:"success",   
                     data:result}
                  );
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

    getDealPriority:(req,res,next) =>{
        const CID = req.body.CID
        try{
            db.query(`SELECT * FROM dealing WHERE C_ID=${CID}`,(err,result)=>{
                
            if(err){
                res.json({
                    status: 200,
                    message: "Error",
                    error: err,
                  });
            }else{
                const Pr=[]
              
                 result.forEach(element=>{
                     Pr.push(element.Pr_Id)
                     })
                     
            
                     db.query(`SELECT * FROM priority WHERE Pr_Id IN (${Pr})`,(err,result)=>{
                       res.json(
                    {
                     status:200,
                     message:"success",   
                      data:result}
                   );
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

    getDealCustomerDetail:(req,res,next) =>{
        const CID = req.params.id
        try{
            db.query(`SELECT * FROM dealing WHERE C_ID=${CID}`,(err,result)=>{
                
            if(err){
                res.json({
                    status: 200,
                    message: "Error",
                    error: err,
                  });
            }else{
                    res.json(
                    {
                     status:200,
                     message:"success",   
                      data:result}
                   );
                
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

    getDealCustomerreview:(req,res,next) =>{
        const CID = req.params.id
        try{
            db.query(`SELECT * FROM dealing WHERE C_ID=${CID}`,(err,result)=>{
                
            if(err){
                res.json({
                    status: 200,
                    message: "Error",
                    error: err,
                  });
            }else{
                const R=[]
              
                result.forEach(element=>{
                    R.push(element.R_Id)
                    })
                
                    db.query(`SELECT * FROM review WHERE R_Id IN (${R})`,(err,result)=>{
                      res.json(
                   {
                    status:200,
                    message:"success",   
                     data:result}
                  );
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

    getDealCustomerInquiry:(req,res,next) =>{
        const CID = req.body.CID
        try{
            db.query(`SELECT Inquiry FROM dealing WHERE C_ID=${CID}`,(err,result)=>{
                
            if(err){
                res.json({
                    status: 200,
                    message: "Error",
                    error: err,
                  });
            }else{
                    res.json(
                    {
                     status:200,
                     message:"success",   
                      data:result}
                   );
                
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

    getDealingCid:(req,res,next)=>{
        db.query(`SELECT C_Id From dealing`,(err,result)=>{
            if(err){
                res.json({
                    status:400,
                    message:"error",
                    err:err
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
    },

    getDealCustomer:(req,res,next)=>{
        db.query(`SELECT dealing.C_Id,customers.* from dealing INNER JOIN customers ON customers.C_Id=dealing.C_Id`,(err,result)=>{
           
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
    }

}