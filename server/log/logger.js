const winston = require('winston');
const path = require('path');
const fs = require('fs');
const process = require('process');
require('winston-daily-rotate-file');

const logName = 'access.log';
const logDirectory = path.join(__dirname,'access');
const logFile = path.join(logDirectory, logName);

//If the app is in production (not in development), the level specified is 'info'
let level = process.env.NODE_ENV === 'development' ? 'verbose' : 'info';
console.log("Level specified in the logger: " + level);

//Makes sure that log folder exists
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);


winston.emitErrs = true;
let logger = new winston.Logger({

    transports: [
        new winston.transports.DailyRotateFile({
            level: level,
            timestamp: true,
            prettyPrint: false,
            filename: logFile,
            handleExceptions: true,
            json: true,
            maxsize: 5242880, //5MB
            maxFiles: 5,
            colorize: false,
            zippedArchive: true,
            prepend: true
        }),
        new winston.transports.Console({
            level: 'warn',
            silent: false,
            handleExceptions: true,
            json: false,
            colorize: true
        })
    ],
    exitOnError: false
});

module.exports = logger;
module.exports.stream = {
    write: function(message, encoding) {
        logger.info(message);
    }
};