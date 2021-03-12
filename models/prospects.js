const mongoose = require('mongoose');

const Prospects = new mongoose.Schema({ 
    creatorName: String,
    customerName: String,
    phoneNumber: Number,
    city: String,
    address: String,
    executiveName: String,
    remarks: String,
    status: String, 
    followUpDate: {
        type: Date,
        default: null
    }
});

module.exports = mongoose.model("ProspectsModal", Prospects);