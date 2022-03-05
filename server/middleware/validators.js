const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();
const {body, header, query, param, validationResult} = require('express-validator');
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
const config = require('../config/auth.config');

exports.username = body('username')
	.trim()
	.toLowerCase()
	.isLength({min: 6, max: 24})
	.withMessage('Username must be between 6 to 16 chars long')
	.matches(/^\w+$/)
	.withMessage('Username is not allowed')
	.custom(async (username) => {
		if (await prisma.user.findUnique({where: {username}})) throw new Error('Username already in use');
	});

exports.password = body('password')
	.trim()
	.isLength({min: 8, max: 16})
	.withMessage('Password must be between 8 to 16 chars long')
	.matches(/^\w+$/)
	.withMessage('Password is not allowed')
	.isStrongPassword({minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 0})
	.withMessage('Password must be whit at least one uppercase letter, one lowercase letter, and one number');

exports.email = body('email')
	.trim()
	.isEmail()
	.withMessage('Email is not allowed')
	.toLowerCase()
	.custom(async (email) => {
		if (await prisma.user.findUnique({where: {email}})) throw new Error('Email already in use');
	});

exports.displayName = body('name').trim().isLength({max: 64}).withMessage('Display name can be up to 40 chars long');

exports.cheakUsername = body('username')
	.trim()
	.toLowerCase()
	.custom(async (username, {req}) => {
		req.user = await prisma.user.findUnique({where: {username}});
		if (!req.user) {
			req.status = 404;
			throw new Error('Username not exist');
		}
	});

exports.cheakPassword = body('password')
	.trim()
	.custom(async (password, {req}) => {
		if (req.user) {
			const passwordIsValid = await argon2.verify(req.user.password, password);
			if (!passwordIsValid) {
				req.status = 401;
				throw new Error('Invalid Password');
			}
		}
	});

exports.cheakEmail = body('email')
	.trim()
	.toLowerCase()
	.custom((email, {req}) => {
		if (email !== req.user.email) throw new Error('Email not match');
	});

exports.token = header('x-access-token').custom(async (token, {req}) => {
	if (!token) {
		req.status = 403;
		throw new Error('No token provided');
	}
	const id = jwt.verify(token, config.secret, (err, decoded) => {
		if (err) {
			req.status = 401;
			throw new Error('Unauthorized');
		}
		return decoded.id;
	});
	req.user = await prisma.user.findUnique({where: {id}});
	if (!req.user) {
		req.status = 404;
		throw new Error('Username not exist');
	}
});

exports.pages = query(['limit', 'page']).toInt();

exports.id = param('id').toInt().isInt({min: 0}).withMessage('Invalid id');

exports.postTitle = body('title').trim().isLength({min: 4, max: 64}).withMessage('Post title must be between 4 to 64 chars long');

exports.postBody = body('body')
	.trim()
	.customSanitizer((a) => a.replace(/\n+/gm, '\n'))
	.isLength({max: 500})
	.withMessage('Post text can be up to 500 chars long');

exports.postId = body('id').toInt().isInt({min: 0}).withMessage('Post id is not allowed');

exports.errors = (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) return res.status(req.status || 400).json(errors.array());
	next();
};
