const jwt = require('jsonwebtoken');
const config = require('../config/auth.config');

exports.newToken = (id) => jwt.sign({ id }, config.secret, config.options);

exports.formatPost = (createdAt, updatedAt, { name, username }, post) => {
	createdAt = createdAt.getTime();
	updatedAt = updatedAt.getTime();
	if (createdAt === updatedAt - 1) updatedAt--;
	return { ...post, name: name || username, createdAt, updatedAt };
};
