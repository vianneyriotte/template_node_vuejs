'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Envelope extends Model {
		/**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
		static associate(models) {
			Envelope.hasOne(models.User, {
				foreignKey: 'id',
				sourceKey: 'id_user_traite',
				as: 'UserTraite',
				constraints: false
			});
			Envelope.hasOne(models.User, {
				foreignKey: 'id',
				sourceKey: 'id_user_recupere',
				as: 'UserRecupere',
				constraints: false
			});
		}
	}
	Envelope.init(
		{
			recuperee: DataTypes.BOOLEAN,
			id_user_recupere: DataTypes.INTEGER,
			id_user_traite: DataTypes.INTEGER,
			date: DataTypes.DATE
		},
		{
			sequelize,
			modelName: 'Envelope'
		}
	);
	return Envelope;
};
