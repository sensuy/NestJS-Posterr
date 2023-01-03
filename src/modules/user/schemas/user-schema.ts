import * as Joi from 'joi';
import { MAX_USER_NAME_CHARACTERS } from '../constants/user.constants';

const userName = Joi
.string()
.alphanum()
.max(MAX_USER_NAME_CHARACTERS)
.required()
.messages({
  'string.base': 'userName must be a string',
  'string.empty': 'userName cannot be an empty field',
  'string.max': `userName cannot be more than ${MAX_USER_NAME_CHARACTERS} characters`,
  'any.required': 'userName is a required field',
  'string.alphanum': 'userName must be alphanumeric'
});

export const SeedUserSchema = Joi.array().items(
  Joi.object({
    userName
  })).messages({
    'array.base': 'userName must be an array'
  });


export const FindUserSchema = userName;

export const userSchemaResponse = {
  type: 'array',
  items: {
    type: 'object',
    properties: {
      userid: {
        type: 'string'
      },
      interactions: {
        type: 'number'
      },
      created_at: {
        type: 'string'
      }
    }
  }
}