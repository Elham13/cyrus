const UsersModal = require('../models/users');

const checkRole = (role1, role2) => {
    return (req, res, next) => {
        if(req.user.role == role1 || req.user.role == role2){
            next();
        }else{
            req.flash("error_msg", "Sorry You are not authorized to view that page");
            res.redirect('/');
        }
    }
}

const ensureAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    req.flash("error_msg", "Sorry You are not authorized to view that page");
    res.redirect("/login");
}

const forwardAuthenticated = (req, res, next) => {
    if (!req.isAuthenticated()) {
        return next();
    }
    res.redirect("/");
}

module.exports = {
    ensureAuthenticated,
    forwardAuthenticated,
    checkRole
}