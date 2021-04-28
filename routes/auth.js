const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const { registerValidation, loginValidation } = require("../models/validation");
//const session = require("express-session");

router.post("/register", async (req, res) => {
  //VALIDATION
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //CHECK IF USER ALREADY EXISTS
  const emailExists = await User.findOne({ email: req.body.email });
  if (emailExists) return res.status(400).send("Email already exists");

  //HASH THE PASSWORD
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  //CREATE USER
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
  });

  try {
    const savedUser = await user.save();
    res.send({ user: user._id });
  } catch (err) {
    res.status(400).send(err);
  }
});

//LOGIN
router.post("/login", async (req, res) => {
  //VALIDATION
  const { error } = loginValidation(req.body);
  if (error)
    return (
      req.flash("error", error.details[0].message) && res.redirect("/login")
    );

  //CHECK IF EMAIL EXISTS
  const user = await User.findOne({ email: req.body.email });
  if (!user)
    return req.flash("error", "User not found"), res.redirect("/login");

  //CHECK IF PASSWORD IS CORRECT
  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass)
    return req.flash("error", "Incorrect password"), res.redirect("/login");

  // LOGGED IN
  req.session.loggedIn = true;
  req.session.userName = user.name;
  res.redirect("/");
});

router.get("/", async (req, res) => {
  res.status(200).send("Howdy");
});

module.exports = router;
