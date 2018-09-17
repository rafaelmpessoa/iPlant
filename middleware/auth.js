const jwt = require('jsonwebtoken')
const config = require('config')

module.exports = function(req,res,next) {
    const token = req.header('x-auth-token')
    if(!token) return res.status(401).send('Acesso negado. Sem token de autenticação.')


    try {
        const decoded = jwt.verify(token,config.get('jwToken'))
        req.user = decoded
        next()
    }catch(e){
        res.status(400).send('Token inválido.')
    }


}