import { Body, Controller, Get, Param, Post, Query, UsePipes } from "@nestjs/common";
import {
	ApiBadRequestResponse,
	ApiCreatedResponse,
	ApiForbiddenResponse,
	ApiNotFoundResponse,
	ApiOkResponse,
	ApiOperation,
	ApiServiceUnavailableResponse,
	ApiTags
} from "@nestjs/swagger";
import PostResposnse from "../repositories/typeorm/entities/Post";
import { CreatePostSchema, CreateQuoteSchema, CreateRepostSchema } from "../schemas/post-schema";
import PostService from "../services/post.service";
import { JoiValidationPipe } from "shared/utils/JoiValidationPipe";
import { IPaginationByDate } from "shared/interfaces/IPagination";
import { IUserId } from "shared/interfaces/IUser";
import { CreatePostDto } from "../dtos/createPost.dto";
import { CreateQuoteDto } from "../dtos/createQuote.dto";
import { CreateRepostDTO } from "../dtos/createRepost.dto";
import { PaginationSchema } from "shared/schemas/pagination.schema";

@ApiTags('Post')
@Controller()
class PostController {

	constructor(
		private postService: PostService
	) { }

	@Get('post/:userid')
	@ApiOperation({
		summary: 'List the latest posts by a user',
		description: 'Here you can list the latest posts, reposts and quotes from a user'
	})
	@ApiOkResponse({ type: [PostResposnse] })
	@ApiBadRequestResponse({ description: 'Validation failed.' })
	@ApiServiceUnavailableResponse({ description: 'List posts failed.' })
	async getLatestPostsByUser(
		@Query(new JoiValidationPipe(PaginationSchema)) queryParams: IPaginationByDate,
		@Param() useridParam: IUserId
	): Promise<PostResposnse[]> {
		const { userid } = useridParam;
		return this.postService.listUserPosts(userid, queryParams);
	}

	@Get('post')
	@ApiOperation({
		summary: 'List the latest posts',
		description: 'Here you can list the latest posts, reposts and quotes with or without a date range'
	})
	@ApiOkResponse({ type: [PostResposnse] })
	@ApiServiceUnavailableResponse({ description: 'List posts failed.' })
	@ApiBadRequestResponse({ description: 'Validation failed.' })
	@UsePipes(new JoiValidationPipe(PaginationSchema))
	async getLatestPosts(@Query() queryParams: IPaginationByDate): Promise<PostResposnse[]> {
		return this.postService.listLatestPosts(queryParams);
	}

	@Post('post')
	@ApiOperation({ summary: 'Create a new post.' })
	@ApiCreatedResponse({
    description: 'Post sucessfully created.',
		type: PostResposnse
	})
	@ApiBadRequestResponse({ description: 'Validation failed.' })
	@ApiServiceUnavailableResponse({ description: 'Post creation failed.' })
	@ApiNotFoundResponse({ description: 'User does not exist.' })
	@ApiForbiddenResponse({ description: 'You have reached the limit of posts per day' })
  @UsePipes(new JoiValidationPipe(CreatePostSchema))
	async createPost(@Body() payload: CreatePostDto): Promise<PostResposnse> {
		return this.postService.createPost(payload);
	}

	@Post('repost')
	@ApiOperation({ summary: 'Repost a post.' })
	@ApiCreatedResponse({ description: 'Post sucessfully created.', type: PostResposnse })
	@ApiBadRequestResponse({ description: 'Validation failed.' })
	@ApiServiceUnavailableResponse({ description: 'Post creation failed.' })
	@ApiNotFoundResponse({ description: 'User does not exist.  |  Post does not exist.' })
	@ApiForbiddenResponse({ description: `You can not repost your own post. | You have reached the limit of posts per day | You can not repost a repost` })
	@UsePipes(new JoiValidationPipe(CreateRepostSchema))
	async createRepost(@Body() payload: CreateRepostDTO): Promise<PostResposnse> {
		return this.postService.createRepost(payload);
	}

	@Post('quote')
	@ApiOperation({ summary: 'Quote a post/repost.' })
	@ApiCreatedResponse({ description: 'Post sucessfully created.', type: PostResposnse })
	@ApiBadRequestResponse({ description: 'Validation failed.' })
	@ApiServiceUnavailableResponse({ description: 'Post creation failed.' })
	@ApiNotFoundResponse({ description: 'User does not exist.  |  Post does not exist.' })
	@ApiForbiddenResponse({ description: 'You cannot quote your own post. | You have reached the limit of posts per day | You can not quote a quote' })
	@UsePipes(new JoiValidationPipe(CreateQuoteSchema))
	async createQuote(@Body() payload: CreateQuoteDto): Promise<PostResposnse> {
		return this.postService.createQuote(payload);
	}
}

export default PostController;
