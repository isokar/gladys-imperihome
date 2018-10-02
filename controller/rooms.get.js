var Promise = require('bluebird');
let param = {};


module.exports = (req, res, next) => {
param = {
                rooms:[{id:0,name:"null"}]
        };
	return findrooms()
		.then(function(){
			res.send(param);
		})
	res.send(param);
}

function findrooms(){
        return gladys.room.getAll()
               .then(function(rooms){
                        return Promise.map(rooms, function(room){
                                param.rooms.push({id:room.id,name:room.name});
                        });
                });
}
