const mongoose = require('mongoose');

// const uri = "mongodb://127.0.0.1:27017/mern_admin";

const uri = process.env.mongodb_uri; 


// mongoose.connect(uri);
 
const connectdb = async () => {
    try {

        await mongoose.connect(uri);
        console.log("MongoDB connected");
    
    } catch (error) {

        console.error("database connection failed ");
        process.exit(0);
    }
}


module.exports = connectdb;