const sgMail = require('@sendgrid/mail');
require('dotenv').config();

const sendgridAPIKey = process.env.SENDGRID_API;

sgMail.setApiKey(sendgridAPIKey);

const sendWelcomeEmail = (email, name) => sgMail.send({
  to: email,
  from: 'parthvaghelahd@gmail.com',
  subject: 'Thanks for joining FDA ...!',
  text:  ` Successfully ${name} your account is created. You are now eligible for ordering an food and enjoy your testy food , and order with Awsome restaurants with very fast delevery. Thanks for connected !! Stay Home , Stay Safe`
});

const sendCancelationEmail = (email, name) => sgMail.send({
  to: email,
  from: 'parthvaghelahd@gmail.com',
  subject: 'Sorry to see you from FDA ...!',
  text:  ` Successfully your account is deleted , Good Bye ${name}. You are now not eligible for ordering an food. Stay Home , Stay Safe`
});

module.exports = {
  sendWelcomeEmail,
  sendCancelationEmail
}