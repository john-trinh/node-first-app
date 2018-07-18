module.exports = {
	changePassword: (req, res) => {
        let response = {};
        if(req.body.id && req.body.oldPassword && req.body.newPassword && global.users[req.body.id]) {
            global.users[req.body.id].password = req.body.newPassword;
            if (req.body.id === 111) {
                global.users[req.body.id].firstLogin = false;
            }
            response = {
                "status": 1,
                "message": "Successfully updated 1 User(s).",
                "code": "GS002",
                "count": 1
            };
        } else {
            response = {
                "status": 0,
                "message": "Fail",
                "code": "GF000",
            };
        }

		res.json(response);
	}
}