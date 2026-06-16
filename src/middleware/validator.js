const Joi = require('joi');

// Schema for Creating (Strict - requires all fields)
const productSchema = Joi.object({
    name: Joi.string().min(2).max(100).required(),
    category: Joi.string().min(2).max(50).required(),
    price: Joi.number().min(0).required(),
    description: Joi.string().allow('', null),
    stock: Joi.number().integer().min(0).required()
});

// Schema for Updating (Flexible - fields are optional)
const updateSchema = Joi.object({
    name: Joi.string().min(2).max(100),
    category: Joi.string().min(2).max(50),
    price: Joi.number().min(0),
    description: Joi.string().allow('', null),
    stock: Joi.number().integer().min(0)
}).min(1); // Ensures at least one field is sent

const validateProduct = (req, res, next) => {
    const { error } = productSchema.validate(req.body, { abortEarly: false });
    if (error) {
        const errors = error.details.map(err => err.message);
        return res.status(400).json({ success: false, errors });
    }
    next();
};

const validateProductUpdate = (req, res, next) => {
    const { error } = updateSchema.validate(req.body, { abortEarly: false });
    if (error) {
        const errors = error.details.map(err => err.message);
        return res.status(400).json({ success: false, errors });
    }
    next();
};

module.exports = { validateProduct, validateProductUpdate };