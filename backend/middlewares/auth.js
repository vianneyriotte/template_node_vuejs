import security from '../helpers/security';

export default (req, res, next) => {
	if (security.verify(req, res)) {
		next();
	}
};
