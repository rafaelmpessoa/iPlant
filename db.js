const mongoose = require('mongoose')
const config = require('config')
const username = config.get('database.username') || false
const password = config.get('database.password') || false


const URI = `mongodb://${username}:${password}@ds251287.mlab.com:51287/iplant`
const options = {
    useNewUrlParser: true
}



module.exports = function () {
    if (username && password) {
        return mongoose.connect(URI, options).then(
            () => console.log('Database connected!'),
            err => { console.log(`Error database connect: ${err.message}`) }
        )
    } else {
        console.log('You must define a username and password.')
        process.exit(1)
    }
}

