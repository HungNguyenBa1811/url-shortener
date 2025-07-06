import { ADMIN_KEY } from '../constant.js';
import HTTPError from '../utils/error.helper.js';

export async function checkAdmin(req, res, next) {
    const requestKey = req.headers['x-api-key'];

    if (requestKey !== ADMIN_KEY) {
        throw new HTTPError(403, 'Admin Authorization failed'); // devdad
    }
    next();
}
