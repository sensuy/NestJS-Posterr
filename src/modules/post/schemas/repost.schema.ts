import * as Joi from 'joi';


export const CreateRepostSchema = Joi.object({
	postFk: Joi.string().uuid().required(),
	repostFk: Joi.string().uuid().required()
})