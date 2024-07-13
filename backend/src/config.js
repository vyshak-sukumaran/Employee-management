const mongoose = require('mongoose');

connectDB().catch(err => console.log(`Connection failed: ${err}`))

async function connectDB() {
    if (process.env.MONGO_URI) {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB");
    }
}

module.exports = connectDB;