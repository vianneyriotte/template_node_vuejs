const Sequelize = require('sequelize');

export default {
	id: {
		type: Sequelize.INTEGER,
		primaryKey: true
	},
	value: {
		type: Sequelize.STRING,
		allowNull: false,
		notEmpty: true
	},
	date_creation: {
		type: Sequelize.DATE,
		allowNull: false,
		notEmpty: true
	}
};
