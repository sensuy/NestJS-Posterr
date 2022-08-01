import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import IPostRepository from "../repositories/IPostRepository";
import ICreateQuotetDTO from "../dtos/ICreateQuotetDTO";
import Quote from "../repositories/typeorm/entities/Quote";
import IQuoteRepository from "../repositories/IQuoteRepository";
import IUserRepository from "modules/user/repositories/IUserRepository";


@Injectable()
class QuoteService {

	constructor(
		@Inject('IQuoteRepository') private quoteRepository: IQuoteRepository,
		@Inject('IPostRepository') private postRepository: IPostRepository,
		@Inject('IUserRepository') private userRepository: IUserRepository
	) { }


	async createQuote(payload: ICreateQuotetDTO): Promise<Quote> {

		const user = this.userRepository.listById(payload.fkUserId);

		if (!user) {
			throw new HttpException('User does not exist.', HttpStatus.CONFLICT);
		}

		const post = await this.postRepository.listById(payload.fkPostId);

		if (!post) {
			throw new HttpException('Original Post not found', HttpStatus.NOT_FOUND);
		}

		let quote = this.quoteRepository.create(payload);

		try {
			quote = await this.quoteRepository.save(quote);
		} catch (error) {
			throw new HttpException('Quote creation failed', HttpStatus.SERVICE_UNAVAILABLE);
		}

		return quote;
	}

}

export default QuoteService;