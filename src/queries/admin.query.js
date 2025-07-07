export const getAllURLsQuery = (sort_order) => `
    SELECT * FROM urls
    ORDER BY created_at ${sort_order}
    LIMIT $1 
    OFFSET $2;
`;

export const getAllStatsQuery = `
    SELECT 
        COUNT(*) as total_links, 
        SUM(access_count) as total_visits 
    FROM urls;
`;

export const searchLinksQuery = `
    SELECT * FROM urls
    WHERE urls.original_url ILIKE $1
    OR urls.short_code ILIKE $1
    ORDER BY urls.created_at DESC
    LIMIT 5;
`;

export const forceDeleteURLQuery = `
    DELETE FROM urls WHERE short_code = $1;
`;