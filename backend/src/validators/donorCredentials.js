const { celebrate, Segments, Joi } = require('celebrate');

exports.validate = [
    celebrate({
        [Segments.BODY]: Joi.object().keys({
            name: Joi.string().required(),
            birth: Joi.date().required(),
            street: Joi.string().required(),
            number: Joi.number().integer().required(),
            city: Joi.string().required(),
            district: Joi.string().required(),
            uf: Joi.string().max(2).min(2).required(),
            zipCode: Joi.string().required().length(8),
            phone: Joi.string().required().length(11),
            id_user: Joi.number().integer().required()
        })
    })
];
