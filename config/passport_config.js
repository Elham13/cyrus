const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const UsersModal = require('../models/users');
const initPassport = async (passport) => {
    const authenticateUser = async (number, password, done) => {
        const user = await UsersModal.findOne({mobileNumber: number}, (err, result) => {
            if(err) return done(err);
            if(!result) return done(null, false, {message: 'No user with that number'});
        });

        try {
            if(await bcrypt.compare(password, user.password)){
                return done(null, user)
            }else{
                return done(null, false, {message: 'Incorrect password'});
            }
        } catch (error) {
            return done(error)
        }
    }
    passport.use(new LocalStrategy({usernameField: 'number'}, authenticateUser));

    passport.serializeUser((user, done) => { return done(null, user.id)});
    passport.deserializeUser((id, done) => {
        UsersModal.findById({_id: id}, (err, user) => {
            done(err, user);
        })
    })
}

module.exports = initPassport;
