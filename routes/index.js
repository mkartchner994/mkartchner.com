var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
	    service: 'Gmail',
	    auth: {
	        user: 'mkartchner994@gmail.com',
	        pass: process.env.Email_pass
	    }
	});

/* Contact Form */
router.post('/contact-submit', function(req, res) {

	// setup e-mail data
	var mailOptions = {
	    from: 'mkartchner994@gmail.com', // sender address
	    to: 'mkartchner994@gmail.com', // list of receivers
	    subject: 'Contact Request Mkartchner.com', // Subject line
	    text: 'From: '+req.body.name+', Email: '+req.body.email+', Message: '+req.body.message, // plaintext body
	    html: 'From: '+req.body.name+'<br> Email: '+req.body.email+'<br> Message: '+req.body.message // html body
	};

	// send mail with defined transport object
	transporter.sendMail(mailOptions, function(error, info){
	    if(error){
	        res.status(500).end(error);
	    }else{
	        res.end();
	    }
	});
});

module.exports = router;
