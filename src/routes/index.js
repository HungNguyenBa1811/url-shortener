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

/**
 * @swagger
 * /ping:
 *   get:
 *     summary: Test server connectivity
 *     description: Returns "pong!" if the server is running. Useful for health checks.
 *     responses:
 *       200:
 *         description: Server is running and reachable
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: pong!
 */
appRouter.get('/ping', (req, res) => {
    res.status(200).json({
        message: 'pong!',
    });
});


/**
 * @swagger
 * /shorten:
 *   post:
 *     summary: Create a new shortened URL
 *     tags:
 *       - URL Shortener
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               url:
 *                 type: string
 *                 description: The original URL to shorten
 *             required:
 *               - url
 *     responses:
 *       201:
 *         description: Shortened URL created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     url:
 *                       type: string
 *                     shortCode:
 *                       type: string
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *       400:
 *         description: Invalid input
 */
appRouter.post('/shorten', asyncHandler(createURLShortener));

/**
 * @swagger
 * /shorten/{code}:
 *   get:
 *     summary: Retrieve the original URL by code
 *     tags:
 *       - URL Shortener
 *     parameters:
 *       - in: path
 *         name: code
 *         required: true
 *         schema:
 *           type: string
 *         description: The code of the shortened URL
 *     responses:
 *       200:
 *         description: Original URL found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     short_code:
 *                       type: string
 *                     original_url:
 *                       type: string
 *                     created_at:
 *                       type: string
 *                       format: date-time
 *                     updated_at:
 *                       type: string
 *                       format: date-time
 *       404:
 *         description: Shortened URL not found
 */
appRouter.get('/shorten/:code', asyncHandler(checkExistCode), asyncHandler(getURLShortenerByCode));

/**
 * @swagger
 * /shorten/{code}/stats:
 *   get:
 *     summary: Get statistics for a shortened URL
 *     tags:
 *       - URL Shortener
 *     parameters:
 *       - in: path
 *         name: code
 *         required: true
 *         schema:
 *           type: string
 *         description: The code of the shortened URL
 *     responses:
 *       200:
 *         description: Statistics retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     short_code:
 *                       type: string
 *                     original_url:
 *                       type: string
 *                     access_count:
 *                       type: integer
 *                     created_at:
 *                       type: string
 *                       format: date-time
 *                     updated_at:
 *                       type: string
 *                       format: date-time
 *       404:
 *         description: Shortened URL not found
 */
appRouter.get('/shorten/:code/stats', asyncHandler(checkExistCode), asyncHandler(getURLShortenerStats));

/**
 * @swagger
 * /shorten/{code}:
 *   put:
 *     summary: Update a shortened URL
 *     tags:
 *       - URL Shortener
 *     parameters:
 *       - in: path
 *         name: code
 *         required: true
 *         schema:
 *           type: string
 *         description: The code of the shortened URL
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               url:
 *                 type: string
 *                 description: The new URL to update
 *     responses:
 *       200:
 *         description: Shortened URL updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     url:
 *                       type: string
 *                     shortCode:
 *                       type: string
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *       404:
 *         description: Shortened URL not found
 */
appRouter.put('/shorten/:code', asyncHandler(checkExistCode), asyncHandler(updateURLShortener));

/**
 * @swagger
 * /shorten/{code}:
 *   delete:
 *     summary: Delete a shortened URL
 *     tags:
 *       - URL Shortener
 *     parameters:
 *       - in: path
 *         name: code
 *         required: true
 *         schema:
 *           type: string
 *         description: The code of the shortened URL
 *     responses:
 *       200:
 *         description: Shortened URL updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       404:
 *         description: Shortened URL not found
 */
appRouter.delete('/shorten/:code', asyncHandler(checkExistCode), asyncHandler(deleteURLShortener));

export default appRouter;
