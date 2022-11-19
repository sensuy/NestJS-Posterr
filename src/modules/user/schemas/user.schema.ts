import * as Joi from 'joi';
import { MAX_USER_NAME_CHARACTERS } from '../constants/user.constants';

const userName = Joi.string().alphanum().max(MAX_USER_NAME_CHARACTERS).required()

export const SeedUserSchema = Joi.array().items(
	Joi.object({
		userName
	}));

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