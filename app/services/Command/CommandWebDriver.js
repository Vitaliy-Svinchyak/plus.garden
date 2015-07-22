var CommandWebDriver = function (config, logger, browsermob, selenium) {

    var wait = require('wait.for');

    this.start = function (action) {
        if (config.get('webdirver:keep_alive')) {
            wait.forMethod(browsermob, "start");
            wait.forMethod(selenium, "start");
            logger.info('servers is started');
        } else {
            logger.error('webdirver:keep_alive parameter should be "true"');
        }
    };

    this.stop = function (action) {
        wait.forMethod(browsermob, "stop");
        wait.forMethod(selenium, "stop");
    }

}

module.exports = CommandWebDriver;
module.exports.$inject = ["config", 'Logger', 'Browsermob', 'Selenium'];
