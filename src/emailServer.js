const nodemailer = require('nodemailer');
  
  
let mailTransporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'capstone2022.i4@gmail.com',
        pass: '*************'
    }
});
  
let mailDetails = {
    from: 'capstone2022.i4@gmail.com',
    to: 'zanthony456@gmail.com',
    subject: 'Nodejs Test mail',
    text: 'Node.js testing mail for capstone project'
};
  
mailTransporter.sendMail(mailDetails, function(err, data) {
    if(err) {
        console.log('Error Occurs');
    } else {
        console.log('Email sent successfully');
    }
});