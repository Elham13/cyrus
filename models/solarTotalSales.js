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
    firstPaymentStatus: {
        type: String,
        default: 'Pending',
    },
    firstPaidAmount: {
        type: Number,
        default: null,
    },
    firstNextPaymentDate: {
        type: Date,
        default: null,
    },
    firstPaidDate: {
        type: Date,
        default: null,
    },
    secondPaymentStatus: {
        type: String,
        default: 'Pending',
    },
    secondPaidAmount: {
        type: Number,
        default: null,
    },
    secondNextPaymentDate: {
        type: Date,
        default: null,
    },
    secondPaidDate: {
        type: Date,
        default: null,
    },
    thirdPaymentStatus: {
        type: String,
        default: 'Pending',
    },
    thirdPaidAmount: {
        type: Number,
        default: null,
    },
    thirdPaidDate: {
        type: Date,
        default: null,
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