import Joi from "joi";

export const getURLRequest = Joi.object({
    page: Joi.number()
        .integer()
        .min(1)
        .default(1)
        .messages({
            'number.base': 'Page must be a number',
            'number.integer': 'Page must be an integer',
            'number.min': 'Page must be at least 1'
        }),
    per_page: Joi.number()
        .integer()
        .min(1)
        .default(10)
        .messages({
            'number.base': 'Per page must be a number',
            'number.integer': 'Per page must be an integer',
            'number.min': 'Per page must be at least 1'
        }),
    order: Joi.string()
        .valid('asc', 'desc')
        .default('asc')
        .messages({
            'string.base': 'Order must be a string',
            'any.only': 'Order must be either "asc" or "desc"',
            'string.empty': 'Order cannot be empty'
        })
})