const nodemailer = require('nodemailer');

const sendEmail = async(subject, message, sent_from, send_to, reply_to) =>{
const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port:587, //according to documentation 
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    },
    //optional
    tls:{
        rejectUnauthorized: true
    }
})

const options = {
    from: sent_from,
    to: send_to,
    replyTo: reply_to,
    subject: subject,
    html: message
}

//send the message
transport.sendMail(options, function(err,info){
if(err){
    console.log(err);
}
else{console.log(info);
}
})
}


module.exports = sendEmail