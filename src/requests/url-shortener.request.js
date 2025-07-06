import Joi from "joi";

export const urlShortenerRequest = Joi.object({
    url: Joi.string()
        .uri({ scheme: ['http', 'https'] })
        .required()
        .messages({
            'string.base': 'URL must be a string',
            'string.empty': 'URL cannot be empty',
            'string.uri': 'URL must be a valid URI',
            'any.required': 'URL is required'
        })
})