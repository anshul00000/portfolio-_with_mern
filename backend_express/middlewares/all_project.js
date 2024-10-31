const project = require("../models/projects_model");


const all_project =async(req , res , next) =>{


    try {

        const project_details = await project.find().populate('owner', '-password');

        req.project = project_details;



        next();
        
    } catch (error) {
        
        console.log("Error is = ", error);
        return res.json({message : "all_project error from server"});


    }


}


module.exports = all_project ; 
