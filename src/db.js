import { Pool } from 'pg';
import { DB_URL } from './constant.js';

const pool = new Pool({
    connectionString: DB_URL,
});

export default pool;
