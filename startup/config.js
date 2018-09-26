const config = require('config')
const logger = require('./logging')

module.exports = function(){
    if(!config.get('jwToken')){
        logger.error('FATAL ERRO: iplant_privateKey is not defined!')
    }
}