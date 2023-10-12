import { Router, Request, Response, NextFunction } from 'express';

const route = Router();

export default (app: Router) => {
    /**
     * Spec for the route /api/health
     *
      * @swagger
      * tags:
      *   name: Health Check
      *   description: Health Check API endpoint for checking the health of the API
    */
    app.use('/', route);

    /**
     * @swagger
     * paths:
     *   /health:
     *     get:
     *       summary: Get health check
     *       tags: [Health Check]
     *       responses:
     *         "200":
     *           description: A successful response.
     *           content:
     *             application/json:
     *               schema:
     *                 type: object
     *                 items:
     *                   status:
     *                    type: string
     *                    description: Status of the API
     *               example:
     *                 status: OK
    */
    route.get(
        '/health',
        async (req: Request, res: Response, next: NextFunction) => {
            res.status(200).json({ status: 'OK' });
        },
    );

};
