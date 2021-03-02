const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    FirstName: String,
    LastName: String,
    Location: String,
    Subject: String
});

module.exports = mongoose.model("ContactUs", Schema);