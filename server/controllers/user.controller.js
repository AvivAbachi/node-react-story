const argon2 = require('argon2');
const { generate } = require('generate-password');
const { newToken } = require('../utils');
const db = require('../models');
const User = db.user;

exports.singup = async (req, res) => {
	try {
		const { username, email, show, password } = req.body;
		const passwordHash = await argon2.hash(password);
		const user = await User.create({ username, show, email, password: passwordHash });
		if (!user) {
			throw { status: 500, err: [{ msg: 'Error creating new user', param: 'server' }] };
		}
		const token = newToken(user.id);
		return res.send({
			accessToken: token,
			user: { username, userId: user.id, show, email },
		});
	} catch ({ status, ...err }) {
		return res.status(status || 500).send(err);
	}
};

exports.login = async (req, res) => {
	try {
		const { username, show, id, email } = req.user;
		const token = newToken(id);
		return res.send({
			accessToken: token,
			user: { username, userId: id, show, email },
		});
	} catch ({ status, ...err }) {
		return res.status(status || 500).send(err);
	}
};

exports.logout = (req, res) => {
	res.send({ msg: 'logout' });
};

exports.update = async (req, res) => {
	try {
		const { newPassword, email: reqEmail, show: reqShow } = req.body;
		const id = req.user.id;
		const dbEmail = reqEmail ? await User.findOne({ where: { email: reqEmail } }) : undefined;
		if (dbEmail) {
			throw { status: 400, err: [{ msg: 'Email address already taken', param: 'email' }] };
		}
		const password = newPassword ? await argon2.hash(newPassword) : undefined;
		const update = await User.update({ email: reqEmail, show: reqShow, password }, { where: { id } });
		if (!update) {
			throw { status: 500, err: [{ msg: 'Error updating User', param: 'server' }] };
		}
		const token = newToken(id);
		const { username, userId, email, show } = await User.findByPk(id);
		return res.send({
			accessToken: token,
			user: { username, userId, email, show },
		});
	} catch ({ status, ...err }) {
		return res.status(status || 500).send(err);
	}
};

exports.reset = async (req, res) => {
	try {
		const password = generate({ lowercase: true, uppercase: true, numbers: true, length: 16 });
		console.log(password);
		const passwordHash = await argon2.hash(password);
		const update = await User.update({ password: passwordHash }, { where: { id: req.user.id } });
		if (!update) {
			throw { status: 500, err: [{ msg: 'Error reset password', param: 'server' }] };
		}
		return res.send({ password });
	} catch ({ status, ...err }) {
		return res.status(status || 500).send(err);
	}
};

exports.access = async (req, res) => {
	try {
		const { username, show, id, email } = req.user;
		const token = newToken(id);
		return res.send({
			accessToken: token,
			user: { username, show, userId: id, email },
		});
	} catch ({ status, ...err }) {
		return res.status(status || 500).send(err);
	}
};
