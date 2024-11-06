require("dotenv").config();

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');

//  extra routes
const cors = require("cors");

const bodyParser = require('body-parser');

// error handler
const errormiddleware = require("./middlewares/error_middleware");



var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use('/public', express.static(path.join(__dirname, 'public')));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// for multer i dont know what is this ❌

// app.use('/uploads', express.static(path.join(__dirname, '../frontend_react/public/users')));

// const react_url = "http://localhost:5173";    //✔️

// const react_url = "https://66bbd54e9028aeb3f6537274--superb-bublanina-ddc5e7.netlify.app"

// final react url

const react_url = "https://anshulportfolio00.netlify.app"     //✔️


// extra routs 
const corsOptions = {
  origin : react_url ,
//  methods : "GET , POST , PUT , DELETE  , PATCH",
 methods : ["GET", "POST", "PUT", "DELETE", "PATCH"],

 Credential : true ,
} 

app.use(cors(corsOptions));

app.use(bodyParser.json());


app.use('/', indexRouter);
// app.use('/users', usersRouter);




// catch 404 and forward to error handler


app.use(function(req, res, next) {
  
  next(createError(404));

});

// error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};
// ``
//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });



// throw error from next() function 

app.use(errormiddleware);


module.exports = app;
