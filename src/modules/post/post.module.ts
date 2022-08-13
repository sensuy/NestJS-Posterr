import { TypeOrmModule } from '@nestjs/typeorm';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import Post from './repositories/typeorm/entities/Post';
import PostController from 'modules/post/controllers/post.controller';
import PostRepository from './repositories/typeorm/repositories/PostRepository';
import PostService from './services/post.service';
import { UserModule } from 'modules/user/user.module';
import { UserVerificationMiddleware } from './middlewares/user-verification.middleware';
import { PostVerificationMiddleware } from './middlewares/post-verification.middleware';


@Module({
	imports: [TypeOrmModule.forFeature([Post]), UserModule],
	controllers: [
		PostController
	],
	providers: [
		PostService,
		{
			provide: 'IPostRepository',
			useClass: PostRepository
		}
	],
})
export class PostModule implements NestModule { 
	configure(consumer: MiddlewareConsumer) {
		consumer
		  .apply(UserVerificationMiddleware, PostVerificationMiddleware)
		  .forRoutes(PostController);
	  }
}
