const createError = require("http-errors");
const express = require("express");
const path = require("path");
const session = require("express-session");
const mongoose = require("mongoose");
const logger = require("morgan");
const MongoStore = require("connect-mongo");
const flash = require("connect-flash");
const dotenv = require("dotenv").config();

// import routes
const indexRouter = require("./routes/pages");
const usersRouter = require("./routes/auth");

const app = express();

// sessions
// using mongo for the session store
app.use(
  session({
    name: "session.sid",
    store: MongoStore.create({ mongoUrl: process.env.DB_CONNECTION }),
    secret: process.env.SECRET_KEY,
    cookie: { maxAge: 1000 * 60 * 60 }, // 1 hour
    saveUninitialized: false,
    resave: false,
  })
);

app.use(flash());

// connect to db
mongoose.connect(
  process.env.DB_CONNECTION,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log("Connected to DB")
);

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

// route middleware
app.use("/", indexRouter);
app.use("/auth", usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error", { title: "Session Example - Error" });
  
});

module.exports = app;
