const server = require('./server')
const db = require('./db')
const config = require('config')


if(!config.get('jwToken')){
    console.log('FATAL ERRO: iplant_privateKey is not defined!')
    process.exit(1)
}

server() // Iniciar o servidor
db() // Conectar com o bando de dados


