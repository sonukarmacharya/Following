const express = require("express");

const user_aut = require("../controllers/user_auth");
const review_auth = require("../controllers/review_auth");

const priority = require("../controllers/priority");
const product = require("../controllers/product");
const salesperson = require("../controllers/salesperson");
const customers = require("../controllers/customer");
const company = require("../controllers/company");
const master = require("../controllers/master");
const admin = require("../controllers/admin");
const tender = require("../controllers/tender");

const router = express.Router();

router.post("/Insertadminassign", admin.postTask);
router.get("/DisplayadminassignCompany/:id", admin.getTaskCompany);
router.get("/gettask/:id", admin.getTask);
router.get("/DisplayadminassignCustomerIn/:id", admin.getTaskCustomerIn);
router.get("/DisplayTaskCompany/:id", admin.getTaskCompany);
router.get("/DisplayTaskProject/:id", admin.getTaskProject);
router.get("/DisplayadminassignCustomerDept/:id", admin.getTaskCustomerDept);
router.get("/Displaytodaytask/:id", admin.getTodayTask);
router.get("/counttasktable/:id", admin.countAsgTable); //new
router.get("/counttask/:id", admin.countAsg); //new
router.delete("/DeleteAsg/:sid/:coid/:prjid", admin.deleteAsgTask);

router.get("/cutomerDepartment", customers.getCustomerByDepartment);
router.post("/InsertcutomerDepartment", customers.postCustomerByDepartment);
router.get("/CountcutomerDepartment", customers.countCustomerByDepartment);
router.get("/cutomerIndustry", customers.getCustomerByIndustry);
router.post("/InsertcutomerIndustry", customers.postCustomerByIndustry);
router.get("/CountcutomerIndustry", customers.countCustomerByIndustry);
router.post("/InsertCustomer", customers.postCustomer);
router.get("/Customer/:cid/:siid", customers.getCustomer);
router.get("/customerdepartment/:sid/:coid", customers.getCustomerDepartment);
router.delete("/contact/:coid/:siid", customers.deleteContact);

router.post("/Insertcompany", company.postCompany);
router.get("/company", company.getCompany);
router.post("/Updatecompany/:id", company.updateCompany);
router.delete("/company/:cid/:sid", company.deleteCompany);
router.get("/companybymaster", company.getCompanyByMaster);
router.get("/companyId/:id", company.getCompanyByID);
router.get("/companyIndustryId/:id", company.getIndustryByID);
router.get("/companyProjectId/:id", company.getProjectByID);
router.post("/Insertindustry", company.postIndustry);
router.post("/priority/:siid/:cid", company.postPriority);
router.get("/priority/:siid/:cid", company.getPriority);
router.delete("/priority/:cid/:siid", company.deletePriority);
router.get("/department/:sid/:coid", company.getDepartment);
router.get("/industry/:id", company.getIndustryBySID);

router.post("/Insertmaster", master.postMaster);
router.post("/Insertmasterproduct", master.postMaster);
router.post("/postmasterproduct", master.postMasterProuct);
router.get("/getmasterproduct/:coid/:siid", master.getPurchaseHistory);
router.get("/Displaymaster", master.getMaster);
router.get("/Dispayproject/:sid/:coid", master.getProject);
router.get("/DisplaymasterProject/:id", master.getMasterProject);
router.get("/DisplaymasterCustDept/:id", master.getMasterCustDept);
router.get("/DisplaymasterCustIn/:id", master.getMasterCustIn);
router.get("/DisplaymasterProduct/:id", master.getMasterProduct);
router.get("/Displaycountproject/:coid/:siid", master.getProjectCount);
router.get("/countProductsTable/:id", master.countProductsTable); //new
router.get("/countProducts/:id", master.countProducts); //new
router.delete("/DeletePurchase/:id", master.deletePurchaseHistory);

router.post("/Insertproduct", product.postProducts);
router.post("/Updateproduct/:id", product.updateProduct);
router.delete("/Deleteproduct/:id", product.deleteProduct);
router.get("/Lowproduct", product.lowQuantity);
router.get("/Countproduct", product.countProduct);
router.get("/Displayproduct", product.getProducts);
router.get("/DisplayproductByID/:id", product.productQuantity);

router.post("/Insertpriority", priority.postPriority);
router.get("/Displaypriority", priority.getPriority);
router.get("/priorityColor/:coid/:siid", priority.getPriorityComp);

router.post("/Insertsalesperson", salesperson.postSalesperson);
router.post("/updatesalesperson/:sid/:aid", salesperson.updateSalesperson);
router.delete("/Deletesalesperson/:id", salesperson.deleteSalesperson);
router.get("/Countsalesperson", salesperson.countSalesperson);
router.get("/Displaysalesperson", salesperson.getSalesperson);
router.get("/DisplaysalespersonId/:id", salesperson.getSalespersonById);

router.post("/tender", tender.postTender);
router.get("/tender", tender.getTender);
router.delete("/deletetender/:id", tender.deleteTender);

router.post("/login", user_aut.Login);

router.get("/admin/:id", user_aut.getAdmin);
router.post("/admin", user_aut.postAdmin);

router.post("/reviewinsert", review_auth.reviewInsert);
router.get("/review/:id", review_auth.getReview);
router.get("/review/:coid/:siid", review_auth.getReviewComp);
router.get("/countreviewTable/:id", review_auth.countReviewTable); //new
router.get("/countreview/:id", review_auth.countReview); //new
router.post("/reviewupdate/:id", review_auth.reviewUpdate);
router.delete("/reviewdelete/:id", review_auth.reviewDelete);

module.exports = router;
