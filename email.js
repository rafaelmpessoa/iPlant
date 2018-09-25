const nodemailer = require('nodemailer')
const config = require('config')
const clientSecret = config.get('oauth2.clientSecret') || false
const confirmUrl = 'http://localhost:3000/api/users/confirm/'
const logger = require('./logger')

let active = !!clientSecret

if (!active) logger.warn("EMAIL - é necessário definir clientSecret")
     


const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        type: 'OAuth2',
        user: 'iplantsuporte@gmail.com',
        clientId: '658884268433-v2gkc21bgkln5annr0u91b9hk2ji8ahs.apps.googleusercontent.com',
        clientSecret: clientSecret,
        refreshToken: '1/zKC-cgEvOIm_YZ83vdejdVRtcbLQn5wBPgeHQQsuxlB2BMC7zIpX8eHqpMEAJfI2',
        accessToken: 'ya29.GlscBjI6Haf9j3EAudbjMXVMKI9YeR1cTSHB0IzN-PgINCjNmGZFRhzmOiJML1nthJ9o7O9k2g9f8PyTrooD3UF-uQYleZ6i4UMFUXxNaoGpU0S1htQpO9UYhGtO'

    }
})


module.exports = function sendRegisterEmail(to,token) {
    const mailOptions = {
        from: 'iPlant Register <iplantsuporte@gmail.com>', // sender address
        to: to, // list of receivers
        subject: 'iPlant - Confirmar cadastro', // Subject line
        html: `<h1>Bem Vindo ao iPlant!</h1>
                </br>
                </br>
                <h3><a href="${confirmUrl}${token}">Clique aqui</a> para confirmar o seu cadastro.</h3>
                </br>
                </br>
                <h4>Atenciosamente, Equipe iPlant!</h4>`
                
                // plain text body

    };


    transporter.sendMail(mailOptions, function (err, info) {
        if (err)
            logger.warn(`EMAIL - Error: ${err.message}`)
        else
            console.log('Email enviado para: ',info.accepted);
    });
}

