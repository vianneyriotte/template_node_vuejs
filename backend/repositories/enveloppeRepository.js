import models from '../models';
import config from '../config';
import Sequelize from 'sequelize';

const { loggers } = config;

const repo = {
	getAll: async () => {
		loggers.trace('Appel de enveloppeRepository.getAll()');
		const enveloppes = await models.Envelope.findAll({
			include: [ 'UserTraite', 'UserRecupere' ]
		});
		return enveloppes;
	}
};

export default repo;
