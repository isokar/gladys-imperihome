
module.exports = function(topic, param){
	
	// if the event is a location
	if(param['_type'] && param['_type'] === 'location'){
		return gladys.location.create({latitude: param.lat, longitude: param.lon, accuracy: param.acc, user: param.tid});
	} else {
		return Promise.resolve();
	}
};