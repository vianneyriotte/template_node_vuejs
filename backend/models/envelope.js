const Sequelize = require('sequelize');

export default {
	id_envelope: {
		type: Sequelize.INTEGER,
		allowNull: false,
		primaryKey: true
	},
	recuperee: {
		type: Sequelize.BOOLEAN,
		allowNull: false
	},
	id_user_recupere: {
		type: Sequelize.TINYINT,
		allowNull: true
	},
	id_user_traite: {
		type: Sequelize.TINYINT,
		allowNull: true
	},
	date: {
		type: Sequelize.DATE,
		allowNull: true
	}
};
