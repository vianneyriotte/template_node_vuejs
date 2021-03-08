import { getAllEnveloppes } from './routes/enveloppe.swagger';

export const swaggerDocument = {
	openapi: '3.0.1',
	info: {
		version: '1.0.0',
		title: 'APIs Document',
		description: 'Mon projet',
		termsOfService: '',
		contact: {
			name: 'Vianney RIOTTE',
			email: 'vianney.riotte@gmail.com',
			url: 'https://vianney.dev'
		}
	},
	servers: [
		{
			url: 'http://localhost:3001/',
			description: 'Local server'
		}
		// {
		// 	url: 'https://xxx.yyy.zzz/api/v1',
		// 	description: 'Preprod Env'
		// },
		// {
		// 	url: 'https://aaa.bbb.ccc/api/v1',
		// 	description: 'Prod Env'
		// }
	],
	// tags: [
	// 	{
	// 		name: 'Enveloppes'
	// 	}
	// ],
	components: {
		schemas: {
			Enveloppe: {
				type: 'object',
				properties: {
					id: {
						type: 'integer',
						description: 'Id'
					},
					recuperee: {
						type: 'boolean',
						description: "Indique si l'enveloppe a été récupérée"
					}
				}
			}
		},
		securitySchemes: {
			bearerAuth: {
				type: 'http',
				scheme: 'bearer',
				bearerFormat: 'JWT'
			}
		}
	},
	paths: {
		'/enveloppes/all': {
			get: getAllEnveloppes
		}
	}
};
