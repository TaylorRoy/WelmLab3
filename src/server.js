const express = require('express');
const path = require('path');
// const fs = require('fs');
// const foldchange = require("./workdamnit");
// exports.fs = fs;

var app = express();
var PORT = process.env.PORT || 3000;

//tell express where to serve static JS,CSS files from.
app.use("/static", express.static('./static'));

// Sets up the Express app to handle data parsing
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

// app.use(express.static("assets"));

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "./index.html"));
});

app.get("/research", function (req, res) {
  res.sendFile(path.join(__dirname, "./research.html"));
});

app.get("/organoidFoldchange", function (req, res) {
  res.sendFile(path.join(__dirname, "./organoidFoldchange.html"));
});

app.get("/samples", function (req, res) {
  res.sendFile(path.join(__dirname, "./sampleList.html"));
});

app.get("/contact", function (req, res) {
  res.sendFile(path.join(__dirname, "./about.html"));
});

app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT);
});