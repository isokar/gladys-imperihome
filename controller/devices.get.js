const util = require('util');
var Promise = require('bluebird');
let param = {};

module.exports = (req, res, next) => {
	param = {
               	devices:[{id:0,name:"null",type:"null",room:"null"}]
       	};
sails.log.info("req:");
util.inspect(req);
//sails.log.info("req:"+req);
        return finddevices()
       	        .then(function(){
               	        return res.json(200,param);
               	});
};

function finddevices(){
	return gladys.device.get()
               .then(function(devices){
                        return Promise.map(devices, function(device){
				if(device.room.id){
//sails.log.info("size:"+param.devices.length);
					return gladys.deviceType.getByDevice(device)
               					.then(function(devicetypes){
//sails.log.info("size:"+param.devices.length);

                        				return Promise.map(devicetypes, function(deviceType){
//sails.log.info("id:"+param.devices[param.devices.length-1].id);
param.devices.push({id:deviceType.id,name:deviceType.name,type:deviceType.tag,room:device.room.id,params:[]});
switch(deviceType.tag) {
    	case "DevThermostat":
		param.devices[param.devices.length-1].params.push({key:"cursetpoint",value:deviceType.lastValue},{key:"curmode",value:"Man"},{key:"availablemodes",value:"Man,eco,nominal, gel"}); 
        	break;
	case "DevDimmer":
		param.devices[param.devices.length-1].params.push({key:"Level",value:deviceType.lastValue});
        	break;
	case "DevDoor":
	case "DevFlood":
	case "DevMotion":
	case "DevSmoke":
	case "DevCO2Alert":
        	param.devices[param.devices.length-1].params.push({key:"Tripped",value:deviceType.lastValue});
        	break;
	case "DevElectricity":
                param.devices[param.devices.length-1].params.push({key:"Level",value:deviceType.lastValue});
                break;
	default:
        	param.devices[param.devices.length-1].params.push({key:"Status",value:deviceType.lastValue},{key:"Value",value:deviceType.lastValue});
};
                        				});
                				});
				}
                        });
                });
};
