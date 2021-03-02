const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    CustomerName: String,
    MobileNumber: Number,
    PropertyType: String,
    VentureName: String,
    Unit: String,
    SurveyNumber: Number,
    SquareYards: Number,
    SiteLocation: String,
    PlotNumber: String,
    PricePerSquare: Number,
});

module.exports = mongoose.model('RSPropertyInHand', Schema);