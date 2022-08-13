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

	public create(data: ICreatePostDTO): Post {
		return this.postRepository.create(data);
	}

	public save(post: Post): Promise<Post> {
		return this.postRepository.save(post);
	}

	listById(postid: string): Promise<Post> {
		return this.postRepository.findOne({ where: { postid } });
	}
}

export default PostRepository;