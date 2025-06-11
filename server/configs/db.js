require("dotenv").config();
const mongoose = require("mongoose");

// const DB_URL = 'mongodb://localhost:27017/urlshortener';
const connect = () => {
    return mongoose.connect(process.env.DB_URL);
};

module.exports = connect;