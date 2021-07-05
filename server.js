require("dotenv").config();

const express = require("express");
const ejs = require("ejs");
const path = require("path");
const expressSession = require("express-session");
const passport = require("passport");
const flash = require("express-flash");
const methodOverride = require("method-override");

const router = require("./router/categories");
const wprouter = require("./router/waterpurifier");
const connectDB = require("./config/db");
const initPassport = require("./config/passport_config");

const app = express();

// Connect mongoDB
connectDB();

// Initialize passport
initPassport(passport);

// Ejs setup
app.set("views", "./client/views");
app.set("view engine", "ejs");

// express setup
app.use(express.static("./client/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Method ovverride
app.use(methodOverride("_method"));

// Exress session
app.use(
  expressSession({
    secret: "alkdsjflkjwer123134",
    resave: false,
    saveUninitialized: false,
  })
);

// Passport
app.use(passport.initialize());
app.use(passport.session());

// Flash
app.use(flash());

// Global variables
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  next();
});

// Routes
app.use("/", router);
app.use("/", wprouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started at port ${PORT}`));
