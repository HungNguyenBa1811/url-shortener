import HTTPError from "../utils/error.helper.js";

export function validate(schema) {
    return async function (req, res, next) {
        try {
            await schema.validateAsync(req.body, {
                abortEarly: false
            });
            next();
        } catch (err) {
            const message = err.details?.map(d => d.message).join(', ') || 'URL Validation error';
            throw new HTTPError(400, message);
        }
    }
}