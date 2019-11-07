/* =================================================================================
 * @author Vladimir Polyakov
 * @author Slava Hatnuke
 * =================================================================================
 * Copyright (c) 2015 Rakuten Marketing
 * Licensed under MIT (https://github.com/linkshare/plus.garden/blob/master/LICENSE)
 * ============================================================================== */

 var winston = require('winston');

var Logger = function (config) {

    var fs = require('fs');

    var path = config.get('logger:path');
    var level = config.get('logger:level');

    var transports = [];

    if (path) {

        var dir = require('path').dirname(path);

        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        }

        transports.push(new winston.transports.File({ timestamp: true, filename: path }));

    }

    transports.push(new winston.transports.Console({ timestamp: false, colorize: true, level: level }));

    var logger = new winston.Logger({
        transports: transports
    });

    return logger;
};

module.exports = Logger;
module.exports.$inject = ['config'];
