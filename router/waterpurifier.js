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
    postShowSingleCust,
    getTotalSales,
    getTelecaling,
    getStockReport,
    getServicesPending,
    getExpenses,
    getShowSingleCust,
    postUpdateServices,
} = require('./wproutes');

const {
    getSolarTotalSales,
    getSolarTelecaling,
    getSolarExpenses,
    postSolarExpense,
    getSolarStockReports,
    postSolarStockInward,
    postSolarStockOutward,
    postTotalSales,
    postSolarCehckEmi,
    postSolarTelecaling,
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

router.get('/contactUs', getContactUs);
router.get('/aboutUs', getAboutUs);
router.post('/contactUs', postContactUs);

router.get('/wpTotalSales',  getTotalSales);
router.get('/wpTelecaling', getTelecaling);
router.get('/wpStockReport',  getStockReport); 
router.get('/wpServicesPending',  getServicesPending);
router.get('/wpExpenses', getExpenses);
// router.get('/wpTotalSales', ensureAuthenticated, checkRole('CEO', 'manager'), getTotalSales);
// router.get('/wpTelecaling', ensureAuthenticated, getTelecaling);
// router.get('/wpStockReport', ensureAuthenticated, checkRole('CEO', 'manager'), getStockReport);
// router.get('/wpServicesPending', ensureAuthenticated, checkRole('CEO', 'manager'), getServicesPending);
// router.get('/wpExpenses', ensureAuthenticated, checkRole('CEO', 'manager'), getExpenses);
router.get('/showSingleCust', getShowSingleCust);
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
router.post('/showSingleCust', postShowSingleCust);
router.post('/updateServices', postUpdateServices);

router.get('/solarTotalSales',  getSolarTotalSales);
router.get('/solarTelecaling',  getSolarTelecaling);
router.get('/solarExpenses',  getSolarExpenses);
router.get('/solarStockReports', getSolarStockReports);
// router.get('/solarTotalSales', ensureAuthenticated, checkRole('CEO', 'manager'), getSolarTotalSales);
// router.get('/solarTelecaling', ensureAuthenticated, checkRole('CEO', 'manager'), getSolarTelecaling);
// router.get('/solarExpenses', ensureAuthenticated, checkRole('CEO', 'manager'), getSolarExpenses);
// router.get('/solarStockReports', ensureAuthenticated, checkRole('CEO', 'manager'), getSolarStockReports);
router.post('/totalSales', postTotalSales);
router.post('/solarCheckEmi', postSolarCehckEmi);
router.post('/solarTelecaling', postSolarTelecaling);
router.post('/solarExpenses', postSolarExpense);
router.post('/solarStockInward', postSolarStockInward);
router.post('/solarStockOutward', postSolarStockOutward); 

router.get('/rsPropertiesInHand',  getRSPropertiesInHand)
router.get('/rsPropertiesSales', getRSPropertiesSales)
// router.get('/rsPropertiesInHand', ensureAuthenticated, checkRole('CEO', 'manager'), getRSPropertiesInHand)
// router.get('/rsPropertiesSales', ensureAuthenticated, checkRole('CEO', 'manager') ,getRSPropertiesSales)
router.post('/rsPropertiesSales', postRSPropertiesSales)
router.post('/rsPropertiesInHand', postRSPropertiesInHand)



module.exports = router;