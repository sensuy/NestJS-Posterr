
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import IQuoteRepository from '../../IQuoteRepository';
import Quote from '../entities/Quote';
import ICreateQuotetDTO from 'modules/post/dtos/ICreateQuotetDTO';

@Injectable()
class QuoteRepository implements IQuoteRepository {
	
	constructor(
		@InjectRepository(Quote)
		private quoteRepository: Repository<Quote>
	) { }

	public create(data: ICreateQuotetDTO): Quote {
		return this.quoteRepository.create(data);
	}

	public save(quote: Quote): Promise<Quote> {
		return this.quoteRepository.save(quote);
	}
}

export default QuoteRepository;