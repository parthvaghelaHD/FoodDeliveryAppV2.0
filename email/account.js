const sgMail = require('@sendgrid/mail');
const keys = require('../config/keys')
require('dotenv').config();

const sendgridAPIKey = keys.SENDGRID_API;

sgMail.setApiKey(sendgridAPIKey);

const sendWelcomeEmail = (email, name) => sgMail.send({
  to: email,
  from: 'parthvaghelahd@gmail.com',
  subject: 'Thanks for joining FDA ...!',
  text:  ` Successfully ${name} your account is created. You are now eligible for ordering an food and enjoy your testy food , and order with Awsome restaurants with very fast delevery. Thanks for connected !! Stay Home , Stay Safe`
});

const sendCanformationEmail = (email) => sgMail.send({
  to: email,
  from: 'parthvaghelahd@gmail.com',
  subject: 'Your order Successfully Conform ...!',
  text:  'You will get your order as soon as possible. Thanks for using our service. Stay Home , Stay Safe'
});

module.exports = {
  sendWelcomeEmail,
  sendCanformationEmail
}