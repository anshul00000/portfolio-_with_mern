var express = require('express');
var router = express.Router();

const connectdb = require('../database/db_connect');

connectdb();  // to connect data base fore ferform querys 

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

const user_details = require('../middlewares/user_details');


const upload = require('../middlewares/multer_mid_.js');


/* GET home page. */
// router.get('/', function(req, res, next) {
//   // res.render('index', { title: 'Express' });
//   res.send("Welcome to  Express hyy i am anshul chaurasiya 🙏🏻");
// });



//  *********************************
//  ****   register route  ******
//  *********************************


router.route('/').get((req, res) => {

  res.render('index', { title: 'Express' });

  // res.send("Welcome to  Express hyy i am anshul chaurasiya 🙏🏻");

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

  console.log("find frocess is compleated ✔️");


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
//  ****   user route  ******
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
//  ****   Project update route  ******
//  *********************************** 

router.route('/updateproject/:id').patch(user_details, upload.single('image'), async (req, res) => {

  try {

    const image = req.file;

    const id = req.params.id;

    const { name, description, technologys } = req.body;


    if (!image) {

      // const updateuserdata = req.body;

      // const project = await Project_schema.findByIdAndUpdate(id, {  $set : updateuserdata}, { new: true });

      const project = await Project_schema.findByIdAndUpdate(id, { name, description, technologys }, { new: true });

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


        const project = await Project_schema.findByIdAndUpdate(id, { name, description, technologys , image : image_name }, { new: true });

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


              const project = await Project_schema.findByIdAndUpdate(id, { name, description, technologys , image : image_name }, { new: true });

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
          

            const project = await Project_schema.findByIdAndUpdate(id, { name, description, technologys , image : image_name }, { new: true });

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


      res.json({ message: `imae not delete some error = ${error}` });

    }


  }




});








module.exports = router;