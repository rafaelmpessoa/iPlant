const server = require('./server')
const db = require('./db')
const config = require('config')
const logger = require('./logger')
require('express-async-errors')

if(!config.get('jwToken')){
    logger.error('FATAL ERRO: iplant_privateKey is not defined!')
    process.exit(1)
}

server() // Iniciar o servidor


async function connectDB(){
    await db()
    
} 



connectDB()