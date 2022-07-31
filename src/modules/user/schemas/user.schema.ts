import * as Joi from 'joi';


export const SeedUserSchema = Joi.array().items(
	Joi.object({
		userName: Joi.string().max(14).required(),
		interactions: Joi.number().valid(0).required(),
	}));

export const FindUserSchema = Joi.string().max(14).required()


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