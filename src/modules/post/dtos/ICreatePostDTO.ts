import { PickType } from "@nestjs/swagger";
import Post from "../repositories/typeorm/entities/Post";

class ICreatePostDTO extends PickType(Post, ['userid', 'content']){}

export default ICreatePostDTO;