const express = require("express");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const readXlsxFile = require("read-excel-file/node");
const multer = require("multer");

const app = express();

global.__basedir = __dirname;

const router = express.Router();
const database = require("./DB/database");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("./public"));

app.use(cors());

// -> Multer Upload Storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __basedir + "/uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

// -> Express Upload RestAPIs
app.post("/api/uploadfile", upload.single("file"), (req, res) => {
  console.log("upload here", req.file);
  importExcelData2MySQL(__basedir + "/uploads/" + req.file.filename);
  res.json({
    message: "File uploaded/import successfully!",
    file: req.file,
  });
});

// -> Import Excel Data to MySQL database
function importExcelData2MySQL(filePath) {
  // File path.

  readXlsxFile(filePath, { sheet: "master database" }).then((rows) => {
    // `rows` is an array of rows
    // each row being an array of cells.

    rows.shift();

    rows.forEach((row) => {
      let data = {
        date: row[1],
        Co_name: row[2],
        codist: row[3],
        coaddress: row[4],
        colandline: row[5],
        Cpd_name: row[6],
        Cpd_num: row[7],
        dept: row[8],
        CpI_name: row[10],
        CpI_email: row[12],
        CpI_num: row[11],
        In: row[13],
        Inq: row[14],
        P_name: row[15],
        P_model: row[16],
        other: row[17],
        Priority: row[22],
        Review: row[23],
        Prj_amt1: row[19],
        Prj_name1: row[18],
        Prj_amt2: row[21],
        Prj_name2: row[20],
      };
      console.log(data.codist);

      try {
        db.query(
          `INSERT INTO company(Co_Name,Co_Address,Co_District,Co_Landline) VALUES (?,?,?,?)`,
          [data.Co_name, data.coaddress, data.codist, data.colandline],
          (err, result) => {
            if (err) {
              console.log(err);
            } else {
              db.query(
                `SELECT * FROM company WHERE Co_Name =? AND Co_Address=?`,
                [data.Co_name, data.coaddress],
                (err, result) => {
                  const coid = [];
                  result.forEach((res) => {
                    console.log(JSON.stringify(result.Co_ID));
                    coid.push(JSON.stringify(result[0].Co_ID));
                    db.query(
                      `INSERT INTO sectorwise_industry(Si_Name,Co_ID) VALUES (?,?)`,
                      [data.In, coid],
                      (err, result) => {
                        if (err) console.log("her", err);
                        else {
                          db.query(
                            `SELECT Si_ID FROM sectorwise_industry WHERE Si_Name=? AND Co_ID=?`,
                            [data.In, coid],
                            (err, result) => {
                              const sid = [];
                              result.forEach((res) => {
                                console.log(JSON.stringify(result[0].Si_ID));
                                sid.push(JSON.stringify(result[0].Si_ID));
                                if (err) console.log(err);
                                else {
                                  db.query(
                                    `INSERT INTO contact_person_industry(CpI_Name,CpI_Number,CpI_Email,Si_ID,Co_ID)
                                              VALUES (?,?,?,?,?)`,
                                    [
                                      data.CpI_name,
                                      data.CpI_num,
                                      data.CpI_email,
                                      sid,
                                      coid,
                                    ],
                                    (err, result) => {
                                      if (err) console.log(err);
                                      else {
                                        db.query(
                                          `INSERT INTO review(R_Review,Co_ID,Inquiry_via,Si_ID)
                                  VALUES(?,?,?,?)`,
                                          [data.Review, coid, data.Inq, sid],
                                          (err, result) => {
                                            if (err) console.log(err);
                                            else {
                                              db.query(
                                                `INSERT INTO product(P_Name,P_Model) VALUES(?,?)`,
                                                [data.P_name, data.P_model],
                                                (err, result) => {
                                                  if (err) {
                                                    console.log(err);
                                                  } else {
                                                    db.query(
                                                      `SELECT P_ID FROM product WHERE P_Name=? AND P_Model=?`,
                                                      [
                                                        data.P_name,
                                                        data.P_model,
                                                      ],
                                                      (err, result) => {
                                                        const pid = [];
                                                        result.forEach(
                                                          (res) => {
                                                            pid.push(
                                                              JSON.stringify(
                                                                result[0].P_ID
                                                              )
                                                            );
                                                            if (err)
                                                              console.log(err);
                                                            else {
                                                              db.query(
                                                                `INSERT INTO master_product(P_ID,Co_ID,Si_ID) VALUES(?,?,?)`,
                                                                [
                                                                  pid,
                                                                  coid,
                                                                  sid,
                                                                ],
                                                                (
                                                                  err,
                                                                  result
                                                                ) => {
                                                                  if (err) {
                                                                    console.log(
                                                                      err
                                                                    );
                                                                  } else {
                                                                    db.query(
                                                                      `INSERT INTO contact_person_department(Cp_Name,Cp_Number,Si_ID,Co_ID,Department_Name)
                                                  VALUES(?,?,?,?,?)`,
                                                                      [
                                                                        data.Cpd_name,
                                                                        data.Cpd_num,
                                                                        sid,
                                                                        coid,
                                                                        data.dept,
                                                                      ],
                                                                      (
                                                                        err,
                                                                        rsult
                                                                      ) => {
                                                                        if (
                                                                          err
                                                                        ) {
                                                                          console.log(
                                                                            err
                                                                          );
                                                                        } else {
                                                                          db.query(
                                                                            `INSERT INTO master_db(M_Date,Co_ID,Prj_Name,Prj_Amt,Si_ID) VALUES(?,?,?,?,?)`,
                                                                            [
                                                                              data.date,
                                                                              coid,
                                                                              data.Prj_name1,
                                                                              data.Prj_amt1,
                                                                              sid,
                                                                            ],
                                                                            (
                                                                              err,
                                                                              result
                                                                            ) => {
                                                                              if (
                                                                                err
                                                                              )
                                                                                console.log(
                                                                                  err
                                                                                );
                                                                              else {
                                                                                db.query(
                                                                                  `INSERT INTO master_db(M_Date,Co_ID,Prj_Name,Prj_Amt,Si_ID) VALUES(?,?,?,?,?)`,
                                                                                  [
                                                                                    data.date,
                                                                                    coid,
                                                                                    data.Prj_name2,
                                                                                    data.Prj_amt2,
                                                                                    sid,
                                                                                  ],
                                                                                  (
                                                                                    err,
                                                                                    result
                                                                                  ) => {
                                                                                    if (
                                                                                      err
                                                                                    )
                                                                                      console.log(
                                                                                        err
                                                                                      );
                                                                                    else {
                                                                                      db.query(
                                                                                        `SELECT M_ID FROM master_db WHERE M_Date=? AND Co_ID=? AND Prj_Name=? AND Si_ID=?`,
                                                                                        [
                                                                                          data.date,
                                                                                          coid,
                                                                                          data.Prj_name2,
                                                                                          sid,
                                                                                        ],
                                                                                        (
                                                                                          err,
                                                                                          result
                                                                                        ) => {
                                                                                          if (
                                                                                            err
                                                                                          )
                                                                                            console.log(
                                                                                              "here is err",
                                                                                              err
                                                                                            );
                                                                                          const mid = [];
                                                                                          result.forEach(
                                                                                            (
                                                                                              res
                                                                                            ) => {
                                                                                              mid.push(
                                                                                                result[0]
                                                                                                  .M_ID
                                                                                              );
                                                                                            }
                                                                                          );
                                                                                        }
                                                                                      );
                                                                                      db.query(
                                                                                        `INSERT INTO project(Prj_Name,Prj_Amt,Co_ID)VALUES(?,?,?)`,
                                                                                        [
                                                                                          data.Prj_name1,
                                                                                          data.Prj_amt1,
                                                                                          coid,
                                                                                        ],
                                                                                        (
                                                                                          err,
                                                                                          result
                                                                                        ) => {
                                                                                          if (
                                                                                            err
                                                                                          )
                                                                                            console.log(
                                                                                              err
                                                                                            );
                                                                                          else {
                                                                                            db.query(
                                                                                              `INSERT INTO project(Prj_Name,Prj_Amt,Co_ID)VALUES(?,?,?)`,
                                                                                              [
                                                                                                data.Prj_name2,
                                                                                                data.Prj_amt2,
                                                                                                coid,
                                                                                              ],
                                                                                              (
                                                                                                err,
                                                                                                result
                                                                                              ) => {
                                                                                                if (
                                                                                                  err
                                                                                                )
                                                                                                  console.log(
                                                                                                    err
                                                                                                  );
                                                                                                else {
                                                                                                  console.log(
                                                                                                    "priority",
                                                                                                    data.Priority
                                                                                                  );
                                                                                                  if (
                                                                                                    data.Priority ===
                                                                                                    "h"
                                                                                                  ) {
                                                                                                    db.query(
                                                                                                      `SELECT Pr_ID FROM priority WHERE Pr_Name="Hot" `,
                                                                                                      (
                                                                                                        err,
                                                                                                        result
                                                                                                      ) => {
                                                                                                        const prid = JSON.stringify(
                                                                                                          result[0]
                                                                                                            .Pr_ID
                                                                                                        );
                                                                                                        console.log(
                                                                                                          prid
                                                                                                        );
                                                                                                        if (
                                                                                                          err
                                                                                                        )
                                                                                                          console.log(
                                                                                                            err
                                                                                                          );
                                                                                                        else {
                                                                                                          db.query(
                                                                                                            `INSERT INTO priority_company (Pr_ID,Co_ID,Si_ID) VALUES(?,?,?)`,
                                                                                                            [
                                                                                                              prid,
                                                                                                              coid,
                                                                                                              sid,
                                                                                                            ],
                                                                                                            (
                                                                                                              err,
                                                                                                              result
                                                                                                            ) => {
                                                                                                              if (
                                                                                                                err
                                                                                                              )
                                                                                                                console.log(
                                                                                                                  err
                                                                                                                );
                                                                                                            }
                                                                                                          );
                                                                                                        }
                                                                                                      }
                                                                                                    );
                                                                                                  }
                                                                                                  if (
                                                                                                    data.Priority ===
                                                                                                    "c"
                                                                                                  ) {
                                                                                                    db.query(
                                                                                                      `SELECT Pr_ID FROM priority WHERE Pr_Name="Cold" `,
                                                                                                      (
                                                                                                        err,
                                                                                                        result
                                                                                                      ) => {
                                                                                                        const prid = JSON.stringify(
                                                                                                          result[0]
                                                                                                            .Pr_ID
                                                                                                        );
                                                                                                        console.log(
                                                                                                          prid
                                                                                                        );
                                                                                                        if (
                                                                                                          err
                                                                                                        )
                                                                                                          console.log(
                                                                                                            err
                                                                                                          );
                                                                                                        else {
                                                                                                          db.query(
                                                                                                            `INSERT INTO priority_company (Pr_ID,Co_ID,Si_ID) VALUES(?,?,?)`,
                                                                                                            [
                                                                                                              prid,
                                                                                                              coid,
                                                                                                              sid,
                                                                                                            ],
                                                                                                            (
                                                                                                              err,
                                                                                                              result
                                                                                                            ) => {
                                                                                                              if (
                                                                                                                err
                                                                                                              )
                                                                                                                console.log(
                                                                                                                  err
                                                                                                                );
                                                                                                            }
                                                                                                          );
                                                                                                        }
                                                                                                      }
                                                                                                    );
                                                                                                  }
                                                                                                  if (
                                                                                                    data.Priority ===
                                                                                                    "w"
                                                                                                  ) {
                                                                                                    db.query(
                                                                                                      `SELECT Pr_ID FROM priority WHERE Pr_Name="Warm" `,
                                                                                                      (
                                                                                                        err,
                                                                                                        result
                                                                                                      ) => {
                                                                                                        const prid = JSON.stringify(
                                                                                                          result[0]
                                                                                                            .Pr_ID
                                                                                                        );
                                                                                                        console.log(
                                                                                                          prid
                                                                                                        );
                                                                                                        if (
                                                                                                          err
                                                                                                        )
                                                                                                          console.log(
                                                                                                            err
                                                                                                          );
                                                                                                        else {
                                                                                                          db.query(
                                                                                                            `INSERT INTO priority_company (Pr_ID,Co_ID,Si_ID) VALUES(?,?,?)`,
                                                                                                            [
                                                                                                              prid,
                                                                                                              coid,
                                                                                                              sid,
                                                                                                            ],
                                                                                                            (
                                                                                                              err,
                                                                                                              result
                                                                                                            ) => {
                                                                                                              if (
                                                                                                                err
                                                                                                              )
                                                                                                                console.log(
                                                                                                                  err
                                                                                                                );
                                                                                                            }
                                                                                                          );
                                                                                                        }
                                                                                                      }
                                                                                                    );
                                                                                                  }
                                                                                                }
                                                                                              }
                                                                                            );
                                                                                          }
                                                                                        }
                                                                                      );
                                                                                    }
                                                                                  }
                                                                                );
                                                                              }
                                                                            }
                                                                          );

                                                                          if (
                                                                            data.other !=
                                                                            null
                                                                          ) {
                                                                            db.query(
                                                                              `INSERT INTO product(P_Name,P_Model) VALUES(?,?)`,
                                                                              [
                                                                                data.other,
                                                                                "none",
                                                                              ],
                                                                              (
                                                                                err,
                                                                                result
                                                                              ) => {
                                                                                if (
                                                                                  err
                                                                                ) {
                                                                                  console.log(
                                                                                    err
                                                                                  );
                                                                                } else {
                                                                                  db.query(
                                                                                    `SELECT P_ID FROM product WHERE P_Name=? AND P_Model=?`,
                                                                                    [
                                                                                      data.other,
                                                                                      "none",
                                                                                    ],
                                                                                    (
                                                                                      err,
                                                                                      result
                                                                                    ) => {
                                                                                      const opid = JSON.stringify(
                                                                                        result[0]
                                                                                          .P_ID
                                                                                      );
                                                                                      db.query(
                                                                                        `INSERT INTO master_product(P_ID,Co_ID,Si_ID) VALUES(?,?,?)`,
                                                                                        [
                                                                                          opid,
                                                                                          coid,
                                                                                          sid,
                                                                                        ],
                                                                                        (
                                                                                          err,
                                                                                          rsult
                                                                                        ) => {
                                                                                          if (
                                                                                            err
                                                                                          )
                                                                                            console.log(
                                                                                              err
                                                                                            );
                                                                                          else {
                                                                                            readXlsxFile(
                                                                                              filePath,
                                                                                              {
                                                                                                sheet:
                                                                                                  "Tender Database",
                                                                                              }
                                                                                            ).then(
                                                                                              (
                                                                                                rows
                                                                                              ) => {
                                                                                                rows.shift();
                                                                                                rows.forEach(
                                                                                                  (
                                                                                                    row
                                                                                                  ) => {
                                                                                                    let data = {
                                                                                                      date:
                                                                                                        row[2],
                                                                                                      coname:
                                                                                                        row[2],
                                                                                                      add:
                                                                                                        row[3],
                                                                                                      landline:
                                                                                                        row[4],
                                                                                                      cpname:
                                                                                                        row[5],
                                                                                                      cpnum:
                                                                                                        row[6],
                                                                                                      dept:
                                                                                                        row[7],
                                                                                                      prjname:
                                                                                                        row[8],
                                                                                                      amount:
                                                                                                        row[9],
                                                                                                    };
                                                                                                    console.log(
                                                                                                      data.amount
                                                                                                    );
                                                                                                    try {
                                                                                                      db.query(
                                                                                                        `SELECT master_db.M_ID FROM master_db INNER JOIN company ON company.Co_ID=master_db.Co_ID WHERE 
                                                                                                        company.Co_Name=? AND master_db.Prj_Name=? `,
                                                                                                        [
                                                                                                          data.coname,

                                                                                                          data.prjname,
                                                                                                        ],
                                                                                                        (
                                                                                                          err,
                                                                                                          result
                                                                                                        ) => {
                                                                                                          const mid = JSON.stringify(
                                                                                                            result[0]
                                                                                                              .M_ID
                                                                                                          );
                                                                                                          // result.forEach(
                                                                                                          //   (
                                                                                                          //     res
                                                                                                          //   ) => {
                                                                                                          //     mid.push(
                                                                                                          //       result[0]
                                                                                                          //         .M_ID
                                                                                                          //     );
                                                                                                          console.log(
                                                                                                            result
                                                                                                          );
                                                                                                          db.query(
                                                                                                            `INSERT INTO tender(T_Date,M_ID) VALUES(?,?)`,
                                                                                                            [
                                                                                                              data.date,
                                                                                                              mid,
                                                                                                            ],
                                                                                                            (
                                                                                                              err,
                                                                                                              result
                                                                                                            ) => {
                                                                                                              if (
                                                                                                                err
                                                                                                              )
                                                                                                                console.log(
                                                                                                                  err
                                                                                                                );
                                                                                                              else
                                                                                                                console.log(
                                                                                                                  "done"
                                                                                                                );
                                                                                                            }
                                                                                                          );
                                                                                                        }
                                                                                                      );
                                                                                                    } catch (error) {}
                                                                                                  }
                                                                                                );
                                                                                              }
                                                                                            );
                                                                                          }
                                                                                        }
                                                                                      );
                                                                                    }
                                                                                  );
                                                                                }
                                                                              }
                                                                            );
                                                                          }
                                                                        }
                                                                      }
                                                                    );
                                                                  }
                                                                }
                                                              );
                                                            }
                                                          }
                                                        );
                                                      }
                                                    );
                                                  }
                                                }
                                              );
                                            }
                                          }
                                        );
                                      }
                                    }
                                  );
                                }
                              });
                            }
                          );
                        }
                      }
                    );
                  });
                }
              );
            }
          }
        );
      } catch (err) {
        console.log("err", err);
      }
    });
  });
}

process.env.SECRET_KEY = "thisissecretekey";
// validaiton middleware
router.use((req, res, next) => {
  const token = req.body.token || req.headers["token"];
  if (token) {
    jwt.verify(token, process.env.SECRET_KEY, (err, res) => {
      if (err) {
        res.status(500).send("Token Invalid");
      } else {
        next();
      }
    });
  } else {
    res.send("Please send token");
  }
});

const port = process.env.PORT || 5000;

app.use("/auth", require("./api/auth"));
//listen on environment port no 5000
app.listen(port, () => console.log(`Listen on port ${port}`));
