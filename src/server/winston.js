const winston = require('winston');

var logger = new (winston.Logger)({
    transports: [
      new (winston.transports.Console)(),
      new (winston.transports.File)({ filename: 'somefile.log' })
    ],
 });

module.exports =  Object.freeze({
    ERROR : logger.error,
    INFO : logger.info
});