const mongoose = require('mongoose');

const bcrypt = require('bcrypt');

var jwt = require('jsonwebtoken');


const userschema = new mongoose.Schema({

    username : {
        type : String, 
        require : true, 
    },
    email : {
        type : String, 
        require : true, 
    },
    password : {
        type : String, 
        require : true, 
    },
    phone : {
        type : Number, 
        require : true, 
    },
    photo : {
        type : String,
        default : "default.jpg",
    },
    bio : {
        type : String,
        default : "React developr ^_^",
    },
    github : {
        type : String,
        default : "https://github.com/anshul00000",
    },
    linkedin : {
        type : String,
        default : "https://www.linkedin.com/in/anshul-chaurasiya/",
    },
    followers :[{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
    }],
    
    following :[{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
    }]
}) ;





// userschema.pre("save",  async function(next){
    //  console.log('pre method ' , this );
  
    // const user = this;


    // if(this.isModified("password")){
       

    //    console.log("password is modified");
        
      
    // }else{
    //     console.log("password not modified ");
       
 
    // }

// })



userschema.methods.generateToken = async function(){
    
    try {

        return jwt.sign({

            userId : this._id.toString(),
            email : this.email,
            username : this.username,

        }, process.env.jwt_key ,
          {
            expiresIn :"30d",
        },  )
        
    } catch (error) {
        console.error(error);
        next(error);
    }

}
 
  
//  *********************************
//  ****   password comparing  ******
//  *********************************


userschema.methods.password_compar = async function(password){

    
   const a =  bcrypt.compare(password, this.password).then(function(result) {
        // result == true
        return result ; 
    });

        return a ;

    
}




 const User = new mongoose.model("User" ,userschema); 

 module.exports = User;