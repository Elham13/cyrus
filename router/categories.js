const express = require("express");
const passport = require("passport");
const router = express.Router();
const {
  ensureAuthenticated,
  forwardAuthenticated,
  checkRole,
} = require("../config/auth");

const {
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
} = require("./routes");

// Home
router.get("/", getHome);

// Logout
router.delete("/logout", logout);

// Water purifier
router.get("/wp", ensureAuthenticated, getWaterPurifier);
// router.get('/wp', getWaterPurifier);

// Water purifier
// router.get('/solar', getSolar);
router.get("/solar", ensureAuthenticated, getSolar);

// Real estate
// router.get('/re', getRealEstate);
router.get("/re", ensureAuthenticated, getRealEstate);

// Admin
// router.get('/admin', getAdmin);
router.get("/admin", ensureAuthenticated, checkRole("", ""), getAdmin);
// router.get("/admin", getAdmin);
router.post("/romoveUser", postRemoveUser);
router.post("/updateUser", postUpdateUser);

// Login
router.get("/login", forwardAuthenticated, getLogin);
router.post(
  "/login",
  forwardAuthenticated,
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true,
  })
);

// Register
router.post("/register", postRegister);

module.exports = router;
