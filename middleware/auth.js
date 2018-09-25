const jwt = require('jsonwebtoken')
const config = require('config')
const logger = require('../logger')



module.exports = function(req,res,next) {
    const token = req.header('x-auth-token')
    if(!token) {
        logger.warn(`AUTH - Acesso negado. Sem token de autenticação.`)
        return res.status(401).send('Acesso negado. Sem token de autenticação.')
    } 
    try {
        const decoded = jwt.verify(token,config.get('jwToken'))
        req.user = decoded
        next()
    }catch(e){
        logger.warn(`AUTH - ${token} Token inválido.`)
        res.status(400).send('Token inválido.')
    }


}