var base64 = require('base-64');

module.exports = {
	encryptText: (text) => {
		var password = 'ABCDEFGFUCKA';
		return base64.encode(password + text);
	},

	createAccessToken: (username) => {
		const date = new Date();
		const timeStamp = date.getTime();
		return base64.encode(username + timeStamp);
	}
}

