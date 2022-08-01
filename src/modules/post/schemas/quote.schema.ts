import * as Joi from 'joi';


export const CreateQuoteSchema = Joi.object({
	fkUserId: Joi.string().uuid().required(),
	fkPostId: Joi.string().uuid().required(),
	content: Joi.string().max(777).required()
})