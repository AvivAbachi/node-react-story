const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const jwt = require('jsonwebtoken');
const config = require('../config/auth.config');

module.exports = async (req, res, next) => {
	try {
		const token = req.headers['x-access-token'];
		if (!token) {
			throw { status: 403, msg: 'No token provided', value: token, param: 'token' };
		}
		const id = jwt.verify(token, config.secret, (err, decoded) => {
			if (err) {
				throw { status: 401, msg: 'Unauthorized', value: token, param: 'token' };
			}
			return decoded.id;
		});
		const user = await prisma.user.findUnique({ where: { id } });
		if (!user) {
			throw { status: 404, msg: 'Username not exist', value: id, param: 'username' };
		}
		req.user = user;
		next();
	} catch (err) {
		return res.status(err.status ?? 500).send(err);
	}
};
