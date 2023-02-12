import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import { body, header, query, param, validationResult } from 'express-validator';
import argon2 from 'argon2';
import jwt from 'jsonwebtoken';
import config from '../config/auth.config';
import { NextFunction, Request, Response } from 'express';

export const username = body('username')
	.trim()
	.toLowerCase()
	.isLength({ min: 6, max: 24 })
	.withMessage('Username must be between 6 to 16 chars long')
	.matches(/^\w+$/)
	.withMessage('Username is not allowed')
	.custom(async (username) => {
		if (await prisma.user.findUnique({ where: { username } }))
			throw new Error('Username already in use');
	});

export const password = body('password')
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

export const email = body('email')
	.trim()
	.isEmail()
	.withMessage('Email is not allowed')
	.toLowerCase()
	.custom(async (email) => {
		if (await prisma.user.findUnique({ where: { email } }))
			throw new Error('Email already in use');
	});

export const displayName = body('name')
	.trim()
	.isLength({ max: 64 })
	.withMessage('Display name can be up to 40 chars long');

export const cheakUsername = body('username')
	.trim()
	.toLowerCase()
	.custom(async (username, { req }) => {
		req.user = await prisma.user.findUnique({ where: { username } });
		if (!req.user) {
			req.status = 404;
			throw new Error('Username not exist');
		}
	});

export const cheakPassword = body('password')
	.trim()
	.custom(async (password, { req }) => {
		if (req.user) {
			const passwordIsValid = await argon2.verify(req.user.password, password);
			if (!passwordIsValid) {
				req.status = 401;
				throw new Error('Invalid Password');
			}
		}
	});

export const cheakEmail = body('email')
	.trim()
	.toLowerCase()
	.custom((email, { req }) => {
		if (email !== req.user.email) throw new Error('Email not match');
	});

export const token = header('x-access-token').custom(async (token, { req }) => {
	if (!token) {
		req.status = 403;
		throw new Error('No token provided');
	}
	jwt.verify(token, config.secret, (err: any, decoded: any) => {
		if (err) {
			req.status = 401;
			throw new Error('Unauthorized');
		}
	});
	req.user = await prisma.user.findUnique({ where: { id: req.decoded?.id } });
	if (!req.user) {
		req.status = 404;
		throw new Error('Username not exist');
	}
});

export const pages = query(['limit', 'page']).toInt();

export const id = param('id').toInt().isInt({ min: 0 }).withMessage('Invalid id');

export const postTitle = body('title')
	.trim()
	.isLength({ min: 4, max: 64 })
	.withMessage('Post title must be between 4 to 64 chars long');

export const postBody = body('body')
	.trim()
	.customSanitizer((a) => a.replace(/\n+/gm, '\n'))
	.isLength({ max: 500 })
	.withMessage('Post text can be up to 500 chars long');

export const postId = body('id')
	.toInt()
	.isInt({ min: 0 })
	.withMessage('Post id is not allowed');

export const errors = (req: Request | any, res: Response, next: NextFunction) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) return res.status(req.status || 400).json(errors.array());
	next();
};
