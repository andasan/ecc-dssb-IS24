import { Router } from 'express';

import { IProduct } from '@/interfaces/product';
import product from './routes/product';
import healthcheck from './routes/healthcheck';

export default ({ products }: { products: IProduct[] }) => {
	const app = Router();
	healthcheck(app);
    product(app, { products });

	return app
}