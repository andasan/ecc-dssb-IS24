import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import { IProduct } from '@/interfaces/product';
import routes from '@/api';
import config from '@/config';

export default ({ app, products }: { app: express.Application, products: IProduct[] }) => {
    /**
     * Health Check endpoints
     */
    app.get('/status', (req, res) => {
        res.status(200).end();
    });

    // Enable Cross Origin Resource Sharing to front-end server
    const corsOptions = {
        origin: config.clientUrl,
    };
    app.use(cors(corsOptions));

    // Format incoming request data
    app.use(bodyParser.urlencoded({ extended: true }));

    // Transforms the raw string of req.body into json
    app.use(express.json());
    // Load API routes
    app.use(config.api.prefix, routes({ products }));

    /// catch 404 and forward to error handler
    app.use((req, res, next) => {
        const err = new Error('Not Found');
        err['status'] = 404;
        next(err);
    });

    /// error handler
    app.use((err: { status: any; message: any; }, req: Request, res: Response, next: NextFunction) => {
        res.status(err.status || 500);
        res.json({
            errors: {
                message: err.message,
            },
        });
    });
};