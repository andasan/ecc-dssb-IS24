import { IProduct } from '@/interfaces/product';
import { Router, Request, Response, NextFunction } from 'express';

const productRoute = Router();

export default (app: Router, { products }: { products: IProduct[] }) => {
    app.use('/products', productRoute);

    productRoute.get(
        '/',
        async (req: Request, res: Response, next: NextFunction) => {
            try {
                return res.status(200).json({ products });
            } catch (err) {
                next(err);
            }
        },
    );

};