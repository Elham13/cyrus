const mongoose = require('mongoose');

const StockInwards = new mongoose.Schema({
    productName: String,
    numberOfProducts: Number,
    clientName: String,
    clientNumber: Number,
});

module.exports = mongoose.model("SolarStockOutwards", StockInwards);