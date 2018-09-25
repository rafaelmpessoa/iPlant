const mongoose = require('mongoose')
const config = require('config')
const username = config.get('database.username') || false
const password = config.get('database.password') || false
const logger = require('./logger')


const URI = `mongodb://${username}:${password}@ds251287.mlab.com:51287/iplant`
const options = {
    useNewUrlParser: true
}



module.exports = function () {
    if (username && password) {
        return mongoose.connect(URI, options).then(
            () => console.log('Database connected!'),
            err => { logger.error(`DB - Error database connect: ${err.message}`) }
        )
    } else {
        logger.error('DB - You must define a username and password.')
        process.exit(1)
    }
}

