const jwt = require('jsonwebtoken');
const config = require('../config/auth.config');

exports.newToken = (id) => jwt.sign({ id }, config.secret, config.options);

exports.formatPost = (post, altAuthor) => {
	const createdAt = post.createdAt.getTime();
	const updatedAt = post.updatedAt.getTime();
	return {
		id: post.id,
		title: post.title,
		body: post.body,
		userId: post.userId,
		name:
			post.author?.name ||
			altAuthor?.name ||
			post.author?.username ||
			altAuthor?.username,
		date: updatedAt,
		isEdit: createdAt === updatedAt || createdAt === updatedAt - 1,
	};
};
