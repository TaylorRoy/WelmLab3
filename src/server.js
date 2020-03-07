require('dotenv').config();

const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const logger = require('morgan');
const sgMail = require('@sendgrid/mail');
var keys = require('../keys')

// console.log(keys.sendgrid.id);
// console.log(keys.sendgrid.secret);

var app = express();
//set port
var PORT = process.env.PORT || 3000;

//set up a log for request and response
app.use(logger("dev"));

// Sets up the Express app to parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//tell express where to serve static JS,CSS files from.
app.use("/static", express.static('./static'));

mongoose.connect("mongodb://localhost/tumorInfo", { useNewUrlParser: true});

mongoose.connection.once("open", function(){
  console.log("MongoDB Connection Successful.");
}).on("error", function(error){
  console.log("MongoDB Connection Error", error);
})

//ROUTES
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
app.get("/tumorInfo", function (req, res) {
  res.sendFile(path.join(__dirname, "./tumorinfo.html"));
});



app.post('/api/tumorOrder', function (req, res) {
  sgMail.setApiKey(keys.sendgrid.secret);
  const msg = {
      to: 'tbroy@hotmail.com',
      from: req.body.email,
      // from: 'tbroy@hotmail.com',
      subject: 'Tumor Sample Order Website',
      text: req.body.message, 
      // text: 'data test',
      html: '<strong>' + req.body.first_name + " " + req.body.last_name + " requested: " + req.body.message + "  I can be contacted at: " + req.body.phone + '</strong>',
  };
  sgMail.send(msg).then(response => {
      res.send({status:200, message:"We'll hit you up"})
  }).catch(err => {
      res.send({err:err})
  })
})

app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT);
});