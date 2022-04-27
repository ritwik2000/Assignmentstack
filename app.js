const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const {engine} = require('express-handlebars');
const path = require('path');
const nodemailer = require('nodemailer');
const expressHbs = require("express-handlebars");
const app=express()
//app.engine('', exphbs());

app.engine("hbs", expressHbs.engine({ defaultLayout: false }));
app.set('view engine', 'hbs');
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.get('/', (req, res) => {
    res.render('contact');
  });
  app.post('/send', (req, res) => {
    const output = `
      <p>You have a new contact request</p>
      <h3>Contact Details</h3>
      <ul>  
        <li>Name: ${req.body.name}</li>
        <li>Company: ${req.body.company}</li>
        <li>Email: ${req.body.email}</li>
        <li>Phone: ${req.body.phone}</li>
      </ul>
      <h3>Message</h3>
      <p>${req.body.message}</p>
    `;
  
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: 'mail.YOURDOMAIN.com',
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
          user: 'ghosh6883@gmailcom', // generated ethereal user
          pass: '123abc'  // generated ethereal password
      },
      tls:{
        rejectUnauthorized:false
      }
    });
    let mailOptions = {
        from: '"Notification Contact" <test@traversymedia.com>', // sender address
        to: 'ghoshritwik32@gmail.com', // list of receivers
        subject: 'Notification Request', // Subject line
        text: 'Hello world?', // plain text body
        html: output // html body
    };
  
    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);   
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  
        res.render('contact', {msg:'Email has been sent'});
    });
    });

  app.listen(5000, () => console.log('Server started...'));
