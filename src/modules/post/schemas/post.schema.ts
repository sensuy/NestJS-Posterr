import * as Joi from 'joi';


export const CreatePostSchema = Joi.object({
	fkIdUser: Joi.string().uuid().required(),
	content: Joi.string().max(777).required()
})