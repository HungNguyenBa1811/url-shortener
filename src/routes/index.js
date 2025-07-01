import express from 'express';
import { asyncHandler } from '../utils/async-handler.js';
import {
    createURLShortener,
    deleteURLShortener,
    getURLShortenerByCode,
    getURLShortenerStats,
    updateURLShortener,
} from '../controllers/url-shortener.controller.js';
import { checkExistCode } from '../middlewares/url-shortener.middleware.js';

const appRouter = express.Router();

appRouter.get('/ping', (req, res) => {
    res.status(200).json({
        message: 'pong!',
    });
});

appRouter.post('/shorten', asyncHandler(createURLShortener));

appRouter.get('/shorten/:code', asyncHandler(checkExistCode), asyncHandler(getURLShortenerByCode));

appRouter.get('/shorten/:code/stats', asyncHandler(checkExistCode), asyncHandler(getURLShortenerStats));

appRouter.put('/shorten/:code', asyncHandler(checkExistCode), asyncHandler(updateURLShortener));

appRouter.delete('/shorten/:code', asyncHandler(checkExistCode), asyncHandler(deleteURLShortener));

export default appRouter;
