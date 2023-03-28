let database = require("../database");
const passport = require("../middleware/passport");

let authController = {
  login: (req, res) => {
    res.render("../views/login.ejs");
  },

  register: (req, res) => {
    res.render("/register");
  },

  loginSubmit: passport.authenticate("local", {
    successRedirect: "/reminders",
    failureRedirect: "/login",
  }),


};

module.exports = authController;
