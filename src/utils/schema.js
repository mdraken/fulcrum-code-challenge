import Joi from 'joi';
const fieldNameSchema = Joi.string().max(50).min(2).required().messages({
    'string.empty': 'Field name can not be empty',
    'string.min': 'Field name needs to be at least 2 characters',
    'string.max': 'Field name can only be 50 characters long',
});
const valueSchema = Joi.number().positive().required().messages({
    'any.required': 'Value can not be empty',
    'number.positive': 'Value must be a positive number',
});
const costTypeSchema = Joi.required().empty().messages({
    'any.required': 'Please pick a cost type',
    'any.empty': 'Please pick a cost type'
});

export { fieldNameSchema, valueSchema, costTypeSchema };