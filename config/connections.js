// Importing the mongoose library
const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/Friends");

// Exporting the connection to the database as a module
module.exports = mongoose.connection;
