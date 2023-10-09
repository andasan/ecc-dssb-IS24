import express from 'express';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'Product API',
        version: '1.0.0',
        description: 'Product API',
        contact: {
            name: 'Francois',
            url: 'https://github.com/andasan',
        },
    },
    servers: [
        {
            url: 'http://localhost:3000',
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
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};