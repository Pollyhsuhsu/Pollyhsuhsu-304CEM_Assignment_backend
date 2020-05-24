const express = require("express")
const email = express.Router()
const cors = require("cors")
var nodemailer = require('nodemailer');


/* SAVE BOOK */
email.post('/sendemail', function(req, res) {
  console.log(req.body);
  var text = "Dear "+req.body.last_name + " " + req.body.first_name +",<br><br>" + 
                "<h2>***** Important message*****<h2>" + 
                "<h3>Congratulations, you have successfully registered for VCC SCHOOL!<h3>"+
                "<br><p>The user name of this account is your register email(" + req.body.email + ") and you are required to complete the activation process in order to use it."+
                "To activate your account, please go to <a href='http://localhost:8080/#/login'>http://localhost:8080/#/login</a><br><br><br>"+
                "Your password:<br>"+ req.body.password +
                "<br><br><br>Thank you for your attention.<br><br>Regards,<br>VCC SCHOOL";
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'hsu841681209@gmail.com',
          pass: 'laplap01079852..'
        }
      });
      var mailOptions = {
        from: 'hsu841681209@gmail.com',
        to: req.body.email,
        subject: 'Congratulations on your successful registration.',
        //text: 'That was easy!',
        html:text
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
          res.status(200).json({response:"Please check your email!", voteID: voteID});
        }
    });
});


module.exports = email;
