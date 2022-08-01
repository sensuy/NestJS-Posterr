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


@Module({
	imports: [TypeOrmModule.forFeature([Post, Repost, Quote])],
	controllers: [PostController],
	exports: [],
	providers: [
		PostService,
		{
			provide: 'IPostRepository',
			useClass: PostRepository
		},
		{
			provide: 'IQuoteRepository',
			useClass: QuoteRepository

		},
		{
			provide: 'IRepostRepository',
			useClass: RepostRepository
		}
	],
})
export class PostModule { }
