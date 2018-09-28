const winston = require('winston');

require('winston-mongodb');
require('express-async-errors');
const config = require('config')
const username = config.get('database.username') || false
const password = config.get('database.password') || false
const URI = `mongodb://${username}:${password}@ds251287.mlab.com:51287/iplant`

const myFormat = winston.format.printf(info => {
  return `${info.timestamp} ${info.level}: ${info.message}`;
});

const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.timestamp({ format: 'DD-MM-YYYY HH:mm:ss' }),
    myFormat
  ),
  transports: [
    //
    // - Write to all logs with level `info` and below to `combined.log` 
    // - Write all logs error (and below) to `error.log`.
    //
    new winston.transports.File({ filename: 'logfile.log', handleExceptions:true}),
    new winston.transports.MongoDB(
      {
        db: URI,
        level: "warn"
      }),
    new winston.transports.Console()
  ]
  ,
  exceptionHandlers: [
    new winston.transports.File({ filename: 'uncaughtExceptions.log' })
  ]
});

process.on('unhandledRejection', (ex) => {
  logger.error(ex);
 // process.exit(1)
});

process.on('uncaughtException', (ex) => {
  logger.error(ex);
  //process.exit(1)
});

if (process.env.NODE_ENV !== 'production') {
  winston.add(new winston.transports.Console({
    format: winston.format.simple()
  }));
}

module.exports = logger







// module.exports = function() {
//   winston.handleExceptions(
//     new winston.transports.File({ filename: 'uncaughtExceptions.log' }));

//   process.on('unhandledRejection', (ex) => {
//     throw ex;
//   });

//   winston.add(winston.transports.File, { filename: 'logfile.log' });
//   winston.add(winston.transports.File, { filename: 'logfile_warn.log' ,level:'warn'});
//   winston.add(winston.transports.MongoDB, { 
//     db: URI,
//     level: 'info'
//   });  

// }