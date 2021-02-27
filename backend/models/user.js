const Sequelize = require('sequelize');

export default {
	email: {
		type: Sequelize.STRING,
		allowNull: false,
		notEmpty: true,
		primaryKey: true
	},
	firstname: {
		type: Sequelize.STRING,
		allowNull: false,
		notEmpty: true
	},
	lastname: {
		type: Sequelize.STRING,
		allowNull: false,
		notEmpty: true
	},
	password: {
		type: Sequelize.STRING,
		allowNull: false,
		notEmpty: true
	}
};
