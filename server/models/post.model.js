module.exports = (sequelize, Sequelize) => {
	const Post = sequelize.define('posts', {
		title: { type: Sequelize.STRING, allowNull: false },
		body: { type: Sequelize.TEXT },
		userId: {
			type: Sequelize.INTEGER,
			allowNull: false,
			references: {
				model: 'users',
				key: 'id',
				deferrable: Sequelize.INITIALLY_IMMEDIATE,
			},
		},
	});
	return Post;
};
