import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import ICreatePostDTO from 'modules/post/dtos/ICreatePostDTO';
import Post from "../repositories/typeorm/entities/Post";
import IPostRepository from "../repositories/IPostRepository";


@Injectable()
class PostService {

	constructor(
		@Inject('IPostRepository') private postRepository: IPostRepository
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