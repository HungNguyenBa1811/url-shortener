import pool from "../db.js";
import HTTPError from "../utils/error.helper.js";
import { getByCodeQuery } from "../queries/url-shortener.queries.js";

export async function checkExistCode(req, res, next) {
    const { code } = req.params;

    // Check if code exists
    const result = await pool.query(getByCodeQuery, [code]);

    if (!result.rows.length)
        throw new HTTPError(404, 'Shortened URL not found');
    
    req.shortCodeData = result.rows[0];
    next();
}