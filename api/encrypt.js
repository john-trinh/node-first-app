
let crypto = require('crypto');
let common = require('./common');

module.exports = {
	encrypt: (req, res) => {
		let response = {};
		if(req.body.text) {
			var crypted = common.encryptText(req.body.text);

			response = {
				"status": 1,
				"message": "Success",
				"code": "GS000",
				"data": crypted
			};
		}
		else {
			response = {
				"status": 0,
				"message": "Fail",
				"code": "GF000",
			};
		}

		res.json(response);
	}
}