import crypto from 'crypto';
import pool from '../db.js';
import { BASE_URL } from '../constant.js';
import {
    createQuery,
    updateQuery,
    updateWithReturnQuery,
    updateAccessCountQuery,
    deleteQuery,
} from '../queries/url-shortener.queries.js';

const randomLength68 = () => Math.floor(Math.random() * 3) + 6;

const hashCode = (id, url) => {
    const raw = `${id}${url}`;
    const hash = crypto.createHash('sha256').update(raw).digest('base64url');
    return hash.slice(0, randomLength68());
};

export const createURLShortenerService = async (url) => {
    const data = await pool.query(createQuery, [url]);
    const id = data.rows[0].id;

    // Hashing for short_code
    const super_duper_short_code = hashCode(id, url);

    // Update and return data
    const pushCommit = await pool.query(updateWithReturnQuery, [super_duper_short_code, id, url]);
    const { createdAt, updatedAt } = pushCommit.rows[0];
    return {
        id,
        url: `${BASE_URL}/${super_duper_short_code}`,
        shortCode: super_duper_short_code,
        createdAt,
        updatedAt,
    }
};

export const getURLShortenerByCodeService = async (code, data) => {
    data.access_count += 1;
    await pool.query(updateAccessCountQuery, [data.access_count, code]);
    const { access_count, ...no_access_count } = data;
    return no_access_count;
}

export const updateURLShortenerService = async (code, url, data) => {
    await pool.query(updateQuery, [url, code]);
    return {
        id: data.id,
        url: `${BASE_URL}/${code}`,
        shortCode: code,
        createdAt: data.created_at,
        updatedAt: new Date(),
    };
};

export const deleteURLShortenerService = async (code, data) => {
    await pool.query(deleteQuery, [code]);
    return {
        id: data.id,
        url: `${BASE_URL}/${code}`,
        shortCode: code,
        createdAt: data.created_at,
        updatedAt: new Date(),
    };
}