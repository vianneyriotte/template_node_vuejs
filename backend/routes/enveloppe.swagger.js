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
