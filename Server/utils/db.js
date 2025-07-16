const mongoose = require('mongoose');

const url = process.env.MONGO_URL;

const connectDB = async () => {
    try {
        await mongoose.connect(url); 
        console.log("Connected Successfully");
    } catch (error) {
        console.log("Connection Failed:", error.message);
        process.exit(0);
    }
};

module.exports = connectDB;
