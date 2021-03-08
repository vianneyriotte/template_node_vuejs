import enveloppeRepository from '../repositories/enveloppeRepository';
import config from '../config';

const { loggers } = config;

const controller = {
	getEnveloppes: async (req, res) => {
		loggers.trace('Appel de enveloppeController.getAll()');

		return await enveloppeRepository.getAll();
	}
};
export default controller;
