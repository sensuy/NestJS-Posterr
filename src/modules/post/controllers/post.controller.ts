import { Body, Controller, Get, Post } from "@nestjs/common";
import ICreatePostDTO from 'modules/post/dtos/ICreatePostDTO';
import PostResposnse from "../repositories/typeorm/entities/Post";
import PostService from "../services/post.service";

@Controller('post')
class PostController {

	constructor(
		private postService: PostService
	) { }


	@Post()
	async createPost(@Body() payload: ICreatePostDTO): Promise<PostResposnse> {
		
		const post =  await this.postService.createPost(payload);

		return post;
		
	}
}

export default PostController
