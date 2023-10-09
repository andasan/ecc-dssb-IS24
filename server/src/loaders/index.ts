import { createRandomProducts } from './faker';
import expressLoader from './express';

export default async ({ expressApp }) => {

    const products = await createRandomProducts(40);
    console.info('✓ Random Products loaded');

    await expressLoader({ app: expressApp, products });
    console.info('✓ Express loaded');


    return {
        products
    }
};