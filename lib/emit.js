var util = require('util');
var mqtt = require('mqtt');
var shared = require('./shared.js');

// MQTT protocol (%prefix%/%topic%/%command%)

module.exports = function emit(topic,value) {

	return sendMqttMsg(topic,value);
};

function sendMqttMsg(topic, value) {

	var client = shared.getClient();
	console.log(`Roomba - Sending ${topic} ${topic}`);
	client.publish(topic, value);

	return value;
}
