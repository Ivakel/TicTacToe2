const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();

const app = express();
const a = 0;

const port = process.env.PORT || 5000;

app.get("/api/contacts", (request, responce) => {
  responce.send("Get all contacts");
});

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
