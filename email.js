const nodemailer = require('nodemailer')
const config = require('config')

const emailUser = config.get('email.username') || false
const passwordUser = config.get('email.password') || false

let active = !!emailUser && !!passwordUser

if(!active) console.log("é necessário definir EMAIL_USERNAME e EMAIL_PASSWORD")

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: emailUser,
        password: passwordUser
    }
})


module.exports = function sendEmail(to,assunto){
    const mailOptions = {
        from: emailUser, // sender address
        to: to, // list of receivers
        subject: assunto, // Subject line
        html: '<p>Your html here</p>'// plain text body
      };
    
    
      transporter.sendMail(mailOptions, function (err, info) {
        if(err)
          console.log(err)
        else
          console.log(info);
     });
}

