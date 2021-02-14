const db = require("../DB/db_connection");

module.exports={
    getAllTodayInquiry:(req,res,next)=>{
        const SID = req.params.id
       
        let dateObj = new Date();
        let date =dateObj.toISOString().split('T')[0];
         date = date.toString();
    
              
        db.query(`SELECT * FROM task WHERE S_Id = ${SID} AND T_date="${date}" `,(err,result)=>{
          
            if(err){
                res.json({
                    status:200,
                    message:"Error",
                    error:err
                })
            }else{
                const S=[]
              
                result.forEach(element=>{
                    S.push(element.C_Id)
                    })
                
                   db.query(`SELECT C_name FROM customers WHERE C_Id IN (${S}) `,(err,result)=>{
                
                    res.json({
                        status:200,
                        message:"Success",
                        data:{result,date} 
                    })
                  })
               
               
            }
        })
    },
    
    getTodayInquiry:(req,res,next)=>{
        const SID = req.params.id
    
        let dateObj = new Date();
        let date =dateObj.toISOString().split('T')[0];
         date = date.toString();

              
        db.query(`SELECT COUNT(*) FROM dealing WHERE S_Id = ${SID} AND De_date="${date}" `,(err,result)=>{
     
            if(err){
                res.json({
                    status:200,
                    message:"Error",
                    error:err
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
    
    upcomingInquiry:(req,res,next)=>{
        const SID = req.params.id
      
        let dateObj = new Date();
        let date =dateObj.toISOString().split('T')[0];
         date = date.toString();
    
              
        db.query(`SELECT T_date, C_name FROM task INNER JOIN customers ON task.C_Id=customers.C_Id WHERE T_date="${date}" `,(err,result)=>{
         
            if(err){
                res.json({
                    status:200,
                    message:"Error",
                    error:err
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
    upcomingInquiryOfASales:(req,res,next)=>{
        const SID = req.params.id
    
        let dateObj = new Date();
        let date =dateObj.toISOString().split('T')[0];
         date = date.toString();

              
        db.query(`SELECT T_date, C_name FROM task INNER JOIN customers ON task.C_Id=customers.C_Id WHERE S_Id=${SID} AND T_date="${date}" `,(err,result)=>{
         
            if(err){
                res.json({
                    status:200,
                    message:"Error",
                    error:err
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

    getTodayInquiryCustomers:(req,res,next)=>{
        const SID = req.params.id

        let dateObj = new Date();
        let date =dateObj.toISOString().split('T')[0];
         date = date.toString();
        db.query(`SELECT * FROM dealing INNER JOIN  customers ON dealing.C_Id=customers.C_Id WHERE dealing.De_date<"${date}" `,(err,result)=>{
     
            if(err){
                res.json({
                    status:200,
                    message:"Error",
                    error:err
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

    getinquiryDoneToday:(req,res,next)=>{
        const SID = req.params.id
    
        let dateObj = new Date();
        let date =dateObj.toISOString().split('T')[0];
         date = date.toString();
 
        db.query(`SELECT * FROM dealing WHERE De_date="${date}" `,(err,result)=>{
            const data = result.length
            if(err){
                res.json({
                    status:200,
                    message:"Error",
                    error:err
                })
            }else{
                res.json({
                    status:200,
                    message:"Success",
                    data:data
                })
               
            }
        })
    },
    getinquiryToday:(req,res,next)=>{
        const SID = req.params.id
    
        let dateObj = new Date();
        let date =dateObj.toISOString().split('T')[0];
         date = date.toString();
 
                db.query(`SELECT * FROM task WHERE T_date="${date}"`,(err,result)=>{
                    const data = result.length
                    if(err){
                        res.json({
                            status:200,
                            message:"Error",
                            error:err
                        })
                    }else{
                        res.json({
                            status:200,
                            message:"success",
                            data:data
                        })
                    }
                })
               
               
            }
        
}