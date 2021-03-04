const Sequelize = require('sequelize');

export default {
	id: {
		type: Sequelize.INTEGER,
		allowNull: false,
		notEmpty: true
	},
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
