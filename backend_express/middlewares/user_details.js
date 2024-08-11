var jwt = require('jsonwebtoken');
const User = require("../models/user_model");

const project = require("../models/projects_model");


const user_details = async (req , res , next)=>{

     const tooken = req.header("Authorization");

    //  console.log("value of tooken is = " ,  tooken);

    //  if(tooken){

     

    //  res.send("data is not provide");

    // res.json({msg : "data is not provided"});


    // res.json({message : "please login kijiye "});



    //  if(tooken === null){
    //  


   try {
       
       var decoded = await jwt.verify(tooken, process.env.jwt_key);
       
       const user_id =  decoded.userId ;
       
       const user_deails = await User.findOne({email : decoded.email} ).select({password : 0 ,}) ; 
       
       const project_details = await project.find({owner : user_id}).populate('owner', '-password');


      //  .select({password : 0 }) ;

    //    .populate('owner')
         
    //    

    //    console.log(project_details);

    // console.log(tooken);


    //    console.log(user_deails);
       
       req.user = user_deails;

       req.project = project_details;


       next();


   


    } catch (error) {
        
        // console.log("tooken varification error ");
        return res.json({msg : "login kijiye phle tooken verifaction error"});
    }
    



// }else{

//    res.json({msg : "please login kijiye "});
        
// }
};

module.exports = user_details ; 