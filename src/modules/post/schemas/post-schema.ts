import * as Joi from 'joi';
import { UserIdSchema } from 'shared/schemas/users.schema';
import { MAX_POST_CHARACTERS, MAX_QUOTE_CHARACTERS } from '../constants/post.constants';


const userid = UserIdSchema;
const content = Joi.string().max(MAX_POST_CHARACTERS).required();
const postid = Joi.string().uuid().required()

export const CreatePostSchema = Joi.object().keys({
  userid,
  content
})

export const CreateRepostSchema = Joi.object().keys({
  postid,
  userid
})

export const CreateQuoteSchema = Joi.object({
  userid,
  postid,
  content: content.max(MAX_QUOTE_CHARACTERS)
})

