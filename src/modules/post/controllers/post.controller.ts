import { Body, Controller, Post, UsePipes } from "@nestjs/common";
import { ApiBadRequestResponse, ApiCreatedResponse, ApiOperation, ApiServiceUnavailableResponse, ApiTags } from "@nestjs/swagger";
import ICreatePostDTO from 'modules/post/dtos/ICreatePostDTO';
import PostResposnse from "../repositories/typeorm/entities/Post";
import { CreatePostSchema } from "../schemas/post.schema";
import PostService from "../services/post.service";
import { JoiValidationPipe } from "shared/utils/JoiValidationPipe";

@ApiTags('Post')
@Controller('post')
class PostController {

	constructor(private postService: PostService) { }

	@Post()
	@ApiOperation({ summary: 'Create a new Poster' })
	@ApiCreatedResponse({ description: 'Post sucessfully created.', type: PostResposnse })
	@ApiBadRequestResponse({ description: 'Validation failed.' })
	@ApiServiceUnavailableResponse({ description: 'Post creation failed.' })
	@UsePipes(new JoiValidationPipe(CreatePostSchema))
	async createPost(@Body() payload: ICreatePostDTO): Promise<PostResposnse> {
		const post = await this.postService.createPost(payload);
		return post;
	}
}

export default PostController
