const mongoose = require('mongoose');

const Expenses = new mongoose.Schema({
    expenseDate: {
        type: Date,
        default: Date.now
    },
    executiveName: String,
    amount: Number,
    purpose: String,
    paymentMode: String,
});

module.exports = mongoose.model("ExpensesModal", Expenses);