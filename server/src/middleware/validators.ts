import { body, param, query } from 'express-validator';

import { validateSchema } from '.';
import * as userRepository from '../repositories/user.repository';

const username = body('username')
	.trim()
	.toLowerCase()
	.isLength({ min: 6, max: 24 })
	.withMessage('Username must be between 6 to 16 chars long')
	.matches(/^\w+$/)
	.withMessage('Username is not allowed')
	.custom(async (username) => {
		if (await userRepository.GetUserByUsername(username))
			throw new Error('Username already in use');
	});

const password = body('password')
	.trim()
	.isLength({ min: 8, max: 16 })
	.withMessage('Password must be between 8 to 16 chars long')
	.matches(/^\w+$/)
	.withMessage('Password is not allowed')
	.isStrongPassword({
		minLowercase: 1,
		minUppercase: 1,
		minNumbers: 1,
		minSymbols: 0,
	})
	.withMessage(
		'Password must be whit at least one uppercase letter, one lowercase letter, and one number'
	);

const email = body('email')
	.trim()
	.isEmail()
	.withMessage('Email is not allowed')
	.toLowerCase()
	.custom(async (email) => {
		if (await userRepository.GetUserByEmail(email))
			throw new Error('Email already in use');
	});

const displayName = body('name')
	.trim()
	.isLength({ max: 64 })
	.optional()
	.withMessage('Display name can be up to 64 chars long');

const pages = query(['limit', 'page']).optional().toInt();

const userId = param('userId')
	.toInt()
	.isInt({ min: 0 })
	.withMessage('User id is not allowed');

const postTitle = body('title')
	.trim()
	.isLength({ min: 4, max: 64 })
	.withMessage('Post title must be between 4 to 64 chars long');

const postBody = body('body')
	.trim()
	.customSanitizer((a) => a.replace(/\n+/gm, '\n'))
	.isLength({ max: 500 })
	.withMessage('Post text can be up to 500 chars long');

const postId = param('postId')
	.toInt()
	.isInt({ min: 0 })
	.withMessage('Post id is not allowed');

export const validators = {
	signup: [username, password, email, displayName, validateSchema],
	update: [email.optional(), displayName, password.optional(), validateSchema],
	postAll: [pages, validateSchema],
	postId: [postId, validateSchema],
	postUserId: [userId, pages, validateSchema],
	createPost: [postTitle, postBody, validateSchema],
	updatePost: [postTitle, postBody, postId, validateSchema],
};
