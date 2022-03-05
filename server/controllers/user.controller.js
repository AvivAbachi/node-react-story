const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();
const argon2 = require('argon2');
const {generate} = require('generate-password');
const {newToken} = require('../utils');

exports.signup = async (req, res) => {
	try {
		const {username, email, name, password} = req.body;
		const passwordHash = await argon2.hash(password);
		const user = await prisma.user.create({data: {username, name, email, password: passwordHash}});
		if (!user) throw {status: 500, err: [{msg: 'Error creating new user', param: 'server'}]};
		const token = newToken(user.id);
		res.send({accessToken: token, user: {username, userId: user.id, name, email}});
	} catch (err) {
		res.status(err.status || 500).send(err);
	}
};

exports.login = async (req, res) => {
	try {
		const {username, name, id, email} = req.user;
		const token = newToken(id);
		res.send({accessToken: token, user: {username, userId: id, name, email}});
	} catch (err) {
		res.status(err.status || 500).send(err);
	}
};

exports.logout = (req, res) => {
	res.send({msg: 'logout'});
};

exports.update = async (req, res) => {
	try {
		const id = req.user.id;
		const {newPassword, email, name} = req.body;
		const password = newPassword ? await argon2.hash(newPassword) : undefined;
		const user = await prisma.user.update({where: {id}, data: {email, name, password}});
		if (!user) {
			throw {status: 500, err: [{msg: 'Error updating User', param: 'server'}]};
		}
		const token = newToken(id);
		res.send({
			accessToken: token,
			user: {username: user.username, userId: user.userId, email: user.email, name: user.name},
		});
	} catch (err) {
		res.status(err.status || 500).send(err);
	}
};

exports.reset = async (req, res) => {
	try {
		const id = req.user.id;
		const password = generate({lowercase: true, uppercase: true, numbers: true, length: 16});
		const passwordHash = await argon2.hash(password);
		const update = await prisma.user.update({where: {id}, data: {password: passwordHash}});
		if (!update) {
			throw {status: 500, err: [{msg: 'Error reset password', param: 'server'}]};
		}
		res.send({password});
	} catch (err) {
		res.status(err.status || 500).send(err);
	}
};

exports.access = async (req, res) => {
	try {
		const {username, name, id, email} = req.user;
		const token = newToken(id);
		res.send({
			accessToken: token,
			user: {username, name, userId: id, email},
		});
	} catch (err) {
		res.status(err.status || 500).send(err);
	}
};
