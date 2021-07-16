const { checkSchema } = require('express-validator');
const db = require('../models');
const User = db.user;

const singupSchema = {
	username: {
		trim: [' '],
		toUpperCase: true,
		isLength: {
			options: { min: 6, max: 16 },
			errorMessage: 'Username must be between 6 to 16 chars long',
		},
		custom: {
			options: (username) => {
				if (!username.match(/^\w+$/)) {
					return Promise.reject('Username is not allowed');
				}
				return User.findOne({ where: { username } }).then((user) => {
					if (user) {
						return Promise.reject('Username already in use');
					}
				});
			},
		},
	},
	password: {
		trim: [' '],
		isLength: {
			options: { min: 8, max: 16 },
			errorMessage: 'Password must be between 8 to 16 chars long',
		},
		custom: {
			options: (username) => {
				if (!username.match(/^\w+$/)) {
					return Promise.reject('Password is not allowed');
				}
				return true;
			},
		},
		isStrongPassword: {
			options: {
				minLowercase: 1,
				minUppercase: 1,
				minNumbers: 1,
				minSymbols: 0,
			},
			errorMessage: 'Password must be whit at least one uppercase letter, one lowercase letter, and one number',
		},
	},
	email: {
		trim: [' '],
		isEmail: { errorMessage: 'Email is not allowed' },
		toUpperCase: true,
		custom: {
			options: (email) =>
				User.findOne({ where: { email } }).then((user) => {
					if (user) {
						return Promise.reject('Email address already taken');
					}
				}),
		},
	},
	show: {
		trim: [' '],
		isLength: {
			options: { max: 40 },
			errorMessage: 'Display name can be up to 40 chars long',
		},
	},
};

module.exports = checkSchema(singupSchema);
