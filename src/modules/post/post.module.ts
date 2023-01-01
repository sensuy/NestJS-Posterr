import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import Post from './repositories/typeorm/entities/Post';
import PostController from 'modules/post/controllers/post.controller';
import PostService from './services/post.service';
import PostRepository from './repositories/typeorm/repositories/PostRepository';
import { UserModule } from '../user/user.module';
import { MiddlewareConsumer, NestModule } from '@nestjs/common/interfaces';
import { UserVerificationMiddleware } from './middleware/user-verification.middleware';



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
export class PostModule  implements NestModule{
  configure(consumer: MiddlewareConsumer) {
		consumer
		  .apply(UserVerificationMiddleware)
		  .forRoutes(PostController);
	  }
}
