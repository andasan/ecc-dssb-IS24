import { Router } from 'express';

import { IProduct } from '@/interfaces/product';
import product from './routes/product';

export default ({ products }: { products: IProduct[] }) => {
	const app = Router();
    product(app, { products });

	return app
}