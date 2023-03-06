import { User } from '@prisma/client';
import { Request, Response } from 'express';

import * as userRepository from '../repositories/user.repository';
import { AuthorizeRequest } from '../types/Requests/Index';

export async function signup(req: Request, res: Response) {
	try {
		const { username, email, name, password } = req.body;
		const user = await userRepository.CreateUser(username, name, email, password);
		if (!user)
			throw {
				status: 500,
				err: [{ msg: 'Error creating new user', param: 'server' }],
			};
		const token = userRepository.CreateToken(user.userId);
		res.send({
			accessToken: token,
			user: { username, userId: user.userId, name, email },
		});
	} catch (err: any) {
		res.status(err.status || 500).send(err);
	}
}

export async function login(req: AuthorizeRequest, res: Response) {
	try {
		const { username, name, userId, email } = req.user as User;
		const token = userRepository.CreateToken(userId);
		res.send({
			accessToken: token,
			user: { username, userId, name, email },
		});
	} catch (err: any) {
		res.status(err.status || 500).send(err);
	}
}

export function logout(req: Request, res: Response) {
	res.send();
}

export async function update(req: AuthorizeRequest, res: Response) {
	try {
		const userId = (req.user as User)?.userId;
		const { newPassword, email, name } = req.body;
		const user = await userRepository.UpdateUser(userId, email, name, newPassword);
		if (!user) {
			throw {
				status: 500,
				err: [{ msg: 'Error updating User', param: 'server' }],
			};
		}
		const token = userRepository.CreateToken(userId);
		res.send({
			accessToken: token,
			user: {
				username: user.username,
				userId: user.userId,
				email: user.email,
				name: user.name,
			},
		});
	} catch (err: any) {
		res.status(err.status || 500).send(err);
	}
}

export async function reset(req: AuthorizeRequest, res: Response) {
	try {
		const userId = (req.user as User)?.userId;

		const update = await userRepository.ResetPassword(userId);
		if (!update.user) {
			throw {
				status: 500,
				err: [{ msg: 'Error reset password', param: 'server' }],
			};
		}
		res.send({ password: update.password });
	} catch (err: any) {
		res.status(err.status || 500).send(err);
	}
}

export async function access(req: AuthorizeRequest, res: Response) {
	try {
		const { username, name, userId, email } = req.user as User;
		const token = userRepository.CreateToken(userId);
		res.send({
			accessToken: token,
			user: { username, name, userId, email },
		});
	} catch (err: any) {
		res.status(err.status || 500).send(err);
	}
}
