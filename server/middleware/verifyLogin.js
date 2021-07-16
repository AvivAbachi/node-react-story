const argon2 = require('argon2');
const { checkSchema } = require('express-validator');
const db = require('../models');
const User = db.user;

const loginSchema = {
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
	password: {
		trim: [' '],
		custom: {
			options: async (password, { req }) => {
				if (req.user) {
					const passwordIsValid = await argon2.verify(req.user.password, password);
					if (!passwordIsValid) {
						return Promise.reject('Invalid Password');
					}
				}
			},
		},
	},
};

module.exports = checkSchema(loginSchema);
