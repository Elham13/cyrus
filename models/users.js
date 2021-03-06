const mongoose = require('mongoose');

const UsreSchema = mongoose.Schema({
    name: String,
    email: String,
    mobileNumber: Number,
    role: String,
    password: String,
    createdAt: { 
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('UsersModal', UsreSchema);