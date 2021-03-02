const ContactUs = require('../models/contactUs')

const getContactUs = (req, res) => {
    res.render('contact_us');
}

const getAboutUs = (req, res) => {
    res.render('about_us');
}

const postContactUs = async (req, res) => {
    const {firstname, lastname, country, subject} = req.body;

    const cu = new ContactUs({
        FirstName: firstname,
        LastName: lastname,
        Location: country,
        Subject: subject
    });

    await cu.save();
    res.redirect('/contactUs');
}

module.exports = {
    getContactUs,
    getAboutUs, 
    postContactUs
};