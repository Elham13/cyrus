const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    CustomerName: String,
    MobileNumber: Number,
    SurveyNumber: Number,
    SquareYards: Number,
    SiteLocation: String,
    PlotNumber: String,
    PricePerSquare: Number,
    Towards: String,
    PaymentMode: String,
});

module.exports = mongoose.model('RSPropertySale', Schema);