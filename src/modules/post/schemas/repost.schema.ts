import * as Joi from 'joi';


export const CreateRepostSchema = Joi.object({
	fkUserId: Joi.string().uuid().required(),
	fkPostId: Joi.string().uuid().required(),
	content: Joi.string().required()
})