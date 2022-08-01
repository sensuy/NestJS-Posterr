import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import Post from './repositories/typeorm/entities/Post';
import PostController from 'modules/post/controllers/post.controller';
import PostRepository from './repositories/typeorm/repositories/PostRepository';
import PostService from './services/post.service';
import Repost from './repositories/typeorm/entities/Repost';
import Quotes from 'modules/post/repositories/typeorm/entities/Quote';


@Module({
	imports: [TypeOrmModule.forFeature([Post, Repost, Quotes])],
	controllers: [PostController],
	exports: [],
	providers: [
		PostService,
		{
			provide: 'IPostRepository',
			useClass: PostRepository
		}
	],
})
export class PostModule { }
