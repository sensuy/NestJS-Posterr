import * as Joi from 'joi';


const userid = Joi.string().uuid().required().messages({
  'string.base': `userid must be a string`,
  'string.empty': `userid cannot be an empty field`,
  'string.guid': `userid must be a valid uuid`
})

export const UserIdSchema = userid;
