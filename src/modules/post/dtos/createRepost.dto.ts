import { ApiProperty, PickType } from "@nestjs/swagger";
import Post from "../repositories/typeorm/entities/Post";

export class CreateRepostDTO 
  extends PickType(Post, ['userid', 'postid']){}
