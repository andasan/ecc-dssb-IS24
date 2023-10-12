import { IProduct } from '@/interfaces/product';
import { addNewProduct } from '@/loaders/faker';
import { Router, Request, Response, NextFunction } from 'express';

const productRoute = Router();

export default (app: Router, { products }: { products: IProduct[] }) => {
    /**
     * @swagger
     * tags:
     *   name: Products
     *   description: API endpoints for managing products
     */
    app.use('/products', productRoute);

    /**
      * @swagger
      * /products:
      *   get:
      *     summary: Get all products
      *     tags: [Products]
      *     responses:
      *       "200":
      *         description: A successful response
      *         content:
      *           application/json:
      *             schema:
      *               type: object
      *               properties:
      *                 products:
      *                   type: array
      *                   items:
      *                     $ref: "#/components/schemas/Product"
      *       "400":
      *         description: Bad request
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
     * /products/{productId}:
     *   get:
     *     summary: Get a product by ID
     *     tags: [Products]
     *     parameters:
     *       - in: path
     *         name: productId
     *         required: true
     *         description: ID of the product to retrieve
     *         schema:
     *           type: string
     *     responses:
     *       "200":
     *         description: A successful response
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 product:
     *                   $ref: "#/components/schemas/Product"
     *       "400":
     *         description: Bad request
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

    /**
     * @swagger
     * /products:
     *   post:
     *     summary: Create a new product
     *     tags: [Products]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: "#/components/schemas/ProductRequestBody"
     *     responses:
     *       "200":
     *         description: Product created successfully
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 product:
     *                   $ref: "#/components/schemas/Product"
     *       "400":
     *         description: Bad request
     */
    productRoute.post(
        '/',
        async (req: Request, res: Response, next: NextFunction) => {
            try {
                const product = req.body.product;

                const newProduct = await addNewProduct(product);

                products.push(newProduct);

                return res.status(200).json(newProduct);
            } catch (err) {
                next(err);
            }
        },
    );

    /**
     * @swagger
     * /products/{id}:
     *   put:
     *     summary: Update a product by ID
     *     tags: [Products]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         description: ID of the product to update
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: "#/components/schemas/ProductRequestBody"
     *     responses:
     *       '200':
     *         description: Product updated successfully
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 product:
     *                   $ref: "#/components/schemas/Product"
     *       '404':
     *         description: Product not found
     *       '400':
     *         description: Bad request
     */
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

                const updatedProduct = { ...products[index], ...product };
                products[index] = updatedProduct;

                return res.status(200).json({ updatedProduct });
            } catch (err) {
                next(err);
            }
        },
    );

    /**
   * @swagger
   * /products/{id}:
   *   delete:
   *     summary: Delete a product by ID
   *     tags: [Products]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         description: ID of the product to delete
   *     responses:
   *       '200':
   *         description: Product deleted successfully
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                   description: A confirmation message
   *             example:
   *               message: Product deleted
   *       '404':
   *         description: Product not found
   */
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


    /**
     * @swagger
     * components:
     *   schemas:
     *     ProductRequestBody:
     *       type: object
     *       properties:
     *          product:
     *              type: object
     *              properties:
     *                  productName:
     *                      type: string
     *                      description: The name of the product
     *                  productOwnerName:
     *                      type: string
     *                      description: The name of the product owner
     *                  developers:
     *                      type: array
     *                      items:
     *                          type: object
     *                          properties:
     *                              id:
     *                                  type: string
     *                              text:
     *                                  type: string
     *                  scrumMasterName:
     *                      type: string
     *                      description: The name of the scrum master
     *                  methodology:
     *                      type: string
     *                      description: The methodology of the product
     *                  location:
     *                      type: string
     *                      description: The location of the product
     *       example:
     *          product:
     *              productName: "Hoge Product"
     *              productOwnerName: "Hoge"
     *              developers: [{ id: "1", text: "str1" }, { id: "2", text: "str2" }]
     *              scrumMasterName: "Hoge"
     *              methodology: "Agile"
     *              location: https://hoge.com
     *     Product:
     *       type: object
     *       properties:
     *         productId:
     *           type: number
     *           description: ID of the product
     *         productName:
     *           type: string
     *           description: The name of the product
     *         productOwnerName:
     *           type: string
     *           description: The name of the product owner
     *         developers:
     *           type: array
     *           items:
     *             type: object
     *             properties:
     *               id:
     *                 type: string
     *               text:
     *                 type: string
     *         scrumMasterName:
     *           type: string
     *           description: The name of the scrum master
     *         startDate:
     *           type: string
     *           description: The start date of the product
     *         methodology:
     *           type: string
     *           description: The methodology of the product
     *         location:
     *           type: string
     *           description: The location of the product
     *       example:
     *         productId: 0
     *         productName: "Hoge Product"
     *         productOwnerName: "Hoge"
     *         developers: [{ id: "1", text: "str1" }, { id: "2", text: "str2" }]
     *         scrumMasterName: "Hoge"
     *         startDate: "2023/10/10"
     *         methodology: "Agile"
     *         location: https://hoge.com.
     */

};
