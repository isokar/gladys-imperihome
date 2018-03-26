var util = require('util');
var mqtt = require('mqtt');

// MQTT protocol (%prefix%/%topic%/%command%)

module.exports = function emit(topic,value) {

	return sendMqttMsg(topic,value);
};

function sendMqttMsg(topic, value) {

    return gladys.param.getValues(['MQTT_URL', 'MQTT_USERNAME', 'MQTT_PASSWORD'])
        .spread(function (url, username, password) {
            var client = mqtt.connect(url, {
                username: username,
                password: password
            });

			client.on('connect', function () {
				console.log(`Gladys_MQTT - Successfully connected to MQTT : ${url}`);
				console.log(`Gladys_MQTT - Sending ${topic} ${topic}`);
				client.publish(topic, value);
				client.end();

				return value;
            });

            client.on('error', function (error) {
                console.log(`Gladys_MQTT - Error: ${error}`);
                client.end();

                return false;
            });
        });
}
