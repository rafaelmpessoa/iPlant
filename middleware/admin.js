const logger = require('../logger')

module.exports = function (req, res, next) { 
    if (!req.user.isAdmin) {
      logger.warn(`ADMIN - User: ${req.user._id} Acesso negado. `)
      return res.status(403).send('Acesso negado.');
    }
    
    next();
  }