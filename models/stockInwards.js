const mongoose = require('mongoose');

const StockInwards = new mongoose.Schema({
    creatorName: {
        type: String,
        default: '',
    },
    productName: String,
    numberOfProducts: Number,
    numberOfProductsDifference: {
        type: Number,
        default: 0,
    },
    remark: String,
    stockOutward: {
        type: Array,
        default: [],
    },
});

module.exports = mongoose.model("StockInwardsModal", StockInwards);