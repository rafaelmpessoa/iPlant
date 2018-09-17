const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000
const bp = require('body-parser')
const users = require('./routes/user')

//const horta = require('./routes/horta')
//const plant = require('./routes/plant')
app.use(bp.json())
app.use(bp.urlencoded({ extended: false }))
app.use(express.json())
app.use('/api/users', users)

module.exports = function () {
    return app.listen(PORT, () => {
        console.log(`Server Listening Port ${PORT}`)
    })
}