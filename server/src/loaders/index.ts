import { createRandomProducts } from './faker';
import expressLoader from './express';
import swaggerLoader from './swagger';

export default async ({ expressApp }) => {

    const products = await createRandomProducts(40);
    console.info('✓ Random Products loaded');

    await swaggerLoader({ app: expressApp });
    console.info('✓ Swagger loaded');

    await expressLoader({ app: expressApp, products });
    console.info('✓ Express loaded');

    return {
        products
    }
};