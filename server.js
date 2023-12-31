const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const User = require("./models/userModel");
const bcrypt = require("bcrypt");
const passport = require("passport");
const passportSetup = require("./config/passportAuth");
const cookieSession = require("cookie-session");

const app = express();

app.set("views", __dirname + "/views");
app.use(express.static(__dirname + "/public"));

app.engine("html", require("ejs").renderFile);
app.set("view engine", "ejs");

app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [process.env.COOKIE_SESSION_KEY],
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(passport.session());

const port = process.env.PORT;

//ROUTES

app.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile"],
  })
);
app.get("/auth/google/redirect", (req, res) => {
  res.send("redirected to this URI");
});

app.get("/", (req, res) => {
  res.render("index.html");
});

app.get("/login", (req, res) => {
  res.render("login.ejs");
});

//signup server
app.get("/signup", (req, res) => {
  res.render("signup.ejs");
});

app.post("/login", async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const user = await User.findOne({ email: email });

    if (user) {
      // the user succesfully logedin
      res.redirect("/");
    } else {
      console.log("user not found");
    }
  } catch (error) {
    // res.json({ message: error.message });
    res.json({ message: error.message });
  }
});

app.post("/signup", async (req, res) => {
  try {
    let email_ = req.body.email;
    let username_ = req.body.username;
    let password_ = await bcrypt.hash(req.body.password, 10);

    const userData = {
      email: email_,
      username: username_,
      password: password_,
    };
    const user = await User.create(userData);
    res.status(200).json(users);
    res.redirect("/login");
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

mongoose.set("strictQuery", false);
mongoose
  .connect(
    `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@tictactoeapi.e1ttns0.mongodb.net/TicTacToeAPI?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
