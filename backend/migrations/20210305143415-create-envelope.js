'use strict';
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('Envelopes', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER
			},
			recuperee: {
				type: Sequelize.BOOLEAN
			},
			id_user_recupere: {
				type: Sequelize.INTEGER
			},
			id_user_traite: {
				type: Sequelize.INTEGER
			},
			date: {
				type: Sequelize.DATE
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE
			}
		});
	},
	down: async (queryInterface, Sequelize) => {
		// await queryInterface.dropTable('Envelopes');
	}
};
