const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const User = require("./models/userModel");

const app = express();

app.use(express.json());

const port = process.env.PORT || 5000;

app.get("/api/contacts", (req, res) => {
  res.send("Get all contacts");
});

app.post("/api/signup", async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(200).json(user);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
  // console.log(req.body);
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
