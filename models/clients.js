const mongoose = require('mongoose');

const ClientsSchema = new mongoose.Schema({
    customerId: String,
    customerName: String,
    productName: String,
    reference: String,
    phoneNumber: Number,
    address: String,
    installationDate: {
        type: Date,
        default: Date.now
    },
    installationExecutive: String,
    amount: Number,
    paymentMode: String,
    accNo: Number,
    branchName: String,
    chequeNo: String,
    chequeDate: Date,
    remarks: String,
    emi: Boolean,
    advancePayment: Number,
    duration: String,
    firstPayment: {
        type: String,
        default: null,
    },
    firstPaymentDate: {
        type: Date,
        default: null,
    },
    firstPaidDate: {
        type: Date,
        default: null,
    },
    secondPayment: {
        type: Number,
        default: null,
    },
    secondPaymentDate: {
        type: Date,
        default: null,
    },
    secondPaidDate: {
        type: Date,
        default: null,
    },
    thirdPayment: {
        type: Number,
        default: null,
    },
    thirdPaidDate: {
        type: Date,
        default: null,
    },
});

module.exports = mongoose.model("Clients", ClientsSchema);