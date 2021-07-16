module.exports = (sequelize, Sequelize) => {
	const User = sequelize.define('users', {
		username: {
			type: Sequelize.STRING,
			allowNull: false,
			unique: true,
			set(value) {
				this.setDataValue('username', value.toUpperCase());
			},
		},
		password: { type: Sequelize.STRING, allowNull: false },
		email: {
			type: Sequelize.STRING,
			allowNull: false,
			unique: true,
			set(value) {
				this.setDataValue('email', value.toUpperCase());
			},
		},
		show: { type: Sequelize.STRING },
	});
	return User;
};
