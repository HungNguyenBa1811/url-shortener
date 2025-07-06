import HTTPError from "../utils/error.helper.js";

export function validate(schema) {
    return async function (req, res, next) {
        try {
            const toValidate = req.method === 'GET' ? req.query : req.body;
            await schema.validateAsync(toValidate, {
                abortEarly: false,
            });
            next();
        } catch (err) {
            const message = err.details?.map(d => d.message).join(', ') || 'URL Validation error';
            throw new HTTPError(400, message);
        }
    }
}