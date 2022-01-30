module.exports = {
	secret: 'story-secret-key',
	options: {
		algorithm: 'HS512',
		expiresIn: '7d',
	},
	salt: 'story-salt',
};
