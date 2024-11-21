var express = require('express');
var router = express.Router();

const connectdb = require('../database/db_connect');

let connect_db;


const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');


const dotenv = require('dotenv');


dotenv.config();

// Store OTP in memory (For production, use a database)
const otpStore = {};
 

const conect_fun = async () => {
  connect_db = await connectdb();  // to connect data base fore ferform querys 

  console.log(connect_db);
}

conect_fun();


const fs = require('fs');
const path = require('path');

const User = require('../models/user_model.js')
const contact_schema = require('../models/contact_model');
const Project_schema = require("../models/projects_model");

const bcrypt = require('bcrypt');

const { signupschema, loginschema, projectschema } = require("../models/Model_validation");

const { validate } = require("../middlewares/validater_middleware_");

const { my_anshul } = require("../middlewares/validater_middleware_");


// const {user_details , projects_details} = require('../middlewares/user_details');

const { user_details, all_user_details } = require('../middlewares/user_details')  ; 

// user_details

const all_project = require('../middlewares/all_project');


const upload = require('../middlewares/multer_mid_.js');


/* GET home page. */
// router.get('/', function(req, res, next) {
//   // res.render('index', { title: 'Express' });
//   res.send("Welcome to  Express hyy i am anshul chaurasiya 🙏🏻");
// });



//  *********************************
//  ****  otp route  ******
//  *********************************




// Set up Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'Gmail', // Use your email provider's SMTP server
  secure: true,
  port: 465,
  auth: {
    // process.env.mongodb_uri
    // user: process.env.EMAIL, // Your email
    // pass: process.env.EMAIL_PASSWORD, // Your email password


    // user: "chaurasiyaa448@gmail.com", // Your email
    user: "anshulemailid07@gmail.com", // Your email
    pass: "rjabjurbbyjckhsv", // Your email password
    // pass: 260504, // Your email password

  },
});


// Route to send OTP
router.route('/sendotp').post(async (req, res) => {

  const { email, forget } = req.body;

  if (!email) return res.status(400).json({ message: 'Email is required', status: 400 });

  if (forget) {


    const userexist = await User.findOne({ email });

    if (userexist) {

      // Generate a random 6-digit OTP
      const otp = Math.floor(100000 + Math.random() * 900000).toString();

      // Store OTP temporarily (expires in 5 minutes)
      otpStore[email] = otp;
      setTimeout(() => delete otpStore[email], 5 * 60 * 1000); // Delete OTP after 5 minutes

      // Send OTP via email
      const mailOptions = {
        // from: process.env.EMAIL,
        from: "anshulemailid07@gmail.com",
        to: email,
        subject: 'Your OTP Code',
        text: `Your OTP code is: ${otp}`,
      };

      try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'OTP sent to your email', status: 200 });
      } catch (error) {
        res.status(500).json({ message: 'Failed to send OTP', status: 500, error });
      }

    } else {
      return res.status(400).json({ message: 'email is not found', status: 400 });

    }

  }else {


  const userexist = await User.findOne({ email });

  if(userexist) {

    return res.status(400).json({ message: 'email alwrad exist try again another one ', status: 400 });
  }
  
  if(!email) return res.status(400).json({ message: 'Email is required', status: 400 });

  // Generate a random 6-digit OTP
  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  // Store OTP temporarily (expires in 5 minutes)
  otpStore[email] = otp;
  setTimeout(() => delete otpStore[email], 5 * 60 * 1000); // Delete OTP after 5 minutes

// Send OTP via email
const mailOptions = {
  // from: process.env.EMAIL,
  from: "anshulemailid07@gmail.com",
  to: email,
  subject: 'Your OTP Code',
  text: `Your OTP code is: ${otp}`,
};

try {
  await transporter.sendMail(mailOptions);
  res.status(200).json({ message: 'OTP sent to your email', status: 200 });
} catch (error) {
  res.status(500).json({ message: 'Failed to send OTP', status: 500, error });
}

}


});





// Route to verify OTP
router.route('/verifyotp').post((req, res) => {

  const { email, otp } = req.body;

  if(otpStore[email] == otp) {
    delete otpStore[email]; // OTP verified, remove it
    res.status(200).json({ message: 'OTP verified successfully', status: 200 });
  } else {
    // res.status(400).json({ message: `Invalid OTP or OTP expired ${otpStore[email]} , and your otp is ${otp}`, status: 400 });
    res.status(400).json({ message: `Invalid OTP or OTP expired`, status: 400 });
  }
});





//  *********************************
//  ****   register route  ******
//  *********************************


router.route('/').get(async (req, res) => {

  // res.render('index', { title: 'Express' });

  // res.send("Welcome to  Express hyy i am anshul chaurasiya 🙏🏻");

  await conect_fun();

  if (connect_db) {
    // console.log("✔️✔️✔️");

    res.json({ message: "true" });

  } else {
    // console.log("❌❌❌");
    res.json({ message: "false" });

  }



}).post(validate(signupschema), async (req, res) => {

  const { username, email, password, phone } = req.body;

  const userexist = await User.findOne({ email });

  if (userexist) {
    return res.status(400).json({ msg: "email alwrad exist in database" });
  } else {


    const saltRounds = 10;
    // const hash_password = bcrypt.hash(password, saltRounds,); this is not working 

    bcrypt.hash(password, saltRounds, async function (err, hash) {


      // Store hash in your password DB.


      const created_user = await User.create({ username, email, password: hash, phone });

      console.log("upload ho gai this is server side ☺️");

      res.json({ msg: "user created sussesfully ✔️✅", tooken: await created_user.generateToken(), userId: created_user._id.toString() });



    });

  }

})


//  *********************************
//  ****   login route  ******
//  *********************************



router.route('/login').get((req, res) => {

  res.send("hyy this is Login ✅🙄");

}).post(validate(loginschema), async (req, res) => {

  const { email, password } = req.body; // original line


  // const res_body = req.body;

  // console.log(email , password);

  // res.json({email , password}) ;




  const userexist = await User.findOne({ email });

  // console.log("find frocess is compleated ✔️");


  if (userexist) {


    // console.log("password matching precess is start  ✔️");

    const result = await userexist.password_compar(password);  // this is comparing password in database with password entered by user

    //  console.log("password matching precess is end  ✔️");

    //  res.json({result});

    if (result) {
      // res.send("password is correct ✅");

      res.json({ msg: "login succesfully ✔️", tooken: await userexist.generateToken(), userId: userexist._id.toString() });

    } else {
      res.json({ msg: "❌ invlid email or password ❌" });
    }


  } else {
    // res.send("❌ invalid email or password not found ");
    res.json({ msg: "invalid email or password / not found" });
  }

});



//  *********************************
//  **** forget route  ******
//  *********************************



router.route('/forget').post(async (req, res) => {

  const { email, password } = req.body;

  // res.json({ msg: email });

  if (password === "") {

    const userexist = await User.findOne({ email });

    // console.log("find frocess is compleated ✔️");


    if (userexist) {

      // res.json({ msg: email });


      res.json(true);


    } else {
      res.json(false);



    }



  } else {
    // res.json({ msg: password });


    try {

      const saltRounds = 10;

      bcrypt.hash(password, saltRounds, async function (err, hash) {



        await User.updateOne(
          { email: email },              // Query to find the document with name "Ram"
          { $set: { password: hash } } // Operation to insert the surname "Sharma"
        );



        console.log("upload ho gai this is server side ☺️");

        // res.json({ msg: "Password update sussesfully ✔️✅"});
        res.json(true);




      });


    } catch (error) {
      res.json(false);



    }



  }




});




//  *********************************
//  ****   contact route  ******
//  *********************************


router.route('/contact').get((req, res) => {

  res.send("hyy this is contact ✅🙄");

}).post(async (req, res) => {   //validate(contactschema) , // middleware to check validation 

  const body_data = req.body;
  // res.send(body_data);
  // console.log(body_data);


  const contact_ = await contact_schema.create(body_data);


  if (contact_) {
    res.json({ msg: "yas data is insert sussfully ✔️" });
  } else {
    res.json({ msg: "data is not send sussefully ❌" });
  }



});



//  *********************************
//  ****   follow   user ******
//  *********************************




router.route('/follow').post(user_details, async (req, res) => {

  try {
    const user_tooken = req.user;
    const { my_id, user_id } = req.body;

    if (!my_id || !user_id) {
      return res.status(400).json({ error: "my_id and user_id are required." });
    }

    // const project = await User.findByIdAndUpdate(user_id, { followers : my_id });


    const project = await User.findByIdAndUpdate(
      user_id,
      { $addToSet: { following: my_id } }, // Adds my_id if it's not already present
      { new: true } // Returns the updated document
    );

    const project2 = await User.findByIdAndUpdate(
      my_id,
      { $addToSet: { followers: user_id } }, // Adds my_id if it's not already present
      { new: true } // Returns the updated document
    );


    // const project = await Project_schema.updateOne({_id : id}, { $set : updateuserdata });

    // const project = await Project_schema.updateOne({_id : id}, { name, description, technologys});

    if (!project) {
      console.log("user not found");
      res.json('user not found');

    } else {


      res.json({ message: "update details sussefully ", updatedproject: project });


    }





    // Respond with both id and user_tooken if needed
    // res.json({ user_id });



  } catch (error) {
    console.error("Error in follow route:", error);
    res.status(500).json({ error: "Internal server error" });
  }

})



//  *********************************
//  **** check  follow   user ******
//  *********************************


router.route('/checkfollow').post(user_details, async (req, res) => {


  try {
    const user_tooken = req.user;  // This represents the current user making the request
    const { user_id } = req.body;  // ID of the user to check follow status against

    if (!user_id) {
      return res.status(400).json({ error: "user_id is required." });
    }

    // Fetch user_tooken with followers and following populated
    const populatedUser = await User.findById(user_tooken._id)
      .populate('followers', '_id')
      .populate('following', '_id');

    const isUserInFollowersOrFollowing = (user, targetUserId) => {
      const isFollower = user.followers.some(follower => follower._id.toString() === targetUserId);
      const isFollowing = user.following.some(following => following._id.toString() === targetUserId);
      return { isFollower, isFollowing };
    };

    const { isFollower, isFollowing } = isUserInFollowersOrFollowing(populatedUser, user_id);

    if (isFollower || isFollowing) {
      return res.json({ isFollower, isFollowing });
    } else {
      return res.json({isFollower, isFollowing });
    }

  } catch (error) {

    console.error("Error in checkfollow route:", error);
    res.status(500).json({ error: "Internal server error" });

  }

})


//  *********************************
//  ****   unfollow  user ******
//  *********************************

router.route('/unfollow').post(user_details, async (req, res) => {
  try {
    const user_token = req.user;
    const { my_id, user_id } = req.body;

    if (!my_id || !user_id) {
      return res.status(400).json({ error: "my_id and user_id are required." });
    }

    // Remove user_id from my_id's following list
    const project = await User.findByIdAndUpdate(
      my_id,
      { $pull: { followers: user_id } }, // Removes user_id from the following array
      { new: true }
    );

    // Remove my_id from user_id's followers list
    const project2 = await User.findByIdAndUpdate(
      user_id,
      { $pull: { following: my_id } }, // Removes my_id from the followers array
      { new: true }
    );

    // res.status(200).json({
    //   message: "Unfollowed successfully",
    //   myProfile: project,
    //   userProfile: project2,
    // });

    res.json({ message: "unfollow user sussefully ", updatedproject: project });


  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});





//  *********************************
//  ****   get  user ******
//  *********************************



//  , projects_details

router.route('/auser').post(async (req, res) => {

  const { user_id } = req.body;

  try {

    const user_deails = await User.findOne({ _id: user_id }).select({ password: 0, }).populate('followers', '-password').populate('following', '-password');

    // const project_details = await project.find({owner : user_id}).populate('owner', '-password');


    const project_details = await Project_schema.find({ owner: user_id });


    // req.user = user_deails;

    // req.project = project_details;

    res.json({ user_deails, project_details });



    // next();


  } catch (error) {

    // console.log("tooken varification error ");
    return res.json({ msg: "not find error " });
  }



  // const { id, password } = req.body; // original line


  // const userexist = await User.findOne({ email });


  // const user_tooken = req.user;

  // const project_data = req.project;

  // res.json({ user_tooken, project_data });




  // res.json("hyyy this is working !");



});




//  *********************************
//  ****  user route  ******
//  *********************************

//  , projects_details

router.route('/user').get(user_details, (req, res) => {

  const user_tooken = req.user;

  const project_data = req.project;

  res.json({ user_tooken, project_data });

  // res.json({user_tooken});

  // res.json({msg : user_tooken});

  // res.send("Anshul Chaurasiya is the only Admin");

});

//  *********************************
//  ****  all user route  ******
//  *********************************

//  , projects_details

router.route('/users').get(all_user_details, (req, res) => {

  const users = req.user;

  res.json({ users });

  // res.json({user_tooken});

  // res.json({msg : user_tooken});

  // res.send("Anshul Chaurasiya is the only Admin");

});


//  *********************************
//  ****   all project route  ******
//  *********************************

//  , projects_details

router.route('/allproject').get(all_project, (req, res) => {

  const all_project_data = req.project;

  // console.log(all_project_data);


  res.json({ all_project_data });

});

//  *********************************
//  ****   file route  ******
//  *********************************




router.route('/file').post(upload.single('image'), async (req, res) => {


  // const name = req.body.name;
  // const description = req.body.description;
  // const technologys = req.body.technologys;
  // const github_link = req.body.github_link;
  // const online_link = req.body.online_link;


  const image = req.file;

  const { name, description, technologys, github_link, online_link, owner } = req.body;


  if (name === "" && description === "" && technologys === "" && github_link === "") {

    res.json({ message: "Name , Description , Technologys , github_link Important Pleae filup these feeldes" });

  } else {

    // || file.length === 0 this term is not here because file is nor array

    if (!image) {

      // res.json({ message: 'No files uploaded, but text data received.', owner_is : owner ,name : name , description : description , technologys : technologys, github_link : github_link , online_link : online_link, });


      const response = await Project_schema.create({ name, description, technologys, github_link, online_link, owner });

      res.json(response);


    } else {

      const image_name = image.filename;

      // res.json({ message: 'Files and data received successfully.', owner_is: owner, name : name , description : description , technologys : technologys, github_link : github_link , online_link : online_link,  });

      const response = await Project_schema.create({ name, description, technologys, github_link, online_link, image: image_name, owner });

      res.json(response);


    }

  }

});



//  ***********************************
//  ****   user update route  ******
//  *********************************** 



//  ***********************************
//  ****   user update route  ******
//  *********************************** 



router.route('/updateuser/:id').patch(user_details, upload.single('image'), async (req, res) => {

  try {

    const image = req.file;

    const id = req.params.id;

    const { username, bio, github, linkedin } = req.body;


    if (!image) {

      // const updateuserdata = req.body;

      // const project = await Project_schema.findByIdAndUpdate(id, {  $set : updateuserdata}, { new: true });

      const project = await User.findByIdAndUpdate(id, { username, bio, github, linkedin }, { new: true });

      // const project = await Project_schema.updateOne({_id : id}, { $set : updateuserdata });

      // const project = await Project_schema.updateOne({_id : id}, { name, description, technologys});

      if (!project) {
        console.log("user not found");
        res.json('user not found');

      } else {


        res.json({ message: "update details sussefully ", updatedproject: project });


      }


    } else {

      const image_name = image.filename;

      const project = await User.findOne({ _id: id });

      const oldphotopath = project.photo;


      if (oldphotopath === "default.jpg") {


        const project = await User.findByIdAndUpdate(id, { username, bio, github, linkedin, photo: image_name }, { new: true });

        if (!project) {
          console.log("user not found");
          res.json('user not found');

        } else {


          res.json({ message: "update detais sussefully ", updatedproject: project });
        }


      } else {


        // const filePath = path.join(__dirname, '../../frontend_react/public/users', oldphotopath);


        const filePath = path.join(__dirname, '../public/images', oldphotopath);

        // Delete the file from the filesystem
        fs.unlink(filePath, async (err) => {

          // if (err) return res.json({ message: 'File deletion error', err });

          if (err) {
            if (err.code === 'ENOENT') {


              // File does not exist
              console.log(`File at ${filePath} not found, but the database entry exists.`);


              // You can still continue with your logic here


              // const project = await Project_schema.findByIdAndUpdate(id, { name, description, technologys , image : image_name }, { new: true });


              const project = await User.findByIdAndUpdate(id, { username, bio, github, linkedin, photo: image_name }, { new: true });


              if (!project) {
                // console.log("user not found");
                res.json('user not found');

              } else {


                res.json({ message: "update user sussefully ", updatedproject: project });
              }



            } else {
              // Some other error occurred
              return res.json({ message: 'File deletion error', err });
            }
          } else {
            // File successfully deleted

            console.log(`File at ${filePath} found, and also the database entry exists.`);


            // const project = await Project_schema.findByIdAndUpdate(id, { name, description, technologys , image : image_name }, { new: true });


            const project = await User.findByIdAndUpdate(id, { username, bio, github, linkedin, photo: image_name }, { new: true });


            if (!project) {
              console.log("user not found");
              res.json('user not found');

            } else {


              res.json({ message: "update user sussefully ", updatedproject: project });
            }






          }


        });


      }



    }

    // console.log("Project mil gya ");


    // res.json({message :"image mil gai " });

  }





  catch (error) {

    res.json({ message: " Couldn't update user", gadbad: error });

  }


})








//  ***********************************
//  ****   Project update route  ******
//  *********************************** 



router.route('/updateproject/:id').patch(user_details, upload.single('image'), async (req, res) => {

  try {

    const image = req.file;

    const id = req.params.id;

    const { name, description, technologys , github_link ,online_link } = req.body;


    if (!image) {

      // const updateuserdata = req.body;

      // const project = await Project_schema.findByIdAndUpdate(id, {  $set : updateuserdata}, { new: true });

      const project = await Project_schema.findByIdAndUpdate(id, { name, description, technologys ,github_link ,online_link }, { new: true });

      // const project = await Project_schema.updateOne({_id : id}, { $set : updateuserdata });

      // const project = await Project_schema.updateOne({_id : id}, { name, description, technologys});

      if (!project) {
        console.log("Project not found");
        res.json('Project not found');

      } else {


        res.json({ message: "update project sussefully ", updatedproject: project });


      }


    } else {

      const image_name = image.filename;

      const project = await Project_schema.findOne({ _id: id });

      const oldphotopath = project.image;


      if (oldphotopath === "default.jpg") {


        const project = await Project_schema.findByIdAndUpdate(id, { name, description, technologys, image: image_name }, { new: true });

        if (!project) {
          console.log("Project not found");
          res.json('Project not found');

        } else {


          res.json({ message: "update project sussefully ", updatedproject: project });
        }


      } else {


        // const filePath = path.join(__dirname, '../../frontend_react/public/users', oldphotopath);


        const filePath = path.join(__dirname, '../public/images', oldphotopath);

        // Delete the file from the filesystem
        fs.unlink(filePath, async (err) => {

          // if (err) return res.json({ message: 'File deletion error', err });

          if (err) {
            if (err.code === 'ENOENT') {


              // File does not exist
              console.log(`File at ${filePath} not found, but the database entry exists.`);


              // You can still continue with your logic here


              const project = await Project_schema.findByIdAndUpdate(id, { name, description, technologys, image: image_name }, { new: true });

              if (!project) {
                console.log("Project not found");
                res.json('Project not found');

              } else {


                res.json({ message: "update project sussefully ", updatedproject: project });
              }



            } else {
              // Some other error occurred
              return res.json({ message: 'File deletion error', err });
            }
          } else {
            // File successfully deleted

            console.log(`File at ${filePath} found, and also the database entry exists.`);


            const project = await Project_schema.findByIdAndUpdate(id, { name, description, technologys, image: image_name }, { new: true });

            if (!project) {
              console.log("Project not found");
              res.json('Project not found');

            } else {


              res.json({ message: "update project sussefully ", updatedproject: project });
            }






          }


        });


      }



    }

    // console.log("Project mil gya ");


    // res.json({message :"image mil gai " });

  }





  catch (error) {

    res.json({ message: " Couldn't update project", gadbad: error });

  }


})





//  ***********************************
//  ****   Project delete route  ******
//  *********************************** 


router.route('/deletefile/:id/image/:image').delete(async (req, res) => {

  const image_name = req.params.image;

  const project_id = req.params.id;

  // res.json({message :`image = ${image_name} and project_id = ${project_id}`}) ;


  if (image_name === "default.jpg") {


    try {


      await Project_schema.deleteOne({ _id: project_id });

      // const a = await Project_schema.findOne({ _id : project_id});

      res.send({ message: `project delete completly` });


    } catch (error) {

      res.json({ message: `Error deleting error is ${error}` });

    }


  } else {



    try {

      // const filePath = path.join(__dirname, '../../frontend_react/public/users', image_name);

      const filePath = path.join(__dirname, '../public/images', image_name);

      // Delete the file from the filesystem
      fs.unlink(filePath, async (err) => {

        if (err) return res.json({ message: 'File deletion error', err });

        try {

          await Project_schema.deleteOne({ _id: project_id });

          // const a = await Project_schema.findOne({ _id : project_id});

          res.send({ message: `project delete completly` });


        } catch (error) {

          res.json({ message: `Error deleting error is ${error}` });


        }


      });

    } catch (error) {


      res.json({ message: `image not delete some error = ${error}` });

    }


  }




});








module.exports = router;