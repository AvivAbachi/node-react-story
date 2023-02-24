import { User } from '@prisma/client';
import { Request, Response } from 'express';

import * as userRepository from '../repositories/user.repository';
import { AuthorizeRequest } from '../types/Requests/Index';

export const signup = async (req: Request, res: Response) => {
	try {
		const { username, email, name, password } = req.body;
		const user = await userRepository.CreateUser(username, name, email, password);
		if (!user)
			throw {
				status: 500,
				err: [{ msg: 'Error creating new user', param: 'server' }],
			};
		const token = userRepository.CreateToken(user.id);
		res.send({
			accessToken: token,
			user: { username, userId: user.id, name, email },
		});
	} catch (err: any) {
		res.status(err.status || 500).send(err);
	}
};

export const login = async (req: AuthorizeRequest, res: Response) => {
	try {
		const { username, name, id, email } = req.user as User;
		const token = userRepository.CreateToken(id);
		res.send({
			accessToken: token,
			user: { username, userId: id, name, email },
		});
	} catch (err: any) {
		res.status(err.status || 500).send(err);
	}
};

export const logout = (req: Request, res: Response) => {
	res.send();
};

export const update = async (req: AuthorizeRequest, res: Response) => {
	try {
		const id = (req.user as User)?.id;
		const { newPassword, email, name } = req.body;
		const user = await userRepository.UpdateUser(id, email, name, newPassword);
		if (!user) {
			throw {
				status: 500,
				err: [{ msg: 'Error updating User', param: 'server' }],
			};
		}
		const token = userRepository.CreateToken(id);
		res.send({
			accessToken: token,
			user: {
				username: user.username,
				userId: user.id,
				email: user.email,
				name: user.name,
			},
		});
	} catch (err: any) {
		res.status(err.status || 500).send(err);
	}
};

export const reset = async (req: AuthorizeRequest, res: Response) => {
	try {
		const id = (req.user as User)?.id;

		const update = await userRepository.ResetPassword(id);
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
};

export const access = async (req: AuthorizeRequest, res: Response) => {
	try {
		const { username, name, id, email } = req.user as User;
		const token = userRepository.CreateToken(id);
		res.send({
			accessToken: token,
			user: { username, name, userId: id, email },
		});
	} catch (err: any) {
		res.status(err.status || 500).send(err);
	}
};
