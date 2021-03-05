'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class User extends Model {
		/**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
		static associate(models) {
			User.hasMany(models.Envelope, {
				foreignKey: 'id_user_traite',
				sourceKey: 'id',
				as: 'EnveloppesTraitees',
				constraints: false
			});
			User.hasMany(models.Envelope, {
				foreignKey: 'id_user_recupere',
				sourceKey: 'id',
				as: 'EnveloppesRecuperees',
				constraints: false
			});
		}
	}
	User.init(
		{
			email: DataTypes.STRING,
			firstname: DataTypes.STRING,
			lastname: DataTypes.STRING,
			password: DataTypes.STRING
		},
		{
			sequelize,
			modelName: 'User'
		}
	);
	return User;
};
