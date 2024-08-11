const mongoose = require('mongoose');


const contact_schema = new mongoose.Schema({

    name : {
        type : String, 
        require : true, 
    },
    email : {
        type : String, 
        require : true, 
    },
    message : {
        type : String, 
        require : true, 
    },

}); 


const contact = new mongoose.model("contact" , contact_schema) ; 

module.exports = contact ; 