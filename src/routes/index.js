import express from 'express';
import shortenerRouter from './url-shortener.router.js';
import adminRouter from './admin.router.js';

/**
 * @swagger
 * tags:
 *   - name: Test Server
 *     description: Endpoints for testing server connectivity
 */
const appRouter = express.Router();

/**
 * @swagger
 * /ping:
 *   get:
 *     summary: Test server connectivity
 *     tags: 
 *       - Test Server
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

appRouter.use('/', shortenerRouter);
appRouter.use('/admin', adminRouter)

export default appRouter;
