import * as Joi from 'joi';


const userid = Joi.string().uuid().required().messages({
  'string.base': `userid must be a string`,
  'string.empty': `userid cannot be an empty field`,
  'string.guid': `userid must be a valid uuid`,
  'any.required': `userid is a required field`
})

export const UserIdSchema = userid;
