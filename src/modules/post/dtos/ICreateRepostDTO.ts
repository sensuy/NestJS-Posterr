import { ApiProperty, PickType } from "@nestjs/swagger";
import Post from "../repositories/typeorm/entities/Post";

class ICreateRepostDTO extends PickType(Post, ['userid', 'postid']){}

export default ICreateRepostDTO;