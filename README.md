# FDA

FDA stands for Food Delivery Application. In this app user can create an account, get many types  
of offers , discounts on food which is available restaurants in this app. 

### Prerequisites
   ```bash 
node [v13.14.0](https://nodejs.org/en/download/)
```
   ```bash 
Mongodb v4.2.2 (https://www.mongodb.com/download-center/community)
```

## Installation

Install all dependencies and modules:
```bash
$ clone a project
$ cd FDA
$ npm i
$ run at : 127.0.0.1:5000
```

## Setup
Once you clone or download project go into you folder
> create a .env file
 >create a keys_dev.js file
 >npm install (it will install all the dependencies required for the project)
 
#### .env file

```bash 
SECRET_KEY=Your_Secret_Key
mongoURL=mongodb://localhost:27017/Yourdatabasename
SENDGRID_API=Your_Send_Grid_Api
```
#### keys_dev.js file

```bash 
  stripePublishableKey : 'Your stripe publishable key',
  stripeSecretKey : 'Your Stripe Secret Key'
```

### Tech

paperless using mostly this technologies.

* [ Express.js ] - Awesome web-based text editor
* [ EJS ] - Markdown parser done right. Fast and easy to extend.
* [ Bootstrap ] - Great UI for modern web apps
* [ Node.js ] - Evented I/O for the backend
* [ Mongodb ] - A promise based NodeJs ORM for NoSQL
* [ SendGrid ] - For login mail.
* [ Stripe ] - Stripe for secure payment gateway.