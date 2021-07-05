const express = require("express");
const router = express.Router();
const {
  ensureAuthenticated,
  forwardAuthenticated,
  checkRole,
} = require("../config/auth");

const {
  postWaterPurifier,
  postProspects,
  postStockInwards,
  postStockOutwards,
  postServicePending,
  postExpenses,
  postEditExpenses,
  postCheciEMI,
  postFirstPayment,
  postSecondPayment,
  postThirPayment,
  postUpdateServices,
  posteditRemark,
  posteditStatus,
  postAddMoreProduct,
  postEmiPaymentStatus,
  postDeleteService,
  postDeletClient,
  postDeleteTelecaling,
  postEditTelecaling,
  postEditService,
  postDeleteStockOutward,
  postDeleteStockInward,
  postEditStockInwards,
  postDeleteExpense,
  postUpdateRemark,
  postStockRemark,
  postStockOutwardRemark,
  postEditClient,
  postAddSell,
  getTotalSales,
  getTelecaling,
  getStockReport,
  getServicesPending,
  getExpenses,
  getShowSingleCust,
  getShowEditPage,
  getShowEditStockInwards,
  getShowEditExpenses,
} = require("./wproutes");

const {
  getSolarTotalSales,
  getSolarTelecaling,
  postSolarEditTelecaling,
  getSolarExpenses,
  getSolarServicesPending,
  getSolarStockReports,
  getShowSolarSingleCust,
  getSolarShowEditTelecaling,
  getSolarShowEditStock,
  getSolarShowEditExpens,
  postSolarExpense,
  postSolarEditExpenses,
  postSolarStockInward,
  postSolarStockOutward,
  postTotalSales,
  postSolarCehckEmi,
  postSolarTelecaling,
  postSolarEditRemark,
  postSolarEditStatus,
  postSolarAddMoreProduct,
  postSolarEmiPaymentStatus,
  postSolarDeletClient,
  postSolarEditService,
  postSolarDeleteTelecaling,
  postSolarDeleteStockInward,
  postSolarDeleteStockOutward,
  postSolarUpdateRemark,
  postSolarEditClient,
  postSolarAddSell,
  postSolarDeleteService,
  postSolarStockRemark,
  postSolarEditStockInwards,
} = require("./solarroutes");

const { getContactUs, getAboutUs, postContactUs } = require("./general");

const {
  getRSPropertiesInHand,
  getRSPropertiesSales,
  postRSPropertiesSales,
  postRSPropertiesInHand,
} = require("./realEstateRoutes");

//Admin
//Sales Department
//Telecalings Department
//Stocks Department
//Services Department
//Sales Departments
//Telecalings Departments
//Stocks Departments
//Services Departments
router.get("/contactUs", getContactUs);
router.get("/aboutUs", getAboutUs);
router.post("/contactUs", postContactUs);

// router.get("/wpTotalSales", getTotalSales);
// router.get("/wpTelecaling", getTelecaling);
// router.get("/wpStockReport", getStockReport);
// router.get("/wpServicesPending", getServicesPending);
// router.get("/wpExpenses", getExpenses);
// router.get("/showSingleCust/:id", getShowSingleCust);
router.get(
  "/wpTotalSales",
  ensureAuthenticated,
  checkRole("Admin", "Sales Department"),
  getTotalSales
);
router.get(
  "/wpTelecaling",
  ensureAuthenticated,
  checkRole("Admin", "Telecalings Department"),
  getTelecaling
);
router.get(
  "/wpStockReport",
  ensureAuthenticated,
  checkRole("Admin", "Stocks Department"),
  getStockReport
);
router.get(
  "/wpServicesPending",
  ensureAuthenticated,
  checkRole("Admin", "Services Department"),
  getServicesPending
);
router.get(
  "/wpExpenses",
  ensureAuthenticated,
  checkRole("Admin", ""),
  getExpenses
);
router.get(
  "/showSingleCust/:id",
  ensureAuthenticated,
  checkRole("Admin", ""),
  getShowSingleCust
);
router.get(
  "/showEditPage/:id",
  ensureAuthenticated,
  checkRole("Admin", ""),
  getShowEditPage
);
router.get(
  "/showEditStockInward/:id",
  ensureAuthenticated,
  checkRole("Admin", ""),
  getShowEditStockInwards
);
router.get(
  "/showEditExpenses/:id",
  ensureAuthenticated,
  checkRole("Admin", ""),
  getShowEditExpenses
);
router.post("/wpAddClient", postWaterPurifier);
router.post("/wpAddProspect", postProspects);
router.post("/wpAddStockInwards", postStockInwards);
router.post("/wpAddStockOwtwards", postStockOutwards);
router.post("/wpServicesPending", postServicePending);
router.post("/wpExpenses", postExpenses);
router.post("/editExpenses", postEditExpenses);
router.post("/checkEMI", postCheciEMI);
router.post("/firstPyament", postFirstPayment);
router.post("/secondPayment", postSecondPayment);
router.post("/thirdPyament", postThirPayment);
router.post("/updateServices", postUpdateServices);
router.post("/editRemark", posteditRemark);
router.post("/editStatus", posteditStatus);
router.post("/addMoreProduct", postAddMoreProduct);
router.post("/emiPaymentStatus", postEmiPaymentStatus);
router.post("/deleteService", postDeleteService);
router.post("/deletClient", postDeletClient);
router.post("/deleteTelecaling", postDeleteTelecaling);
router.post("/editTelecaling", postEditTelecaling);
router.post("/editService", postEditService);
router.post("/editService1", postEditService);
router.post("/deleteStockOutward", postDeleteStockOutward);
router.post("/deleteStockInward", postDeleteStockInward);
router.post("/editStockInwards", postEditStockInwards);
router.post("/deleteExpense", postDeleteExpense);
router.post("/updateRemark", postUpdateRemark);
router.post("/stockRemark", postStockRemark);
router.post("/stockOutwardRemark", postStockOutwardRemark);
router.post("/editClient", postEditClient);
router.post("/addSell", postAddSell);

// router.get('/solarTotalSales', getSolarTotalSales);
// router.get('/solarTelecaling', getSolarTelecaling);
// router.get('/solarExpenses',  getSolarExpenses);
// router.get('/solarStockReports',  getSolarStockReports);
// router.get('/solarServicesPending', getSolarServicesPending);
// router.get('/showSolarSingleCust/:id', getShowSolarSingleCust);
router.get(
  "/solarTotalSales",
  ensureAuthenticated,
  checkRole("Admins", "Sales Departments"),
  getSolarTotalSales
);
router.get(
  "/solarTelecaling",
  ensureAuthenticated,
  checkRole("Admins", "Telecalings Departments"),
  getSolarTelecaling
);
router.get(
  "/solarExpenses",
  ensureAuthenticated,
  checkRole("Admins", ""),
  getSolarExpenses
);
router.get(
  "/solarStockReports",
  ensureAuthenticated,
  checkRole("Admins", "Stocks Departments"),
  getSolarStockReports
);
router.get(
  "/solarServicesPending",
  ensureAuthenticated,
  checkRole("Admins", "Services Departments"),
  getSolarServicesPending
);
router.get(
  "/showSolarSingleCust/:id",
  ensureAuthenticated,
  checkRole("Admins", ""),
  getShowSolarSingleCust
);
router.get(
  "/solarShowEditTelecaling/:id",
  ensureAuthenticated,
  checkRole("Admins", ""),
  getSolarShowEditTelecaling
);
router.get(
  "/solarShowEditStock/:id",
  ensureAuthenticated,
  checkRole("Admins", ""),
  getSolarShowEditStock
);
router.get(
  "/solarShowEditExpens/:id",
  ensureAuthenticated,
  checkRole("Admins", ""),
  getSolarShowEditExpens
);
router.post("/totalSales", postTotalSales);
router.post("/solarCheckEmi", postSolarCehckEmi);
router.post("/solarTelecaling", postSolarTelecaling);
router.post("/solarEditTelecaling", postSolarEditTelecaling);
router.post("/solarExpenses", postSolarExpense);
router.post("/solarEditExpenses", postSolarEditExpenses);
router.post("/solarStockInward", postSolarStockInward);
router.post("/solarStockOutward", postSolarStockOutward);
router.post("/solarEditRemark", postSolarEditRemark);
router.post("/solarEditStatus", postSolarEditStatus);
router.post("/solarAddMoreProduct", postSolarAddMoreProduct);
router.post("/solarEmiPaymentStatus", postSolarEmiPaymentStatus);
router.post("/solarDeletClient", postSolarDeletClient);
router.post("/solarEditService", postSolarEditService);
router.post("/solarEditService1", postSolarEditService);
router.post("/solarDeleteTelecaling", postSolarDeleteTelecaling);
router.post("/solarDeleteStockInward", postSolarDeleteStockInward);
router.post("/solarDeleteStockOutward", postSolarDeleteStockOutward);
router.post("/solarUpdateRemark", postSolarUpdateRemark);
router.post("/solarEditClient", postSolarEditClient);
router.post("/solarAddSell", postSolarAddSell);
router.post("/solarDeleteService", postSolarDeleteService);
router.post("/solarStockRemark", postSolarStockRemark);
router.post("/solarEditStockInwards", postSolarEditStockInwards);

router.get(
  "/rsPropertiesInHand",
  ensureAuthenticated,
  checkRole("Admin", ""),
  getRSPropertiesInHand
);
router.get(
  "/rsPropertiesSales",
  ensureAuthenticated,
  checkRole("Admin", ""),
  getRSPropertiesSales
);
router.post("/rsPropertiesSales", postRSPropertiesSales);
router.post("/rsPropertiesInHand", postRSPropertiesInHand);

module.exports = router;
