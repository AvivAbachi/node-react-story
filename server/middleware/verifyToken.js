const jwt = require('jsonwebtoken');
const config = require('../config/auth.config.js');
const db = require('../models');
const User = db.user;

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
		const user = await User.findByPk(id);
		if (!user) {
			throw { status: 404, msg: 'Username not exist', value: id, param: 'username' };
		}
		req.user = user;
		next();
	} catch ({ status, ...err }) {
		return res.status(status ?? 500).send(err);
	}
};
