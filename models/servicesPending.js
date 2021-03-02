const mongoose = require('mongoose');

const ServicesPending = new mongoose.Schema({
    customerName: String,
    phoneNumber: Number,
    city: String,
    address: String,
    installationDate: {
        type: Date,
        default: Date.now
    },
    installationExecutive: String,
    complainDetail: String,
    status: String
});

module.exports = mongoose.model("ServicesPendingModal", ServicesPending);