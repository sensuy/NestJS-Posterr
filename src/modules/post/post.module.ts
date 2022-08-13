import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import Post from './repositories/typeorm/entities/Post';
import PostController from 'modules/post/controllers/post.controller';
import PostRepository from './repositories/typeorm/repositories/PostRepository';
import PostService from './services/post.service';
import Repost from './repositories/typeorm/entities/Repost';
import Quote from 'modules/post/repositories/typeorm/entities/Quote';
import QuoteRepository from './repositories/typeorm/repositories/QuoteRepository';
import RepostRepository from './repositories/typeorm/repositories/RepostRepository';
import RepostService from './services/repost.service';
import QuoteService from './services/quote.service';
import { UserModule } from 'modules/user/user.module';
import RepostController from './controllers/repost.controller';
import QuoteController from './controllers/quote.controller';


@Module({
	imports: [TypeOrmModule.forFeature([Post, Repost, Quote]), UserModule],
	controllers: [
		PostController,
		RepostController,
		QuoteController
	],
	providers: [
		PostService,
		{
			provide: 'IPostRepository',
			useClass: PostRepository
		},
		RepostService,
		{
			provide: 'IRepostRepository',
			useClass: RepostRepository
		},
		QuoteService,
		{
			provide: 'IQuoteRepository',
			useClass: QuoteRepository

		},
	],
})
export class PostModule { }
