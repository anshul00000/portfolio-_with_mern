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
       
       const user_deails = await User.findOne({email : decoded.email} ).select({password : 0 ,}).populate('followers', '-password').populate('following' , '-password') ; 
       
       const project_details = await project.find({owner : user_id}).populate('owner', '-password');

       
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


const all_user_details = async (req, res , next) => {


    
   try {
       
 
    
    const user_deails = await User.find().select({password : 0 ,}).populate('followers', '-password').populate('following' , '-password') ; 

    
    req.user = user_deails;


    next();


 } catch (error) {
     
     // console.log("tooken varification error ");
     return res.json({msg : "! kuch to gadbad h daya !"});


 }
 


};

module.exports = { user_details , all_user_details} ; 