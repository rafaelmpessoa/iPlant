const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000
const bp = require('body-parser')
const users = require('./routes/user')
const plant = require('./routes/plant')

//const horta = require('./routes/horta')

app.use(bp.json())
app.use(bp.urlencoded({ extended: false }))
app.use('/images', express.static(__dirname + '/public/images'));

app.use('/api/users', users)
app.use('/api/plant', plant)


module.exports = function () {

    return app.listen(PORT, () => {
        console.log(`Server Listening Port ${PORT}`)
    })
}