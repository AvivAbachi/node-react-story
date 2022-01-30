const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { checkSchema } = require('express-validator');
const argon2 = require('argon2');
const config = require('../config/auth.config');

const signupSchema = {
	username: {
		trim: [' '],
		toLowerCase: true,
		isLength: {
			options: { min: 6, max: 16 },
			errorMessage: 'Username must be between 6 to 16 chars long',
		},
		custom: {
			options: async (username) => {
				if (username.match(/^\w+$/)) return Promise.reject('Username is not allowed');
				const user = await prisma.user.findUnique({ where: { username } });
				if (user) return Promise.reject('Username already in use');
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
				if (!username.match(/^\w+$/)) return Promise.reject('Password is not allowed');
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
		toLowerCase: true,
		custom: {
			options: async (email) => {
				const user = await prisma.user.findUnique({ where: { email } });
				if (user) return Promise.reject('Email already in use');
			},
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

const loginSchema = {
	username: {
		trim: [' '],
		toLowerCase: true,
		custom: {
			options: async (username, { req }) => {
				const user = await prisma.user.findUnique({ where: { username } });
				if (!user) return Promise.reject('Username not exist');
				req.user = user;
			},
		},
	},
	password: {
		trim: [' '],
		custom: {
			options: async (password, { req }) => {
				if (req.user) {
					const passwordIsValid = await argon2.verify(req.user.password, password, { salt: config.salt });
					if (!passwordIsValid) {
						return Promise.reject('Invalid Password');
					}
				}
			},
		},
	},
};

const resetSchema = {
	username: {
		trim: [' '],
		toLowerCase: true,
		custom: {
			options: async (username, { req }) => {
				const user = await prisma.user.findUnique({ where: { username } });
				if (!user) return Promise.reject('Username not exist');
				req.user = user;
			},
		},
	},
	email: {
		trim: [' '],
		isEmail: { bail: true },
		toLowerCase: true,
		custom: {
			options: (email, { req }) => {
				if (email !== req.user.email) return Promise.reject('Email not match');
			},
		},
	},
};

exports.signup = checkSchema(signupSchema);
exports.login = checkSchema(loginSchema);
exports.reset = checkSchema(resetSchema);
