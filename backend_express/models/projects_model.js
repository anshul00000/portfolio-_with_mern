const mongoose = require('mongoose');


const project_schema = new mongoose.Schema({

    name: { type: String, required: true },

    description: { type: String, required: true },
   
    technologys: { type: String, required: true },
   
    github_link: { type: String, required: true },
   
    online_link: { type: String },
  
    image : { type: String, default : "default.jpg"},

    owner : { 
      type: mongoose.Schema.Types.ObjectId,
       ref: 'User',
        required: true },
    
     // other fields

  });

const project = new mongoose.model("project" , project_schema) ; 

module.exports = project ; 
  