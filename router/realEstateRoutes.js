const RSPropertySale = require('../models/rsPropertySale');
const RSPropertyInHand = require('../models/rsPropertyInHand');
const rsPropertyInHand = require('../models/rsPropertyInHand');

const getRSPropertiesInHand = async (req, res) => {
    const PIH = await rsPropertyInHand.find({});

    res.render('rs/property_in_hand', {properties: PIH, user: req.user});
}

const getRSPropertiesSales = async (req, res) => {
    const Properties = await RSPropertySale.find({});
    res.render('rs/property_sales', {properties: Properties, user: req.user});
}

const postRSPropertiesSales = async (req, res) => {
    const {custName, phNumber, surveyNo, sqYds, sLocation, plNo, pps, towards, paymentMode} = req.body;

    const newPropertySale = {
        CustomerName: custName,
        MobileNumber: phNumber,
        SurveyNumber: surveyNo,
        SquareYards: sqYds,
        SiteLocation: sLocation,
        PlotNumber: plNo,
        PricePerSquare: pps,
        Towards: towards,
        PaymentMode: paymentMode
    }

    const nm = new RSPropertySale(newPropertySale);
    await nm.save();
    res.redirect('/rsPropertiesSales');
}

const postRSPropertiesInHand = async (req, res) => {
    const {custName, phNumber, propType, ventureName, unit, surveyNo, sqYds, sLocation, plNo, pps} = req.body;

    const newPropertySale = {
        CustomerName: custName,
        MobileNumber: phNumber,
        PropertyType: propType,
        VentureName: ventureName,
        Unit: unit,
        SurveyNumber: surveyNo,
        SquareYards: sqYds,
        SiteLocation: sLocation,
        PlotNumber: plNo,
        PricePerSquare: pps,
    }

    const nm = new RSPropertyInHand(newPropertySale);
    await nm.save();
    res.redirect('/rsPropertiesInHand');
}

module.exports = {
    getRSPropertiesInHand, 
    getRSPropertiesSales,
    postRSPropertiesSales,
    postRSPropertiesInHand
};