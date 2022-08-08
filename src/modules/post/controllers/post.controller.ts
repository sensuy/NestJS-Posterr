import { Body, Controller, Post, UsePipes } from "@nestjs/common";
import {
	ApiBadRequestResponse,
	ApiCreatedResponse,
	ApiForbiddenResponse,
	ApiNotFoundResponse,
	ApiOperation,
	ApiServiceUnavailableResponse,
	ApiTags
} from "@nestjs/swagger";
import ICreatePostDTO from 'modules/post/dtos/ICreatePostDTO';
import PostResposnse from "../repositories/typeorm/entities/Post";
import { CreatePostSchema, CreateRepostSchema } from "../schemas/post.schema";
import PostService from "../services/post.service";
import { JoiValidationPipe } from "shared/utils/JoiValidationPipe";
import ICreateRepostDTO from "../dtos/ICreateRepostDTO";

@ApiTags('Post')
@Controller()
class PostController {

	constructor(private postService: PostService) { }

	@Post('post')
	@ApiOperation({ summary: 'Create a new post.' })
	@ApiCreatedResponse({ description: 'Post sucessfully created.', type: PostResposnse })
	@ApiBadRequestResponse({ description: 'Validation failed.' })
	@ApiServiceUnavailableResponse({ description: 'Post creation failed.' })
	@ApiNotFoundResponse({ description: 'User does not exist.' })
	@ApiForbiddenResponse({ description: 'You have reached the limit of posts per day' })
	@UsePipes(new JoiValidationPipe(CreatePostSchema))
	async createPost(@Body() payload: ICreatePostDTO): Promise<PostResposnse> {
		const post = await this.postService.createPost(payload);
		return post;
	}

	@Post('repost')
	@ApiOperation({ summary: 'Repost a post.' })
	@ApiCreatedResponse({ description: 'Post sucessfully created.', type: PostResposnse })
	@ApiBadRequestResponse({ description: 'Validation failed.' })
	@ApiServiceUnavailableResponse({ description: 'Post creation failed.' })
	@ApiNotFoundResponse({ description: 'User does not exist.  |  Post does not exist.' })
	@ApiForbiddenResponse({description: 'You can not repost your own post. | You have reached the limit of posts per day | You cannot repost your own post' })
	@UsePipes(new JoiValidationPipe(CreateRepostSchema))
	async createRepost(@Body() payload: ICreateRepostDTO): Promise<PostResposnse> {
		const post = await this.postService.repost(payload);
		return post;
	}
}

export default PostController
