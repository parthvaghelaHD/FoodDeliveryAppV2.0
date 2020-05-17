const jwt = require("jsonwebtoken");
require("dotenv").config();
const bcrypt = require('bcryptjs');
const keys = require('../config/keys');
const Payment = require('../model/payment');
const stripe = require('stripe')(keys.stripeSecretKey);
const { sendWelcomeEmail , sendCanformationEmail } = require('../email/account');

const blogUser = require("../model/userModel");
const restaurant = require('../model/restaurant')
const { Message } = require("../commonFunction/commonfunction");

//register page render
function register(req, res) {
  res.render("register", { email: req.userName });
}

// login Page render
function getlogin(req, res) {
  res.render("login", { msg: req.flash("Error"), email: req.userName });
}

//get a home page
function getHome(req, res) {
  res.render("index", { msg: req.flash("Error"), email: req.userName });
}

//get a dashbord page after login
async function dashbord(req, res) {
  try {
      var found = await restaurant.find({ })
      let data = found.length;
      res.render("dashbord", { email: req.userName , found , data});
  } catch (err) {
    res.send(Message(400, false, `Error occured while finding restaurants : ${err}`));
  }
}

// logout function nd clear cookie
function logout(req, res) {
  res.clearCookie("token").redirect("/user/login");
}

async function charge(req, res) {
  const amount = 200000;
  try{
    await stripe.customers.create({
      email : req.body.stripeEmail,
      source : req.body.stripeToken,
    })
    .then(customer => stripe.charges.create({
      amount,
      description : 'secind product',
      currency : 'inr',
      customer : customer.id
    }))
    const addUser = new Payment({email : req.body.stripeEmail , amount })
    addUser.save();
    sendCanformationEmail(req.body.stripeEmail);
    res.render('success');
  }catch(err){
      console.log(err)
      res.redirect('/');
    }
}

// contact us page
function contact(req, res){
  res.render('contact-us');
}

function MenuForTheGrandThakar(req, res){
  res.render('MenuTheGrandThakar', {
    stripePublishableKey : keys.stripePublishableKey
  });
}

function MenuAmrutRestaurant(req, res){
  res.render('MenuAmrutRestaurant', {
    stripePublishableKey : keys.stripePublishableKey
  });
}

function MenuForAppleBite(req, res){
  res.render('MenuAppleBite', {
    stripePublishableKey : keys.stripePublishableKey
  });
}

function MenuForJassiDeParathe(req, res){
  res.render('MenuJassiDeParathe', {
    stripePublishableKey : keys.stripePublishableKey
  });
}

function MenuForLordsBanquetRestaurant(req, res){
  res.render('MenuLordsBanquetRestaurant', {
    stripePublishableKey : keys.stripePublishableKey
  });
}

function MenuForRedPepperRestaurant(req, res){
  res.render('MenuRedPepperRestaurant', {
    stripePublishableKey : keys.stripePublishableKey
  });
}

function MenuForSangramFood(req, res){
  res.render('MenuSangramFood', {
    stripePublishableKey : keys.stripePublishableKey
  });
}

function MenuForSubway(req, res){
  res.render('MenuSubway', {
    stripePublishableKey : keys.stripePublishableKey
  });
}

function about(req, res){
  res.render('about');
}

function help(req, res){
  res.render('help');
}

function offer(req, res){
  res.render('offers');
}

function thanks(req, res) {
  res.render('thanks')
}

//register User
async function addUser(req, res) {
  let addUser = new blogUser(req.body);
  try {
    addUser.save();
    sendWelcomeEmail(req.body.email, req.body.userName)
    res.redirect("/user/login");
  } catch (err) {
    res.redirect('/user/register')
  }
}

//for verifying Cookie
function cookiesVerify(req, res, token) {
  if (req.cookies.token === undefined) {
    res
      .cookie("token", token, { maxAge: 900000, httpOnly: true })
      .redirect("/dashbord" );
  } else {
    res.redirect("/user/post");
  }
}

//authenticate user
async function authenticate(req, res) {
  try {
    const user = await blogUser.findOne(
      { userName: req.body.userName }
    );
    if(user){
      try{
      jwt.sign({ user }, process.env.SECRET_KEY, function(err, token) {
        if (token) {
          cookiesVerify(req, res, token);
        }
      });
    }
    catch(e) {
      console.log(e)
      res.redirect("/user/login" );
  }
}
  else{
    req.flash('Error', "User not found ...!!")
    res.redirect('/user/login');
    }
  } catch (err) {
    res.redirect("/user/login");
  }
}

//exports modules
module.exports = {
  addUser,
  authenticate,
  getlogin,
  register,
  dashbord,
  logout,
  getHome,
  cookiesVerify,
  contact,
  MenuForTheGrandThakar,
  MenuAmrutRestaurant,
  MenuForAppleBite,
  MenuForLordsBanquetRestaurant,
  MenuForSubway,
  MenuForSangramFood,
  MenuForRedPepperRestaurant,
  MenuForJassiDeParathe,
  about,
  charge,
  thanks,
  help,
  offer
};