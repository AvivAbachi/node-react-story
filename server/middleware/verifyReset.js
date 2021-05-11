const { checkSchema } = require('express-validator');
const db = require('../models');
const User = db.user;

const resetSchema = {
	username: {
		trim: [' '],
		toUpperCase: true,
		custom: {
			options: (username, { req }) =>
				User.findOne({ where: { username } }).then((user) => {
					if (!user) {
						return Promise.reject('Username not exist');
					}
					req.user = user;
				}),
		},
	},
	email: {
		trim: [' '],
		isEmail: { bail: true },
		toUpperCase: true,
		custom: {
			options: (email, { req }) => {
				if (email !== req.user.email) {
					return Promise.reject('Email not match');
				}
				return true;
			},
		},
	},
};

module.exports = checkSchema(resetSchema);
