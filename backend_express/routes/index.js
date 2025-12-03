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
const { user_details, all_user_details } = require('../middlewares/user_details');

// user_details
const all_project = require('../middlewares/all_project');

// const upload = require('../middlewares/multer_mid_.js');
const axios = require("axios");
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() }); // Store file in memory

const IMGBB_API_KEY = process.env.IMGBB_API_KEY || "da1525012fc530ebe43bac497e762627";

// require form-data for server-side multipart building
const FormData = require('form-data');

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

  } else {


    const userexist = await User.findOne({ email });

    if (userexist) {

      return res.status(400).json({ message: 'email alwrad exist try again another one ', status: 400 });
    }

    if (!email) return res.status(400).json({ message: 'Email is required', status: 400 });

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

  if (otpStore[email] == otp) {
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
      return res.json({ isFollower, isFollowing });
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


    const project_details = await Project_schema.find({ owner: user_id }).populate('owner');

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

  const image = req.file;
  const { name, description, technologys, github_link, online_link, owner } = req.body;

  if (name === "" && description === "" && technologys === "" && github_link === "") {
    res.json({ message: "Name , Description , Technologys , github_link Important Pleae filup these feeldes" });
  } else {
    if (!image) {
      const response = await Project_schema.create({ name, description, technologys, github_link, online_link, owner });
      res.json(response);
    } else {
      const formData = new FormData();
      formData.append("key", IMGBB_API_KEY);
      formData.append("image", req.file.buffer.toString("base64"));

      // ImgBB API ko request bhejo
      const response = await axios.post("https://api.imgbb.com/1/upload", formData, {
        headers: formData.getHeaders ? formData.getHeaders() : { "Content-Type": "multipart/form-data" },
        maxBodyLength: Infinity
      });

      const image_name = response.data.data.url;
      const response2 = await Project_schema.create({ name, description, technologys, github_link, online_link, image: image_name, owner });

      res.json(response2);
    }
  }
});


//  ***********************************
//  ****   user update route  ******
//  *********************************** 

// Helper: safe JSON parse for arrays or comma-separated strings
function safeJsonParse(value) {
  if (value === undefined || value === null) return undefined;
  if (typeof value === 'object') return value;
  if (typeof value !== 'string') return undefined;
  try {
    return JSON.parse(value);
  } catch (e) {
    // fallback: comma-separated string => array
    return value.split(',').map(s => s.trim()).filter(Boolean);
  }
}

function normalizeEducationArray(arr) {
  if (!Array.isArray(arr)) return [];
  return arr.map(item => ({
    type: item.type || 'college',
    institution: item.institution || '',
    degree: item.degree || '',
    fieldOfStudy: item.fieldOfStudy || '',
    startYear: item.startYear ? Number(item.startYear) : undefined,
    endYear: item.endYear ? Number(item.endYear) : undefined,
    description: item.description || ''
  }));
}

function normalizeExperienceArray(arr) {
  if (!Array.isArray(arr)) return [];
  return arr.map(item => ({
    company: item.company || '',
    role: item.role || '',
    location: item.location || '',
    startDate: item.startDate ? new Date(item.startDate) : undefined,
    endDate: item.endDate ? new Date(item.endDate) : undefined,
    currentlyWorking: !!item.currentlyWorking,
    description: item.description || ''
  }));
}

function normalizeCertificationsArray(arr) {
  if (!Array.isArray(arr)) return [];
  return arr.map(item => ({
    title: item.title || '',
    issuer: item.issuer || '',
    issueDate: item.issueDate ? new Date(item.issueDate) : undefined,
    credentialUrl: item.credentialUrl || ''
  }));
}

router.route('/updateuser/:id').patch(user_details, upload.single('image'), async (req, res) => {
  try {
    const id = req.params.id;

    // Basic scalars
    const {
      username,
      bio,
      github,
      linkedin,
      role,
      website,
      resumeUrl,
      location,
      isFresher
    } = req.body;

    // Parse arrays (frontend sends JSON strings)
    const educationRaw = safeJsonParse(req.body.education);
    const experienceRaw = safeJsonParse(req.body.experience);
    const certificationsRaw = safeJsonParse(req.body.certifications);
    const skillsRaw = safeJsonParse(req.body.skills);

    const education = educationRaw ? normalizeEducationArray(educationRaw) : undefined;
    const experience = experienceRaw ? normalizeExperienceArray(experienceRaw) : undefined;
    const certifications = certificationsRaw ? normalizeCertificationsArray(certificationsRaw) : undefined;
    const skills = Array.isArray(skillsRaw) ? skillsRaw.map(s => String(s)) : (typeof skillsRaw === 'string' ? skillsRaw.split(',').map(s => s.trim()).filter(Boolean) : undefined);

    // Build update object only with provided fields
    const updateObj = {};
    if (typeof username !== 'undefined') updateObj.username = username;
    if (typeof bio !== 'undefined') updateObj.bio = bio;
    if (typeof github !== 'undefined') updateObj.github = github;
    if (typeof linkedin !== 'undefined') updateObj.linkedin = linkedin;
    if (typeof role !== 'undefined') updateObj.role = role;
    if (typeof website !== 'undefined') updateObj.website = website;
    if (typeof resumeUrl !== 'undefined') updateObj.resumeUrl = resumeUrl;
    if (typeof location !== 'undefined') updateObj.location = location;
    if (typeof isFresher !== 'undefined') updateObj.isFresher = isFresher;
    if (typeof education !== 'undefined') updateObj.education = education;
    if (typeof experience !== 'undefined') updateObj.experience = experience;
    if (typeof certifications !== 'undefined') updateObj.certifications = certifications;
    if (typeof skills !== 'undefined') updateObj.skills = skills;

    // If no file uploaded: update and respond
    if (!req.file) {
      const updated = await User.findByIdAndUpdate(id, updateObj, { new: true }).select('-password');
      if (!updated) return res.status(404).json({ message: 'User not found' });
      return res.json({ message: 'Details updated successfully', user: updated });
    }

    // If image uploaded, upload to ImgBB
    const fileBuffer = req.file.buffer;
    if (!fileBuffer) {
      // Fallback: update other fields, image not processed
      const updated = await User.findByIdAndUpdate(id, updateObj, { new: true }).select('-password');
      if (!updated) return res.status(404).json({ message: 'User not found' });
      return res.json({ message: 'Details updated (image missing)', user: updated });
    }

    const formData = new FormData();
    formData.append('key', IMGBB_API_KEY);
    formData.append('image', fileBuffer.toString('base64'));

    const imgbbResp = await axios.post('https://api.imgbb.com/1/upload', formData, {
      headers: formData.getHeaders ? formData.getHeaders() : { 'Content-Type': 'multipart/form-data' },
      maxBodyLength: Infinity
    });

    const imageUrl = imgbbResp?.data?.data?.url;
    if (imageUrl) updateObj.photo = imageUrl;

    const updatedUser = await User.findByIdAndUpdate(id, updateObj, { new: true }).select('-password');
    if (!updatedUser) return res.status(404).json({ message: 'User not found' });

    return res.json({ message: 'Details and image updated successfully', user: updatedUser });
  } catch (error) {
    console.error('Update user error:', error);
    return res.status(500).json({ message: "Couldn't update user", error: error.message || error });
  }
});


//  ***********************************
//  ****   Project update route  ******
//  *********************************** 

router.route('/updateproject/:id').patch(user_details, upload.single('image'), async (req, res) => {

  try {

    const image = req.file;
    const id = req.params.id;
    const { name, description, technologys, github_link, online_link } = req.body;
    if (!image) {
      const project = await Project_schema.findByIdAndUpdate(id, { name, description, technologys, github_link, online_link }, { new: true });
      if (!project) {
        console.log("Project not found");
        res.json('Project not found');

      } else {
        res.json({ message: "update project sussefully ", updatedproject: project });
      }

    } else {

      const formData = new FormData();
      formData.append("key", IMGBB_API_KEY);
      formData.append("image", req.file.buffer.toString("base64"));

      // ImgBB API ko request bhejo
      const imgresponse = await axios.post("https://api.imgbb.com/1/upload", formData, {
        headers: formData.getHeaders ? formData.getHeaders() : { "Content-Type": "multipart/form-data" },
        maxBodyLength: Infinity
      });

      const image_name = imgresponse.data.data.url;

      const project = await Project_schema.findByIdAndUpdate(id, { name, description, technologys, image: image_name }, { new: true });

      if (!project) {
        console.log("Project not found");
        res.json('Project not found');

      } else {
        res.json({ message: "update project sussefully ", updatedproject: project });
      }
    }
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

  try {
    await Project_schema.deleteOne({ _id: project_id });
    res.send({ message: `project delete completly` });
  } catch (error) {
    res.json({ message: `Error deleting error is ${error}` });
  }
});

module.exports = router;