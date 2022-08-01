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
import QuoteService from "../services/quote.service";
import Quote from "../repositories/typeorm/entities/Quote";
import ICreateQuotetDTO from "../dtos/ICreateQuotetDTO";
import { CreateQuoteSchema } from "../schemas/quote.schema";

@ApiTags('Post')
@Controller('quote')
class QuoteController {

	constructor(private quoteService: QuoteService) { }

	@Post()
	@ApiOperation({
		summary: 'Create a new quote.',
		description: 'With a postid this endpoint allows the user quote another user post.'
	})
	@ApiCreatedResponse({ description: 'Quote sucessfully created.', type: Quote })
	@ApiServiceUnavailableResponse({ description: 'Quote creation failed.' })
	@ApiNotFoundResponse({ description: 'Original Post not found.' })
	@ApiConflictResponse({ description: 'User does not exist.' })
	@ApiBadRequestResponse({ description: 'Validation failed.' })
	@UsePipes(new JoiValidationPipe(CreateQuoteSchema))
	async createPost(@Body() payload: ICreateQuotetDTO): Promise<Quote> {
		const repost = await this.quoteService.createQuote(payload);
		return repost;
	}
}

export default QuoteController
