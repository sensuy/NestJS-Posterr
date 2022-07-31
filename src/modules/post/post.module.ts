import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import Post from './repositories/typeorm/entities/Post';
import PostController from 'modules/post/controllers/post.controller';
import PostService from './services/post.service';
import PostRepository from './repositories/typeorm/repositories/PostRepository';

@Module({
	imports: [TypeOrmModule.forFeature([Post])],
	controllers: [PostController],
	exports: [],
	providers: [
		PostService,
		PostRepository
	],
})
export class PostModule { }
