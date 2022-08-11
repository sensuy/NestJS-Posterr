import * as Joi from 'joi';

export const CreatePostSchema = Joi.object({
	fkUserId: Joi.string().uuid().required(),
	content: Joi.string().max(777).required()
})

export const CreateRepostSchema = Joi.object({
	postid: Joi.string().uuid().required(),
	userid: Joi.string().uuid().required()
})

export const CreateQuoteSchema = Joi.object({
	userid: Joi.string().uuid().required(),
	postid: Joi.string().uuid().required(),
	content: Joi.string().max(140).required()
})