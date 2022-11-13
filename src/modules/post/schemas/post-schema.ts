import * as Joi from 'joi';
import { MAX_POST_CHARACTERS } from '../constants/post.constants';


// const userid = Joi.string().uuid().required();
// const content = Joi.string().max(MAX_POST_CHARACTERS).required();
// const postid = Joi.string().uuid().required()

export const CreatePostSchema = Joi.object({
   userid: Joi.string().uuid().required(),
   content: Joi.string().max(140).required()
}) 

// export const CreatePostSchema = Joi.object().keys({
//   userid,
//   content
// })

export const CreateRepostSchema = Joi.object({
  postid: Joi.string().uuid().required(),
  userid: Joi.string().uuid().required()
})

export const CreateQuoteSchema = Joi.object({
  userid: Joi.string().uuid().required(),
  postid: Joi.string().uuid().required(),
  content: Joi.string().max(140).required()
})

export const PaginationSchema = Joi.object({
  limit: Joi.number().min(1).max(10).required(),
  page: Joi.number().min(1).required(),
  startDate: Joi.date().iso().messages({ 'date.format': `Date format is YYYY-MM-DD` }),
  endDate: Joi.date().iso().greater(Joi.ref('startDate'))
    .messages({
      'date.format': `Date format is YYYY-MM-DD`,
      'date.greater': `EndDate must be greater than startDate`
    })
})


// export const UserIdSchema = Joi.object({
//   userid: Joi.string().uuid().required()
// })
