import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import PostRepository from "../repositories/typeorm/repositories/PostRepository";
import ICreatePostDTO from 'modules/post/dtos/ICreatePostDTO';
import Post from "../repositories/typeorm/entities/Post";


@Injectable()
class PostService {

	constructor(
		private postRepository: PostRepository
	) { }


	async createPost(payload: ICreatePostDTO): Promise<Post> {
		let post = this.postRepository.create(payload);
		try {
			post = await this.postRepository.save(post);
		} catch (error) {
			throw new HttpException('Post creation failed', HttpStatus.SERVICE_UNAVAILABLE);
		}

		return post;
	}

}

export default PostService;