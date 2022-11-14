import { PickType } from "@nestjs/swagger";
import Post from "../repositories/typeorm/entities/Post";

export class CreatePostDto
  extends PickType(Post, ['userid', 'content']) { }