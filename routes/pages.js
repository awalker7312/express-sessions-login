const express = require("express");
const router = express.Router();

// Get dashboard or sign in page if not signed in
router.get("/", loggedIn, function (req, res, next) {
  res.render("dashboard", {
    userName: req.session.userName,
  });
});

// Get sign in page if not signed in
router.get("/login", function (req, res, next) {
  if (req.session.loggedIn === true) {
    res.redirect("/");
  } else {
    res.render("login", {
      error_msg: req.flash("error"),
      success_msg: req.flash("success"),
    });
  }
});

// logout and redirect to sign in page
router.get("/logout", async (req, res) => {
  if (req.session.loggedIn === true) {
    req.session.loggedIn = false;
    req.session.
    req.flash("success", "Successfully logged out.")
  }
  res.redirect("/login");
});

// check if logged in - middleware
function loggedIn(req, res, next) {
  if (req.session.loggedIn === true) {
    next();
  } else {
    res.redirect("/login");
  }
}

module.exports = router;
