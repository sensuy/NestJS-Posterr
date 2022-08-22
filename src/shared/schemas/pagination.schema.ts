import * as Joi from 'joi';

export const PaginationSchema = Joi.object({
	limit: Joi.number().min(1).max(10).required(),
	page: Joi.number().min(1).required(),
	startDate: Joi.date().iso().messages({'date.format': `Date format is YYYY-MM-DD`}),
	finalDate: Joi.date().iso().messages({'date.format': `Date format is YYYY-MM-DD`})
})