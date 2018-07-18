var common = require('../api/common');
var pass = common.encryptText('aA!234567');

module.exports = {
	'101': {
		userId: 101,
		username: 'Nicole',
		password: pass,
		loggedIn: false,
		inActive: false,
		blackListed: false,
		deleted: false,
		clocked: false,
		invalidOPT: false,
		expiredOTP: false,
		firstLogin: true,
	},
	'102': {
		password: pass,
		loggedIn: true,
	},
	'103': {
		password: pass,
		inActive: true,
		blackListed: true,
	},
	'104': {
		password: pass,
		clocked: true,
	},
	'105': {
		password: pass,
		invalidOPT: true,
	},
	'106': {
		password: pass,
		expiredOTP: true,
    },
	'107': {
		userId: 107,
		username: 'user7',
		firstLogin: true,
		password: pass,
	},
	108: {
		userId: 108,
		username: 'Jame',
		password: pass,
		loggedIn: false,
		inActive: false,
		blackListed: false,
		deleted: false,
		clocked: false,
		invalidOPT: false,
		expiredOTP: false,
		firstLogin: false,
	},
	109: {
		userId: 109,
		username: 'Nicole',
		password: pass,
		loggedIn: false,
		inActive: false,
		blackListed: false,
		deleted: false,
		clocked: false,
		invalidOPT: false,
		expiredOTP: false,
		firstLogin: false,
	},
	110: {
		userId: 110,
		username: 'Nicole',
		password: pass,
		loggedIn: false,
		inActive: false,
		blackListed: false,
		deleted: false,
		clocked: false,
		invalidOPT: false,
		expiredOTP: false,
		firstLogin: false,
	},
	112: {
		password: pass,
		lastLogin: true,
	}
};