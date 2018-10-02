var getsystemcontroller = require('./controller/system.get.js');
var getroomcontroller = require('./controller/rooms.get.js');
var getdevicescontroller = require('./controller/devices.get.js');
var getdevicesaction = require('./controller/devicesaction.get.js');


module.exports = function (sails) {

    return {
        routes: {
            after: {
                'GET /system': getsystemcontroller,
		'GET /rooms': getroomcontroller,
                'GET /devices': getdevicescontroller,
		'GET /devices/:id/action/setStatus/:val': getdevicesaction,
		'GET /devices/:id/action/setLevel/:val': getdevicesaction

            }
        }
    };
};
