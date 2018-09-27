
var setup = require('./lib/setup');
var init = require('./lib/init');
var shared = require('./lib/shared');
var systemcontroller = require('./controller/system.get');

module.exports = function (sails) {
    
    gladys.on('ready', init)

    return {
        setup,
        init,
        shared,
        routes: {
            after: {
                'GET /system': systemcontroller
            }
        }
    };
};
