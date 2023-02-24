import { User } from '@prisma/client';
import argon2 from 'argon2';
import { generate } from 'generate-password';
import { sign } from 'jsonwebtoken';

import config from '../config/auth.config';
import database from '../config/database';

interface IUserRepository {
	CreateUser(
		username: string,
		name: string,
		email: string,
		password: string
	): Promise<User>;
	UpdateUser(): Promise<User>;
	GetUserByUsername(username: string): Promise<User>;
	GetUserByEmail(email: string): Promise<User>;
	ResetPassword(): Promise<User>;
	CheakPassword(): Promise<User>;
	LoginUser(username: string, password: string): Promise<User>;
}

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
	id: number,
	email?: string,
	name?: string,
	password?: string
) {
	const passwordHash = password ? await argon2.hash(password) : undefined;
	return await database.user.update({
		where: { id },
		data: { email, name, password: passwordHash },
	});
}

export async function ResetPassword(id: number) {
	const password = generate(config.resetPasword);
	const passwordHash = await argon2.hash(password);
	const user = await database.user.update({
		where: { id },
		data: { password: passwordHash },
	});
	return { user, password };
}

export function CreateToken(id: number) {
	return sign({ id }, config.secret, config.options);
}

export async function GetUserById(id: number) {
	return await database.user.findUnique({ where: { id } });
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
