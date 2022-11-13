import { ApiProperty, PickType } from "@nestjs/swagger";
import Post from "../repositories/typeorm/entities/Post";

class ICreateQuoteDTO extends PickType(Post, ['userid', 'postid', 'content']){}

export default ICreateQuoteDTO;