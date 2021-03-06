const UsersModal = require('../models/users');
const bcrypt = require('bcrypt');

//------------------------------------------------------------------ Home ---------------------------------------------------------------------//
const getHome = (req, res) => {
    res.render('home', {user: req.user})
}
//------------------------------------------------------------------ Home ---------------------------------------------------------------------//


//------------------------------------------------------------------ Logout ---------------------------------------------------------------------//
const logout = (req, res) => {
    req.logout();
    req.flash('success_msg', 'You are logged out');
    res.redirect('/');
}
//------------------------------------------------------------------ Logout ---------------------------------------------------------------------//



//------------------------------------------------------------------  Water purifier Route ---------------------------------------------------------------------//

const getWaterPurifier = async (req, res) => {
    res.render('water_purifier', {user: req.user});
}

//------------------------------------------------------------------  Water purifier Route ---------------------------------------------------------------------//



//------------------------------------------------------------------ Solar ---------------------------------------------------------------------//
const getSolar = (req, res) => {
    res.render('solar', {user: req.user});
}
//------------------------------------------------------------------ Solar ---------------------------------------------------------------------//



//------------------------------------------------------------------ Real Estate ---------------------------------------------------------------------//
const getRealEstate = (req, res) => {
    res.render('real_estate', {user: req.user})
}
//------------------------------------------------------------------ Real Estate ---------------------------------------------------------------------//


//------------------------------------------------------------------ Admin ---------------------------------------------------------------------//
const getAdmin = async (req, res) => {
    const users = await UsersModal.find({});
    res.render('admin', {users: users, user: req.user})
}
//------------------------------------------------------------------ Admin ---------------------------------------------------------------------//



//------------------------------------------------------------------ Login ---------------------------------------------------------------------//
const getLogin = (req, res) => {
    res.render('login');
}
//------------------------------------------------------------------ Login ---------------------------------------------------------------------//


//------------------------------------------------------------------ Register ---------------------------------------------------------------------//

const postRegister = async (req, res) => {
    const {name, email, number, role, password, password2} = req.body;
    let errors = [];

    if (!name || !number || !password || !role || !password2) {
        errors.push({ msg: "Please enter all fields" });
    }
    if (password !== password2) {
        errors.push({ msg: "Passwords do not match" });
    }
    if (password.length < 6) {
        errors.push({ msg: "Password must be at least 6 characters" });
    }
    if (errors.length > 0) {
        res.render("admin", {
          errors,
          email,
          name,
          number,
        });
    }else{
        UsersModal.findOne({mobileNumber: number}).then(user => {
            if(user){
                errors.push({msg: "User with that number already exists"});
                res.render("admin", {
                    errors,
                    email,
                    name,
                    number,
                });
            }else{
                const newUser = new UsersModal({
                    name: name,
                    email: email,
                    mobileNumber: number,
                    role: role,
                    password: password
                });

                // newUser.save().then(user => {
                //     req.flash('success_message', 'You are now registered and can login');
                // });
                // res.redirect('/login');

                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if(err) throw err;
                        newUser.password = hash;
                        newUser.save().then(user => {
                            req.flash('success_msg', 'A user added successfully');
                        });
                        res.redirect('/admin');
                    });
                });
            }
        })
    }
}
//------------------------------------------------------------------ Register ---------------------------------------------------------------------//

const postRemoveUser = async (req, res) => {
    await UsersModal.findByIdAndRemove({_id: req.body.id});
    res.redirect('/admin')
}

const postUpdateUser = async (req, res) => {
    const {id, name, email, number, role, password, password2} = req.body;
    let errors = [];

    if (!name || !number || !password || !role || !password2) {
        errors.push({ msg: "Please enter all fields" });
    }
    if (password !== password2) {
        errors.push({ msg: "Passwords do not match" });
    }
    if (password.length < 6) {
        errors.push({ msg: "Password must be at least 6 characters" });
    }
    if (errors.length > 0) {
        res.render("admin", {
          errors,
          email,
          name,
          number,
        });
    }else{
        const userToUpdate = await UsersModal.findById({_id: id});
        userToUpdate.name = name;
        userToUpdate.email = email;
        userToUpdate.mobileNumber = number;
        userToUpdate.role = role;

        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(password, salt, (err, hash) => {
                if(err) throw err;
                userToUpdate.password = hash;
                userToUpdate.save().then(user => {
                    req.flash('success_msg', 'A user updated successfully');
                });
                res.redirect('/admin');
            });
        });

        // UsersModal.findOne({mobileNumber: number}).then(user => {
        //     if(user){
        //         errors.push({msg: "User with that number already exists"});
        //         res.render("admin", {
        //             errors,
        //             email,
        //             name,
        //             number,
        //         });
        //     }else{
        //         const newUser = new UsersModal({
        //             name: name,
        //             email: email,
        //             mobileNumber: number,
        //             role: role,
        //             password: password
        //         });

        //         // newUser.save().then(user => {
        //         //     req.flash('success_message', 'You are now registered and can login');
        //         // });
        //         // res.redirect('/login');

        //         bcrypt.genSalt(10, (err, salt) => {
        //             bcrypt.hash(newUser.password, salt, (err, hash) => {
        //                 if(err) throw err;
        //                 newUser.password = hash;
        //                 newUser.save().then(user => {
        //                     req.flash('success_msg', 'A user added successfully');
        //                 });
        //                 res.redirect('/admin');
        //             });
        //         });
        //     }
        // })
    }
}


module.exports = { 
    getHome, 
    getWaterPurifier,
    getSolar, 
    getRealEstate, 
    getAdmin, 
    getLogin,
    postRegister,
    logout,
    postRemoveUser,
    postUpdateUser,
};