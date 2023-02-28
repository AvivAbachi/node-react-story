import argon2 from 'argon2';
import { generate } from 'generate-password';
import { sign } from 'jsonwebtoken';

import config from '../config/auth.config';
import database from '../config/database';

export async function CreateUser(
	username: string,
	name: string,
	email: string,
	password: string
) {
	const passwordHash = await argon2.hash(password);
	return await database.user.create({
		data: { username, name, email, password: passwordHash },
	});
}

export async function UpdateUser(
	userId: number,
	email?: string,
	name?: string,
	password?: string
) {
	const passwordHash = password ? await argon2.hash(password) : undefined;
	return await database.user.update({
		where: { userId },
		data: { email, name, password: passwordHash },
	});
}

export async function ResetPassword(userId: number) {
	const password = generate(config.resetPasword);
	const passwordHash = await argon2.hash(password);
	const user = await database.user.update({
		where: { userId },
		data: { password: passwordHash },
	});
	return { user, password };
}

export function CreateToken(userId: number) {
	return 'Bearer ' + sign({ userId }, config.secret, config.options);
}

export async function GetUserById(userId: number) {
	return await database.user.findUnique({ where: { userId } });
}

export async function GetUserByUsername(username: string) {
	return await database.user.findUnique({ where: { username } });
}

export async function GetUserByEmail(email: string) {
	return await database.user.findUnique({ where: { email } });
}

export async function CheakPassword(hash: string, password: string) {
	return await argon2.verify(hash, password);
}
