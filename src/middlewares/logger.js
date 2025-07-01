import moment from "moment";

export const logger = (req, res, next) => {
    console.log(`[${moment().format('DD/MM/YYYY hh:mm:ss a')}] ${req.method} ${req.originalUrl}`);
    next();
};