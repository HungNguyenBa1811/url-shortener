export const createQuery = `
    INSERT INTO urls (original_url)
    VALUES ($1)
    RETURNING id;
`;

export const getByCodeQuery = `
    SELECT * FROM urls
    WHERE short_code = $1;
`;

export const updateQuery = `
    UPDATE urls
    SET original_url = $1, updated_at = NOW()
    WHERE short_code = $2;
`;

export const updateWithReturnQuery = `
    UPDATE urls
    SET short_code = $1, updated_at = NOW()
    WHERE id = $2 AND original_url = $3
    RETURNING *;
`;

export const updateAccessCountQuery = `
    UPDATE urls
    SET access_count = $1, updated_at = NOW()
    WHERE short_code = $2;
`;

export const deleteQuery = `
    DELETE FROM urls
    WHERE short_code = $1;
`;