import express from 'express';
import helmet from 'helmet';
import swaggerUi from 'swagger-ui-express';
import cors from 'cors';

import appRouter from './routes/index.js';
import pool from './db.js';
import { PORT } from './constant.js';
import { errorHandler } from './utils/error-handler.js';
import { logger } from './middlewares/logger.js';
import { swaggerSpec } from './config/swaggerSpec.js';

const app = express();
const port = PORT || 7272;

app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(logger);
app.set('trust proxy', 1); // Trust first proxy for rate limiting
app.use('/', appRouter);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
app.use(errorHandler);

await pool
    .query('SELECT NOW()')
    .then((res) => console.log('PostgreSQL connected at:', res.rows[0].now))
    .catch((err) => console.error('Connection error:', err));

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
