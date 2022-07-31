import { Body, Controller, Get, Post } from "@nestjs/common";
import { ApiCreatedResponse, ApiResponse, ApiServiceUnavailableResponse, ApiTags } from "@nestjs/swagger";
import ICreatePostDTO from 'modules/post/dtos/ICreatePostDTO';
import PostResposnse from "../repositories/typeorm/entities/Post";
import PostService from "../services/post.service";

@ApiTags('Post')
@Controller('post')
class PostController {

	constructor(private postService: PostService) { }

	@Post()
	@ApiCreatedResponse({ description: 'Post sucessfully created.', type: PostResposnse })
	@ApiServiceUnavailableResponse({description: 'Post creation failed.'})
	async createPost(@Body() payload: ICreatePostDTO): Promise<PostResposnse> {
		const post =  await this.postService.createPost(payload);
		return post;
	}
}

export default PostController
