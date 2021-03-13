const mongoose = require('mongoose');

const Prospects = new mongoose.Schema({ 
    customerName: String,
    creatorName: String,
    phoneNumber: Number,
    city: String,
    address: String,
    executiveName: String,
    remarks: String,
    status: String, 
    followUpDate: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("SolarTelecalingData", Prospects);