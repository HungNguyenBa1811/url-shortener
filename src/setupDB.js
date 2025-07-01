import pool from "./db.js";

const dbsetup = async () => {
    try {
        await pool.query(`
            CREATE TABLE IF NOT EXISTS urls (
                id SERIAL PRIMARY KEY,
                short_code VARCHAR(50) UNIQUE,
                original_url TEXT NOT NULL,
                access_count INTEGER DEFAULT 0,
                created_at TIMESTAMP DEFAULT NOW(),
                updated_at TIMESTAMP
            );
        `);
        console.log('Table created!')
    } catch (err) {
        console.log('Error: ', err)
    } finally {
        pool.end();
    }
}

dbsetup()