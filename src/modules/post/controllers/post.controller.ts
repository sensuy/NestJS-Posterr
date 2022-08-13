import { Body, Controller, Get, Post, Query, UsePipes } from "@nestjs/common";
import {
	ApiBadRequestResponse,
	ApiCreatedResponse,
	ApiForbiddenResponse,
	ApiNotFoundResponse,
	ApiOperation,
	ApiQuery,
	ApiServiceUnavailableResponse,
	ApiTags
} from "@nestjs/swagger";
import ICreatePostDTO from 'modules/post/dtos/ICreatePostDTO';
import PostResposnse from "../repositories/typeorm/entities/Post";
import { CreatePostSchema, CreateQuoteSchema, CreateRepostSchema } from "../schemas/post.schema";
import PostService from "../services/post.service";
import { JoiValidationPipe } from "shared/utils/JoiValidationPipe";
import ICreateRepostDTO from "../dtos/ICreateRepostDTO";
import ICreateQuoteDTO from "../dtos/ICreateQuoteDTO";
import IPagination from "shared/interfaces/IPagination";

@ApiTags('Post')
@Controller()
class PostController {

	constructor(private postService: PostService) { }

	@Get('post')
	@ApiOperation({ summary: 'List the latests posts' })
	async getLatestPosts(@Query() {limit, offset}: IPagination): Promise<PostResposnse[]> {
		const posts = await this.postService.listLatestPosts({ limit, offset });
		return posts;
	}

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
	@ApiForbiddenResponse({description: 'You can not repost your own post. | You have reached the limit of posts per day | You can not repost a repost' })
	@UsePipes(new JoiValidationPipe(CreateRepostSchema))
	async createRepost(@Body() payload: ICreateRepostDTO): Promise<PostResposnse> {
		const repost = await this.postService.creatRepost(payload);
		return repost;
	}

	@Post('quote')
	@ApiOperation({ summary: 'Quote a post/repost.' })
	@ApiCreatedResponse({ description: 'Post sucessfully created.', type: PostResposnse })
	@ApiBadRequestResponse({ description: 'Validation failed.' })
	@ApiServiceUnavailableResponse({ description: 'Post creation failed.' })
	@ApiNotFoundResponse({ description: 'User does not exist.  |  Post does not exist.' })
	@ApiForbiddenResponse({description: 'You cannot quote your own post. | You have reached the limit of posts per day | You can not quote a quote' })
	@UsePipes(new JoiValidationPipe(CreateQuoteSchema))
	async createQuote(@Body() payload: ICreateQuoteDTO): Promise<PostResposnse> {
		const quote = await this.postService.createQuote(payload);
		return quote;
	}
}

export default PostController;
