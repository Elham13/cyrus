const express = require('express');
const router = express.Router();
const {
    ensureAuthenticated, 
    forwardAuthenticated,
    checkRole,
} = require('../config/auth');

const {
    postWaterPurifier, 
    postProspects, 
    postStockInwards, 
    postStockOutwards,
    postServicePending, 
    postExpenses, 
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
    postEditService,
    postDeleteStockOutward,
    postDeleteStockInward,
    postDeleteExpense,
    postUpdateRemark,
    postEditClient,
    postAddSell,
    getTotalSales,
    getTelecaling,
    getStockReport,
    getServicesPending,
    getExpenses,
    getShowSingleCust,
} = require('./wproutes');

const {
    getSolarTotalSales,
    getSolarTelecaling,
    getSolarExpenses,
    postSolarExpense,
    getSolarStockReports,
    getShowSolarSingleCust,
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
} = require('./solarroutes');

const {
    getContactUs,
    getAboutUs,
    postContactUs,
} = require('./general');

const {
    getRSPropertiesInHand, 
    getRSPropertiesSales,
    postRSPropertiesSales,
    postRSPropertiesInHand
} = require('./realEstateRoutes');

//Admin
//Sales Department
//Telecalings Department
//Stocks Department
//Services Department
//Sales Departments
//Telecalings Departments
//Stocks Departments
//Services Departments
router.get('/contactUs', getContactUs);
router.get('/aboutUs', getAboutUs);
router.post('/contactUs', postContactUs);

router.get('/wpTotalSales', ensureAuthenticated, checkRole('Admin','Sales Department'), getTotalSales);
router.get('/wpTelecaling', ensureAuthenticated, checkRole('Admin','Telecalings Department'), getTelecaling);
router.get('/wpStockReport', ensureAuthenticated, checkRole('Admin','Stocks Department'), getStockReport);
router.get('/wpServicesPending', ensureAuthenticated, checkRole('Admin','Services Department'), getServicesPending);
router.get('/wpExpenses', ensureAuthenticated, checkRole('Admin', ""), getExpenses);
router.get('/showSingleCust/:id', ensureAuthenticated, checkRole('Admin', ''), getShowSingleCust);
router.post('/wpAddClient', postWaterPurifier);
router.post('/wpAddProspect', postProspects); 
router.post('/wpAddStockInwards', postStockInwards);
router.post('/wpAddStockOwtwards', postStockOutwards);
router.post('/wpServicesPending', postServicePending);
router.post('/wpExpenses', postExpenses);
router.post('/checkEMI', postCheciEMI); 
router.post('/firstPyament', postFirstPayment);
router.post('/secondPayment', postSecondPayment);
router.post('/thirdPyament', postThirPayment);
router.post('/updateServices', postUpdateServices);
router.post('/editRemark', posteditRemark);
router.post('/editStatus', posteditStatus); 
router.post('/addMoreProduct', postAddMoreProduct);
router.post('/emiPaymentStatus', postEmiPaymentStatus);
router.post('/deleteService', postDeleteService);
router.post('/deletClient', postDeletClient);
router.post('/deleteTelecaling', postDeleteTelecaling);
router.post('/editService', postEditService);
router.post('/editService1', postEditService);
router.post('/deleteStockOutward', postDeleteStockOutward);
router.post('/deleteStockInward', postDeleteStockInward);
router.post('/deleteExpense', postDeleteExpense);
router.post('/updateRemark', postUpdateRemark);
router.post('/editClient', postEditClient);
router.post('/addSell', postAddSell);


router.get('/solarTotalSales', ensureAuthenticated, checkRole('Admins','Sales Departments'), getSolarTotalSales);
router.get('/solarTelecaling', ensureAuthenticated, checkRole('Admins','Telecalings Departments'), getSolarTelecaling);
router.get('/solarExpenses', ensureAuthenticated, checkRole('Admins',''), getSolarExpenses);
router.get('/solarStockReports', ensureAuthenticated, checkRole('Admins','Stocks Departments'),  getSolarStockReports);
router.get('/showSolarSingleCust/:id', ensureAuthenticated, checkRole('Admins', ''), getShowSolarSingleCust);
router.post('/totalSales', postTotalSales);
router.post('/solarCheckEmi', postSolarCehckEmi);
router.post('/solarTelecaling', postSolarTelecaling);
router.post('/solarExpenses', postSolarExpense);
router.post('/solarStockInward', postSolarStockInward);
router.post('/solarStockOutward', postSolarStockOutward); 
router.post('/solarEditRemark', postSolarEditRemark);
router.post('/solarEditStatus', postSolarEditStatus);
router.post('/solarAddMoreProduct', postSolarAddMoreProduct);
router.post('/solarEmiPaymentStatus', postSolarEmiPaymentStatus)
router.post('/solarDeletClient', postSolarDeletClient);
router.post('/solarEditService', postSolarEditService);
router.post('/solarDeleteTelecaling', postSolarDeleteTelecaling);
router.post('/solarDeleteStockInward', postSolarDeleteStockInward);
router.post('/solarDeleteStockOutward', postSolarDeleteStockOutward);
router.post('/solarUpdateRemark', postSolarUpdateRemark);
router.post('/solarEditClient', postSolarEditClient);
router.post('/solarAddSell', postSolarAddSell);

router.get('/rsPropertiesInHand', ensureAuthenticated, checkRole('Admin',''), getRSPropertiesInHand)
router.get('/rsPropertiesSales', ensureAuthenticated, checkRole('Admin',''), getRSPropertiesSales)
router.post('/rsPropertiesSales', postRSPropertiesSales)
router.post('/rsPropertiesInHand', postRSPropertiesInHand)



module.exports = router;