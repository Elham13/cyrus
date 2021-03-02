const mongoose = require('mongoose');

const ClientsSchema = new mongoose.Schema({
    customerName: String,
    phoneNumber: Number,
    address: String,
    installationDate: {
        type: Date,
        default: Date.now
    },
    installationExecutive: String,
    amount: Number,
    emi: Boolean,
    advancePayment: Number,
    duration: String
});

module.exports = mongoose.model("SolarTotalSales", ClientsSchema);