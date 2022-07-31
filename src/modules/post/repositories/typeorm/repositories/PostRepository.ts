import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import ICreatePostDTO from 'modules/post/dtos/ICreatePostDTO';
import IPostRepository from '../../IPostRepository';
import Post from '../entities/Post';

@Injectable()
class PostRepository implements IPostRepository {
	
	constructor(
		@InjectRepository(Post)
		private postRepository: Repository<Post>
	) { }

	public create(post: ICreatePostDTO): Post {
		return this.postRepository.create(post);
	}

	public save(post: Post): Promise<Post> {
		return this.postRepository.save(post);
	}
}

export default PostRepository;