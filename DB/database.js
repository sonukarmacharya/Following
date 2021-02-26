const mysql = require("mysql");
const dbcon = mysql.createConnection({
  connectionLimit: 10,
  host: "localhost",
  user: "root",
  password: "",
  database: "",
});

dbcon.connect((err) => {
  if (err) console.log("h", err);
  else console.log("Connected to db");
});

dbcon.query(`CREATE DATABASE IF NOT EXISTS customersfollow`, (err, result) => {
  if (err) console.log(err);
  console.log("Database created");
  const db = require("./db_connection");
  db.query(
    `CREATE TABLE IF NOT EXISTS admin(A_ID INT PRIMARY KEY AUTO_INCREMENT,A_Image VARCHAR(225),A_Username
    VARCHAR(20),A_Password VARCHAR(20),A_Address VARCHAR(30),A_Email VARCHAR(30))`,
    (err, result) => {
      db.query(
        `SELECT * FROM admin WHERE A_Username='excel' AND A_Username='admin'`,
        (err, result) => {
          console.log(result);
          if (result == "") {
            console.log("no result");
            db.query(`INSERT INTO admin (A_Username) VALUES ('excel')`);
            db.query(
              `INSERT INTO admin (A_Username,A_Password) VALUES ('admin','password')`
            );
          } else {
            console.log("rsult");
          }
        }
      );
    }
  );
  db.query(
    `CREATE TABLE IF NOT EXISTS company(Co_ID INT PRIMARY KEY AUTO_INCREMENT,Co_Name VARCHAR(30),Co_District VARCHAR(20),Co_Landline VARCHAR(10),Co_Address VARCHAR(30) )`
  );
  db.query(
    `CREATE TABLE IF NOT EXISTS salesperson(S_ID INT PRIMARY KEY AUTO_INCREMENT,S_Image VARCHAR(225),S_Username VARCHAR(30),S_Password VARCHAR(15),S_Address VARCHAR(30),S_Email VARCHAR(30), A_ID INT REFERENCES admin(ID))`,
    (err, result) => {
      db.query(
        `SELECT * FROM salesperson WHERE S_Username='excel'`,
        (err, result) => {
          if (result == "") {
            console.log("no result", result);
            db.query(
              `INSERT INTO salesperson (S_ID,S_Username) VALUES (0,'excel')`
            );
          } else {
            console.log("result");
          }
        }
      );
    }
  );
  db.query(
    `CREATE TABLE IF NOT EXISTS product(P_ID INT PRIMARY KEY AUTO_INCREMENT,P_Name VARCHAR(30),P_Model VARCHAR(30),A_ID INT REFERENCES admin(ID),P_Quantity INT,P_Price INT)`
  );
  db.query(
    `CREATE TABLE IF NOT EXISTS priority(Pr_ID INT PRIMARY KEY AUTO_INCREMENT,Pr_Name VARCHAR(10),Pr_Color VARCHAR(10),Pr_Days INT)`
  );
  db.query(
    `CREATE TABLE IF NOT EXISTS sectorwise_industry(Si_ID INT PRIMARY KEY AUTO_INCREMENT,Si_Name VARCHAR(30), Co_ID INT REFERENCES company(ID))`
  );
  db.query(
    `CREATE TABLE IF NOT EXISTS project(Prj_ID INT PRIMARY KEY AUTO_INCREMENT,Prj_Name VARCHAR(30),Prj_Amt INT,Co_ID INT REFERENCES company(ID),A_ID INT REFERENCES admin(ID))`
  );
  db.query(
    `CREATE TABLE IF NOT EXISTS review(R_ID INT PRIMARY KEY AUTO_INCREMENT,R_Review text,Co_ID INT REFERENCES company(ID),S_ID INT REFERENCES salesperson(ID),INquiry_via VARCHAR(20),Date date,Si_ID INT REFERENCES sectorwise_industry(ID))`
  );
  db.query(
    `CREATE TABLE IF NOT EXISTS admin_assign_customers(Ac_ID INT PRIMARY KEY AUTO_INCREMENT,Co_ID INT REFERENCES company(ID),Prj_ID INT REFERENCES project(ID),S_ID INT REFERENCES salesperson(ID),A_ID INT REFERENCES admin(ID),Date date)`
  );
  db.query(
    `CREATE TABLE IF NOT EXISTS contact_person_department(Cp_ID INT PRIMARY KEY AUTO_INCREMENT,Cp_Name VARCHAR(30),Cp_Number VARCHAR(10),Department_Name VARCHAR(50),Si_ID INT REFERENCES sectorwise_industry(ID),Co_ID INT REFERENCES company(ID))`
  );
  db.query(
    `CREATE TABLE IF NOT EXISTS contact_person_industry(CpI_ID INT PRIMARY KEY AUTO_INCREMENT,CpI_Name VARCHAR(30),CpI_Email VARCHAR(30),CpI_Number VARCHAR(10),Si_ID INT REFERENCES sectorwise_industry(ID),Co_ID INT REFERENCES company(ID))`
  );
  db.query(
    `CREATE TABLE IF NOT EXISTS master_db(M_ID INT PRIMARY KEY AUTO_INCREMENT,M_Date date,Si_ID INT REFERENCES sectorwise_industry(ID),Co_ID INT REFERENCES company(ID),Prj_Name VARCHAR(30),Prj_Amt INT)`
  );
  db.query(
    `CREATE TABLE IF NOT EXISTS master_product(Mp_ID INT PRIMARY KEY AUTO_INCREMENT,Si_ID INT REFERENCES sectorwise_industry(ID),Co_ID INT REFERENCES company(ID),P_ID INT REFERENCES product(ID),S_ID INT REFERENCES salesperson(ID),Price INT,Quantity INT,Date date)`
  );
  db.query(
    `CREATE TABLE IF NOT EXISTS priority_company(Pc_ID INT PRIMARY KEY AUTO_INCREMENT,Si_ID INT REFERENCES sectorwise_industry(ID),Co_ID INT REFERENCES company(ID),Pr_ID INT REFERENCES priority(ID))`
  );
  db.query(
    `CREATE TABLE IF NOT EXISTS tender(T_ID INT PRIMARY KEY AUTO_INCREMENT,T_date date,M_ID INT REFERENCES master_db(ID))`
  );
});
