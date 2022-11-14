import { ApiProperty, PickType } from "@nestjs/swagger";
import Post from "../repositories/typeorm/entities/Post";

export class CreateQuoteDto 
  extends PickType(Post, ['userid', 'postid', 'content']){}