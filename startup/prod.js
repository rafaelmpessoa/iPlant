const helmet = require('helmet')
const compresion = require('compression')

module.exports = function(app){
    app.use(helmet())
    app.use(compresion())
}