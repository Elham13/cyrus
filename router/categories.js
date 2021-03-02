const express = require('express');
const passport = require('passport');
const router = express.Router();
const {
    ensureAuthenticated, 
    forwardAuthenticated,
    checkRole,
} = require('../config/auth');

const {
    getHome, 
    getWaterPurifier,
    getSolar, 
    getRealEstate, 
    getAdmin, 
    getLogin,
    getRegister,
    postRegister,
    logout
} = require('./routes')

// Home
router.get('/',  getHome);

// Logout
router.delete('/logout',  logout);

// Water purifier
router.get('/wp', ensureAuthenticated, getWaterPurifier); 

// Water purifier
router.get('/solar', ensureAuthenticated, getSolar);

// Real estate
router.get('/re', ensureAuthenticated, getRealEstate);

// Admin
router.get('/admin', ensureAuthenticated, getAdmin);

// Login
router.get('/login', forwardAuthenticated, getLogin);
router.post('/login', forwardAuthenticated, passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
 }));

// Register
router.get('/register', forwardAuthenticated, getRegister);
router.post('/register', postRegister);


module.exports = router;