export const rateLimitConfig = {
    windowMs: 1 * 60 * 1000, // 1 minute
    limit: 5, // Limit each IP to 5 requests per windowMs
    statusCode: 429, // HTTP status code for Too Many Requests
    message: 'Too many requests, please try again later.',
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
}