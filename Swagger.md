# Swagger dans un projet Node

```sh
npm i swagger-ui-express
```

Voici un exemple pour api retournant des objets *Enveloppe*.

Création d'un fichier **enveloppe.swagger.js** au niveau des routes (*existence d'un enveloppe.js traitant les routes dédiées à cette fonctionnalité*)

```js
// ./routes/enveloppe.swagger.js

export const Enveloppe = {
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
};

export const getAllEnveloppes = {
	tags: [ 'Enveloppes' ],
	description: 'Retourne la liste des enveloppes',
	operationId: 'gertAll',
	security: [
		{
			bearerAuth: []
		}
	],
	responses: {
		'200': {
			description: "Une liste d'enveloppes.",
			content: {
				'application/json': {
					schema: {
						type: 'object',
						properties: {
							ok: {
								type: 'boolean',
								description: 'true si ok, false sinon'
							},
							data: {
								type: 'array',
								items: {
									$ref: '#/components/schemas/Enveloppe'
								}
							}
						}
					}
				}
			}
		}
	}
};

```

Création d'un fichier **swagger.js** à la racine. Nous allons importer le schéma **Enveloppe** ainsi que la description de la méthode **getAllEnveloppes**.

```js
// ./swagger.js

import { Enveloppe, getAllEnveloppes } from './routes/enveloppe.swagger';

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
			Enveloppe
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

```

Au sein de la configuration du **Express**, nous allons ajouter la déclaration du **swagger.js** ainsi que l'utilisation de l'UI.

```js
// ...

import swaggerUI from 'swagger-ui-express';
import { swaggerDocument } from '../swagger';

// ...

// Ajout de la route swagger
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));
```

Accès à la documentation Swagger: http://localhost:xxx/api-docs/

Ref: https://levelup.gitconnected.com/the-simplest-way-to-add-swagger-to-a-node-js-project-c2a4aa895a3c


