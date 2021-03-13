const mongoose = require('mongoose');

const ClientsSchema = new mongoose.Schema({
    customerId: String,
    creatorName: String,
    customerName: String,
    productName: String,
    reference: String,
    phoneNumber: Number,
    alternatePhoneNumber: Number,
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
        type: Number,
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
    serviceStatus: {
        type: String,
        default: 'Pending'
    },
    nextDates: {
        type: Array,
    },
    dateCreated: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("SolarTotalSales", ClientsSchema);