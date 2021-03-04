const Sequelize = require('sequelize');

export default {
	id: {
		type: Sequelize.INTEGER,
		allowNull: false,
		primaryKey: true
	},
	recuperee: {
		type: Sequelize.BOOLEAN,
		allowNull: false
	},
	id_user_recupere: {
		type: Sequelize.INTEGER,
		allowNull: true
	},
	id_user_traite: {
		type: Sequelize.INTEGER,
		allowNull: true
	},
	date: {
		type: Sequelize.DATE,
		allowNull: true
	}
};
