const mongoose = require('mongoose');

const StockInwards = new mongoose.Schema({
    creatorName: String,
    productName: String,
    numberOfProducts: Number,
});

module.exports = mongoose.model("StockInwardsModal", StockInwards);