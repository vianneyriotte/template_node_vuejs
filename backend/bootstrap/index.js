import express from 'express';
import cors from 'cors';
const morgan = require('morgan'); // Hack: Pour éviter un warning deprecated
import bodyParser from 'body-parser';

import swaggerUI from 'swagger-ui-express';
import { swaggerDocument } from '../swagger';

import config from '../config';
import routes from '../routes';

const { port, loggers, dev_env } = config;

const app = express();

// On autorise toutes les provenances
app.use(cors());

if (dev_env) {
	// format des logs morgan >>> :method :url :status :response-time ms - :res[content-length]
	app.use(morgan('dev'));
}

// On supprime des infos inutiles
app.disable('x-powered-by');

// Activation du parsing JSON (avec limite ici)
app.use(
	bodyParser.json({
		limit: '50mb'
	})
);

// Activation du parsing d'url
app.use(
	bodyParser.urlencoded({
		limit: '50mb',
		parameterLimit: 100000,
		extended: true
	})
);

// Ajout de la route swagger
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use('', routes);

// Lancement du serveur express
const server = {
	start: () => {
		// Démarrage du serveur
		app.listen(port, async function() {
			const msg = `http://localhost:${port}`;
			if (loggers.info.enabled) {
				loggers.info(msg);
			} else {
				console.log(msg);
			}
		});
	}
};

export default server;
