import { IProduct } from '@/interfaces/product';
import { Router, Request, Response, NextFunction } from 'express';

const productRoute = Router();

export default (app: Router, { products }: { products: IProduct[] }) => {
    app.use('/products', productRoute);

    /**
     * @swagger
     * /api/products:
     *   get:
     *      description: Use to request all products
     *      responses:
     *          '200':
     *              description: A successful response
     *          '400':
     *              description: Bad request
     */
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

    /**
     * @swagger
     * /api/products/{productId}:
     *   get:
     *     summary: Get a product by ID
     *     parameters:
     *       - in: path
     *         name: productId
     *         required: true
     *         description: ID of the product to retrieve
     *         schema:
     *           type: string
     *     responses:
     *         '200':
     *             description: A successful response
     *         '400':
     *             description: Bad request
     */
    productRoute.get(
        '/:id',
        async (req: Request, res: Response, next: NextFunction) => {
            try {
                const id = parseInt(req.params.id);
                const product = products.find(product => product.productId === id);
                if (!product) {
                    return res.status(404).json({ message: 'Product not found' });
                }
                return res.status(200).json({ product });
            } catch (err) {
                next(err);
            }
        },
    );

    productRoute.post(
        '/',
        async (req: Request, res: Response, next: NextFunction) => {
            try {
                const product = req.body.product;
                products.push(product);
                return res.status(200).json({ product });
            } catch (err) {
                next(err);
            }
        },
    );

    productRoute.put(
        '/:id',
        async (req: Request, res: Response, next: NextFunction) => {
            try {
                const id = parseInt(req.params.id);
                const product = req.body.product;
                const index = products.findIndex(product => product.productId === id);
                if (index === -1) {
                    return res.status(404).json({ message: 'Product not found' });
                }
                products[index] = product;
                return res.status(200).json({ product });
            } catch (err) {
                next(err);
            }
        },
    );

    productRoute.delete(
        '/:id',
        async (req: Request, res: Response, next: NextFunction) => {
            try {
                const id = parseInt(req.params.id);
                const index = products.findIndex(product => product.productId === id);
                if (index === -1) {
                    return res.status(404).json({ message: 'Product not found' });
                }
                products.splice(index, 1);
                return res.status(200).json({ message: 'Product deleted' });
            } catch (err) {
                next(err);
            }
        },
    );

};