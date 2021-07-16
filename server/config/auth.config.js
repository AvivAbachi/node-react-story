module.exports = {
	secret: 'story-secret-key',
	options: {
		algorithm: 'HS512',
		expiresIn: '1d',
	},
	salt: 'story-salt',
};
