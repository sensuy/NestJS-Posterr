import * as Joi from 'joi';


export const UserIdSchema = Joi.string().uuid().required();
