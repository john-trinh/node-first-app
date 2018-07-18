var common = require('../api/common');
var userIds = {
	user1: 101,
	user2: 102,
	user3: 103,
	user4: 104,
	user5: 105,
	user6: 106,
	user7: 107,
	user8: 108,
	user9: 109,
	user10: 110
};
checkUsernameAndPassword = (username, password) => {
	if(!global.users[username] || global.users[username].password != password) {
		return false;
	}
	return global.users[username];
}



module.exports = {
	login: (req, res) => {
		const user = checkUsernameAndPassword(req.body.username, common.encryptText(req.body.password));
		let response = {};
		if(user) {
			// logged in
			if(user.loggedIn) {
				response = {
					status: 0,
					message: 'You are currently logged-in from a different browser/device.',
					code: 'AF001'
				};
			}

			// User is inactive, blacklisted, or deleted Response:
			else if(user.inActive || user.blackListed || user.deleted) {
				response = {
					status: 0,
					message: 'You currently have no permission to access this account',
					code: 'AF002'
				}
			}

			// User is locked Response
			else if(user.clocked ) {
					response = {
						status: 0,
						message: 'You have been locked out of your account due to 3 failed login attempts.',
						code: 'AF004'
					}
			}

			// OTP code is invalid or is expired
			else if(user.invalidOPT ) {
				response = {
					status: 0,
					message: 'OPT Failed. Please retry.',
					code: 'AF007'
				}
			}

			else if(user.expiredOTP) {
				response = {
					status: 0,
					message: 'Code has expired. Please hit Resend Code.',
					code: 'AF008'
				}
			}
			else if (user.lastLogin) {
				response = {
					status: 0,
					message: 'Login failed! You only have one last try left to login. Please ensure your credentials are correct.',
					code: 'AF009'
				}
			}
			else {
				let status = 1;
				if(user.firstLogin) {
					status = 2;
				}
				const accessToken = common.createAccessToken(req.body.username);
				if(!user.accessToken) {
					user.accessToken = [];
				}

				user.accessToken.push(accessToken);
				switch(user.userId) {
					case userIds.user1:
					case userIds.user8:
						response = {
							status: status,
							message: 'Success',
							code: 'GS000',
							data: {
								username: user.username,
								userId: user.userId,
								token: accessToken,
								roleId: '1',
								scId: null,
								bbspId: null,
								status: 2,
								storeId: '1',
							}
						};
						break;
					case userIds.user9:
						response = {
							status: status,
							message: 'Success',
							code: 'GS000',
							data: {
								username: user.username,
								userId: user.userId,
								token: accessToken,
								roleId: '2',
								scId: null,
								bbspId: null,
								status: 2,
								storeId: '1',
							}
						};
						break;
					case userIds.user10:
						response = {
							status: status,
							message: 'Success',
							code: 'GS000',
							data: {
								username: user.username,
								userId: user.userId,
								token: accessToken,
								roleId: '3',
								scId: null,
								bbspId: null,
								status: 2,
								storeId: '1',
							}
						};
						break;
					default:
						response = {
							status: status,
							message: 'Success',
							code: 'GS000',
							data: {
								username: user.username,
								userId: user.userId,
								token: accessToken,
								roleId: '1',
								scId: null,
								bbspId: null,
								status: 2,
								storeId: '1',
							}
						};
				}
			}
		}
		else {
			// wrong username or password
			response = {
				status: 0,
				message: 'Authentication failed. Invalid credentials.',
				code: 'AF003'
			}
		}

		res.json(response);
	}
}
