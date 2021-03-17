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
        default: 0,
    },
    firstNextPaymentDate: {
        type: Date,
        default: null,
    },
    firstPaidDate: {
        type: Date,
        default: null,
    },
    firstEmiDate: {
        type: Date,
        default: null,
    },
    firstPaymentMode: String,
    secondPaymentStatus: {
        type: String,
        default: 'Pending',
    },
    secondPaidAmount: {
        type: Number,
        default: 0,
    },
    secondNextPaymentDate: {
        type: Date,
        default: null,
    },
    secondPaidDate: {
        type: Date,
        default: null,
    },
    secondEmiDate: {
        type: Date,
        default: null,
    },
    secondPaymentMode: String,
    thirdPaymentStatus: {
        type: String,
        default: 'Pending',
    },
    thirdPaidAmount: {
        type: Number,
        default: 0,
    },
    thirdPaidDate: {
        type: Date,
        default: null,
    },
    thirdEmiDate: {
        type: Date,
        default: null,
    },
    thirdPaymentMode: String,
    serviceStatus: {
        type: String,
        default: 'Pending'
    },
    dueAmountsCleared1: {
        type: Boolean,
        default: false,
    },
    dueAmountsCleared2: {
        type: Boolean,
        default: false,
    },
    dueAmountsCleared3: {
        type: Boolean,
        default: false,
    },
    nextDates: {
        type: Array,
    },
    services: {
        type: Array,
        default: []
    },
    dateCreated: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Clients", ClientsSchema);