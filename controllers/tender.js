const db = require("../DB/db_connection");
module.exports = {
  postTender: (req, res, next) => {
    const data = req.body;
    let dateObj = new Date();
    let date = dateObj.toISOString().split("T")[0];
    try {
      db.query(
        `SELECT * FROM master_db WHERE Si_ID=${data.sid} AND Co_ID=${data.coid} AND  Prj_Name="${data.prjname}"`,
        (err, result) => {
          console.log(result);
          if (result == "") {
            res.json({
              status: 400,
              message: "NO projcts",
              data: result,
            });
          } else {
            console.log("not empty", result);
            const mid = JSON.stringify(result[0].M_ID);
            if (err) {
              res.json({
                status: 400,
                message: "Error",
                error: err,
              });
            } else {
              db.query(
                `INSERT INTO tender(T_Date,M_ID) VALUES('${date}','${mid}')`,
                (err, result) => {
                  if (err) {
                    res.json({
                      status: 400,
                      message: "Error",
                      error: err,
                    });
                  } else {
                    res.json({
                      status: 400,
                      message: "Success",
                      data: result,
                    });
                  }
                }
              );
            }
          }
        }
      );
    } catch (error) {
      res.json({
        status: 400,
        message: "Error",
        error: error,
      });
    }
  },

  getTender: (req, res, next) => {
    try {
      db.query(
        `SELECT tender.T_ID,master_db.M_ID,tender.T_Date,master_db.Prj_Amt,master_db.Prj_Name,
          company.Co_ID,company.Co_Name,company.Co_Landline,company.Co_Address,contact_person_department.Department_Name,contact_person_department.Cp_Name,contact_person_department.Cp_Number
           FROM master_db 
         INNER JOIN tender ON master_db.M_ID=tender.M_ID
        INNER JOIN company ON master_db.Co_ID=company.Co_ID
        INNER JOIN contact_person_department ON master_db.Co_ID=contact_person_department.Co_ID AND master_db.Si_ID=contact_person_department.Si_ID`,
        (err, result) => {
          const resu = JSON.stringify(result);
          if (err) {
            res.json({
              status: 400,
              message: "error",
              error: err,
            });
          } else {
            res.json({
              status: 200,
              message: "success",
              data: result,
            });
            // const r = []
            // result.forEach(element => {
            //     r.push(element.M_ID)
            //     console.log(r)
            // });
            //  db.query(`SELECT * FROM master_db WHERE M_ID IN (${r})`,(err,result)=>{
            //     if(err){
            //         res.json({
            //             status:400,
            //             message:"error",
            //             error:err
            //         })
            //     }
            //     else{

            //         res.json({
            //             status:200,
            //             message:"success",
            //             data:result
            //         })
            //     }
            //  })
          }
        }
      );
    } catch (error) {}
  },

  deleteTender: (req, res, next) => {
    try {
      db.query(
        `DELETE FROM tender WHERE T_ID='${req.params.id}'`,
        (err, result) => {
          if (err) {
            res.json({
              status: 400,
              message: "Error",
              error: err,
            });
          } else {
            res.json({
              status: 200,
              message: "Success",
              data: result,
            });
          }
        }
      );
    } catch (error) {
      res.json({
        status: 400,
        message: "Error",
        error: error,
      });
    }
  },
};
