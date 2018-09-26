const express = require('express')
const horta = require('../routes/horta')
const plant = require('../routes/plant')
const user = require('../routes/user')
const bodyparser = require('body-parser')
const compression = require('compression')
const error = require('../middleware/error')

module.exports = function(app){
    app.use(bodyparser.json())
    app.use(bodyparser.urlencoded({ extended: false }))
    app.use('/api/users', user)
    app.use('/api/plant', plant)
    app.use('/api/horta', horta)
    app.use('/images', express.static(__dirname + '/public/images'));
    app.use(compression())
    app.use(error)    
}