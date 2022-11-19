import * as Joi from 'joi';

export const PaginationSchema = Joi.object({
  limit: Joi.number().min(1).max(10).required(),
  page: Joi.number().min(1).required(),
  startDate: Joi.date().iso().messages({ 'date.format': `startDate format is YYYY-MM-DD` }),
  endDate: Joi.date().iso().greater(Joi.ref('startDate'))
    .messages({
      'date.format': `startDate format is YYYY-MM-DD`,
      'date.greater': `endDate must be greater than startDate`
    })
})