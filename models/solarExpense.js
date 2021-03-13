const mongoose = require('mongoose');

const Expenses = new mongoose.Schema({
    expenseDate: {
        type: Date,
        default: Date.now
    },
    creatorName: String,
    executiveName: String,
    amount: Number,
    purpose: String,
    remark: String,
    paymentMode: String,
});

module.exports = mongoose.model("SolarExpenses", Expenses);