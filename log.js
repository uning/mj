

let log4js = require('log4js');
log4js.configure('config/log4js.json', { reloadSecs: 300  });

module.exports.getLogger = function(name = "",level='DEBUG'){
    logger = log4js.getLogger(name);
    logger.setLevel(level);
    return logger;
}


