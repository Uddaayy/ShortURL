const mongoose = require("mongoose");
require("dotenv").config();

// const DB_URL = 'mongodb://localhost:27017/urlshortener';
console.log("DB_URL is:", process.env.DB_URL); 
const connect = () => {
    return mongoose.connect(process.env.DB_URL);
};

module.exports = connect;