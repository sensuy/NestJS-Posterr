import { Body, Controller, Post, UsePipes } from "@nestjs/common";
import {
	ApiBadRequestResponse,
	ApiConflictResponse,
	ApiCreatedResponse,
	ApiNotFoundResponse,
	ApiOperation,
	ApiServiceUnavailableResponse,
	ApiTags
} from "@nestjs/swagger";
import { JoiValidationPipe } from "shared/utils/JoiValidationPipe";
import RepostService from "../services/repost.service";
import Repost from "../repositories/typeorm/entities/Repost";
import ICreateRepostDTO from "../dtos/ICreateRepostDTO";
import { CreateRepostSchema } from "../schemas/repost.schema";

@ApiTags('Post')
@Controller('repost')
class RepostController {

	constructor(private repostService: RepostService) { }

	@Post()
	@ApiOperation({
		summary: 'Create a new repost.',
		description: 'With a postid this endpoint allows the user repost another user post.'
	})
	@ApiCreatedResponse({ description: 'Repost sucessfully created.', type: Repost })
	@ApiServiceUnavailableResponse({ description: 'Repost creation failed.' })
	@ApiNotFoundResponse({ description: 'Original Post not found.' })
	@ApiConflictResponse({ description: 'User does not exist.' })
	@ApiBadRequestResponse({ description: 'Validation failed.' })
	@UsePipes(new JoiValidationPipe(CreateRepostSchema))
	async createPost(@Body() payload: ICreateRepostDTO): Promise<Repost> {
		const repost = await this.repostService.createRepost(payload);
		return repost;
	}
}

export default RepostController