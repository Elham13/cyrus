const mongoose = require('mongoose');

const StockInwards = new mongoose.Schema({
    productName: String,
    numberOfProducts: Number,
});

module.exports = mongoose.model("StockInwardsModal", StockInwards);