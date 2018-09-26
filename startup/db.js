const mongoose = require('mongoose')
const config = require('config')
const logger = require('./logging')
const username = config.get('database.username') || false
const password = config.get('database.password') || false



const URI = `mongodb://${username}:${password}@ds251287.mlab.com:51287/iplant`
const options = {
    useNewUrlParser: true
}



module.exports = function () {
    if (username && password) {
        return mongoose.connect(URI, options).then(
            () => logger.info('Database connected!'),
            err => { logger.error(`DB - Error database connect: ${err.message}`) }
        )
    } else {
        logger.error('DB - You must define a username and password.')
    }
}

