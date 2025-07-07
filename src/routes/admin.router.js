import express from 'express';

import { asyncHandler } from '../utils/async-handler.js';
import { checkAdmin } from '../middlewares/admin.middleware.js';
import { validate } from '../middlewares/validate.js';
import { getURLRequest } from '../requests/admin.request.js';
import {
    getAllStatsController,
    getAllURLsController,
    searchLinksController,
    forceDeleteURLController,
} from '../controllers/admin.controller.js';
import { checkExistCode } from '../middlewares/url-shortener.middleware.js';

/**
 * @swagger
 * tags:
 *   - name: Administrator
 *     description: Endpoints for administrative actions
 */
const adminRouter = express.Router();
adminRouter.use(asyncHandler(checkAdmin));

/**
 * @swagger
 * /admin/urls:
 *   get:
 *     summary: Retrieve all shortened URLs
 *     description: Returns a list of all URLs managed by the URL shortener. Admin access required.
 *     tags:
 *       - Administrator
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: Page number for pagination (default is 1)
 *       - in: query
 *         name: per_page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 10
 *         description: Number of items per page (default is 10)
 *       - in: query
 *         name: order
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *         description: Sort order (asc for ascending, desc for descending)
 *     responses:
 *       200:
 *         description: A list of URLs
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   short_code:
 *                     type: string
 *                   original_url:
 *                     type: string
 *                   created_at:
 *                     type: string
 *                     format: date-time
 *                   updated_at:
 *                     type: string
 *                     format: date-time
 *       403:
 *         description: Admin Authorization failed
 */
adminRouter.get(
    '/urls',
    asyncHandler(validate(getURLRequest)),
    asyncHandler(getAllURLsController),
);

/**
 * @swagger
 * /admin/stats:
 *   get:
 *     summary: Retrieve statistics for all URLs
 *     description: Returns aggregated statistics for all URLs managed by the URL shortener. Admin access required.
 *     tags:
 *       - Administrator
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Aggregated statistics
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 total_links:
 *                   type: integer
 *                   description: Total number of shortened URLs
 *                 total_clicks:
 *                   type: integer
 *                   description: Total number of clicks across all URLs
 *       403:
 *         description: Admin Authorization failed
 */
adminRouter.get('/stats', asyncHandler(getAllStatsController));

/**
 * @swagger
 * /admin/search:
 *   get:
 *     summary: Search for shortened URLs
 *     description: Returns up to 5 most relevant shortened URLs matching the search query. Admin access required.
 *     tags:
 *       - Administrator
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: q
 *         schema:
 *           type: string
 *         required: true
 *         description: Search query string
 *     responses:
 *       200:
 *         description: A list of up to 5 relevant URLs
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               maxItems: 5
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   short_code:
 *                     type: string
 *                   original_url:
 *                     type: string
 *                   created_at:
 *                     type: string
 *                     format: date-time
 *                   updated_at:
 *                     type: string
 *                     format: date-time
 *       403:
 *         description: Admin Authorization failed
 */
adminRouter.use('/search', asyncHandler(searchLinksController));

/**
 * @swagger
 * /admin/{code}:
 *   delete:
 *     summary: Force delete a shortened URL
 *     description: Permanently deletes a shortened URL by its code. Admin access required.
 *     tags:
 *       - Administrator
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: code
 *         required: true
 *         schema:
 *           type: string
 *         description: The short code of the URL to delete
 *     responses:
 *       200:
 *         description: URL successfully deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: URL deleted successfully
 *       404:
 *         description: URL not found
 *       403:
 *         description: Admin Authorization failed
 */
adminRouter.delete('/:code', asyncHandler(checkExistCode), asyncHandler(forceDeleteURLController))

export default adminRouter;
