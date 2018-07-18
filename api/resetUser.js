
const crypto = require('crypto');
const common = require('./common');

module.exports = {
	resetUser: (req, res) => {
        let response = {};
        if(global.users[req.params.userId]) {
            response = {
                "status": 1,
                "message": "Success",
                "code": "GS000",
                "data": "*CSr4d0Zk"
            };
        }
        else {
            response = {
                "status": 0,
                "message": "False",
                "code": "GF000",
                "data": "*CSr4d0Zk"
            };
        }

		res.json(response);
	}
}