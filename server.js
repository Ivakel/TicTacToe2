const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const User = require("./models/userModel");
const bcrypt = require("bcrypt");

const app = express();

app.set("views", __dirname + "/views");
app.use(express.static(__dirname + "/public"));

app.engine("html", require("ejs").renderFile);
app.set("view engine", "ejs");

// app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const port = 5001;

let users = [];

//ROUTES
app.get("/", (req, res) => {
  res.render("index.html");
});

app.post("/login", async (req, res) => {
  try {
    res.render("login.ejs");

    const email_ = req.body.email;
    const password_ = req.body.password;
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

app.get("/signup", (req, res) => {
  res.render("signup.ejs");
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
