const mongoose = require('mongoose');


// const uri = "mongodb://127.0.0.1:27017/mern_admin" ; //✔️
 

// const uri = "mongodb+srv://anshul_mongos:an12ul34%40db@cluster0.xmif556.mongodb.net/mern_admin?retryWrites=true&w=majority&appName=Cluster0";


// const uri = "mongodb+srv://anshul_mongos:an12ul34%40db@cluster0.xmif556.mongodb.net/mern_admin";   //✔️


const uri = process.env.mongodb_uri;    //✔️

// const uri = "fdfbdfbdf" ; 

// mongoose.connect(uri);
 
const connectdb = async () => {
    try {

        await mongoose.connect(uri);
        console.log("MongoDB connected");

        return true ;
    
    } catch (error) {

        console.error("database connection failed ");
        return false ;
        // process.exit(0);
    }
}


module.exports = connectdb;