import pool from "../db.js"
import { forceDeleteURLQuery, getAllStatsQuery, getAllURLsQuery } from "../queries/admin.query.js";

export const getAllURLsService = async (page, per_page, order) => {
    const getQuery = getAllURLsQuery(order.toUpperCase());
    const data = await pool.query(getQuery, [per_page, (page - 1) * per_page]);
    return data.rows;
};

export const getAllStatsService = async () => {
    const data = await pool.query(getAllStatsQuery);
    const {total_links, total_visits} = data.rows[0]
    return {
        links: total_links,
        visits: total_visits
    }
}

export const forceDeleteURLService = async (code, data) => {
    await pool.query(forceDeleteURLQuery, [code]);
    return {
        shortCode: code,
    };
}