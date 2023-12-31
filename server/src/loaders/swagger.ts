import path from 'path';
import express from 'express';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

import config from '@/config';

const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'ECC Product API',
        version: '1.0.0',
        description: 'A list of all products that ECC currently develops or maintains.',
        contact: {
            name: 'Francois',
            url: 'https://github.com/andasan',
        },
    },
    servers: [
        {
            url: `${config.clientUrl}${config.api.prefix}`,
            description: 'Development server',
        },
    ],
};

const options = {
    swaggerDefinition,
    apis: ['./src/api/routes/*.ts'],
};

const swaggerSpec = swaggerJsdoc(options);

export default ({ app }: { app: express.Application }) => {
    app.use(path.join(config.api.prefix, 'api-docs'), swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};