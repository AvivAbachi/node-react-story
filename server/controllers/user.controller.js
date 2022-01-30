const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
const { generate } = require('generate-password');
const config = require('../config/auth.config');

const newToken = (id) => jwt.sign({ id }, config.secret, config.options);

exports.signup = async (req, res) => {
	try {
		const { username, email, show, password } = req.body;
		const passwordHash = await argon2.hash(password, { salt: config.salt });
		const user = await prisma.user.create({ data: { username, show, email, password: passwordHash } });
		if (!user) {
			throw { status: 500, err: [{ msg: 'Error creating new user', param: 'server' }] };
		}
		const token = newToken(user.id);
		res.send({ accessToken: token, user: { username, userId: user.id, show, email } });
	} catch (err) {
		res.status(err.status || 500).send(err);
	}
};

exports.login = async (req, res) => {
	try {
		const { username, show, id, email } = req.user;
		const token = newToken(id);
		res.send({
			accessToken: token,
			user: { username, userId: id, show, email },
		});
	} catch (err) {
		res.status(err.status || 500).send(err);
	}
};

exports.logout = (req, res) => {
	res.send({ msg: 'logout' });
};

exports.update = async (req, res) => {
	try {
		const id = req.user.id;
		const { newPassword, email, show } = req.body;
		const emailUnique = email ? await prisma.user.findUnique({ where: { email } }) : undefined;
		if (emailUnique) {
			throw { status: 400, err: [{ msg: 'Email address already taken', param: 'email' }] };
		}
		const password = newPassword ? await argon2.hash(newPassword, { salt: config.salt }) : undefined;
		const update = await prisma.user.update({ where: { id }, data: { email, show, password } });
		if (!update) {
			throw { status: 500, err: [{ msg: 'Error updating User', param: 'server' }] };
		}
		const token = newToken(id);
		// const updateUser = await prisma.user.findUnique({ where: { id } });
		res.send({
			accessToken: token,
			user: { username: update.username, userId: update.userId, email: update.email, show: update.show },
		});
	} catch (err) {
		res.status(err.status || 500).send(err);
	}
};

exports.reset = async (req, res) => {
	try {
		const id = req.user.id;
		const password = generate({ lowercase: true, uppercase: true, numbers: true, length: 16 });
		const passwordHash = await argon2.hash(password, { salt: config.salt });
		const update = await prisma.user.update({ where: { id }, data: { password: passwordHash } });
		if (!update) {
			throw { status: 500, err: [{ msg: 'Error reset password', param: 'server' }] };
		}
		res.send({ password });
	} catch (err) {
		res.status(err.status || 500).send(err);
	}
};

exports.access = async (req, res) => {
	try {
		const { username, show, id, email } = req.user;
		const token = newToken(id);
		res.send({
			accessToken: token,
			user: { username, show, userId: id, email },
		});
	} catch (err) {
		res.status(err.status || 500).send(err);
	}
};
