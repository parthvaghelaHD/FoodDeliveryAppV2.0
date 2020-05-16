const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const session = require('express-session');
const path = require('path');
const cookieParser = require('cookie-parser');
const ejs = require('ejs')
const bodyParser = require('body-parser');
const flash = require('req-flash');
require('dotenv').config();
//required all routes
const router = require('./routes/routes');

const app = express();

mongoose.connect(
  process.env.mongoURL,
  {
    useCreateIndex : true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  },
  (err, res) => {
    if (!err) {
      console.log('Connection established with mongodb .....!!');
    }else{
      console.log('something went wrong for mongodb connection..!!')
    }
  }
);

//set view engine as ejs
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, "/public")));
app.set('view engine', 'ejs');
// bodyParser
app.use(express.json());
app.use(bodyParser.text());
app.use(bodyParser.urlencoded({ extended: false }));
// morgan for displaying a time of req res
app.use(morgan('dev'));
app.use(cookieParser());
// for handling session
app.use(session({
  secret: 'djhxcvxfgshajfgjhgsjhfgsakjeauytsdfy',
  resave: false,
  saveUninitialized: true
  }));
  app.use(flash());

// all routers require
app.use(router);

module.exports = app;