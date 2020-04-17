const path = require("path");
// Require Express to run server and routes.
const express = require("express");

// Load environment variables.
const dotenv = require("dotenv");
dotenv.config();

// Start up an instance of app.
const app = express();

// Configuring express to use body-parser as middle-ware.
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Cors for cross origin allowance.
const cors = require("cors");
app.use(cors());

// Initialize the main project folder.
app.use(express.static("dist"));

// Set up the server.
const port = 8081;
app.listen(port, () => {
  console.log(`running on localhost: ${port}`);
});
console.log(process.env);
// Set aylien API credentias.
const aylien = require("aylien_textapi");
const textapi = new aylien({
    application_id: process.env.API_ID,
    application_key: process.env.API_KEY
});

// Get Route.
app.get("/", function(req, res) {
  res.sendFile("dist/index.html");
});

// Post Route.
app.post("/article", (req, res) => {
  textapi.sentiment({ url: req.body.url }, (error, response) => {
    if (error === null) {
      res.send(response);
    }
  });
});
