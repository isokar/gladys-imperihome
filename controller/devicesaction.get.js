var Promise = require('bluebird');

module.exports = (req, res, next) => {
	sails.log.info("id:"+req.params.id);
	sails.log.info("val:"+req.params.val);
	return gladys.deviceType.exec({value:req.params.val, devicetype:req.params.id})
		.then(function(){
			return  res.status(200).json({"success": true,"errormsg": "ok"});
		});
};
