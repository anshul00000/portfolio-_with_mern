const mongoose = require('mongoose');


const file_schema = new mongoose.Schema({

    file_name : {
        type : String, 
        require : true, 
    },
    file : {
        type : String, 
        require : true, 
    },
    

}); 


const file = new mongoose.model("file" , file_schema) ; 

module.exports = file ; 