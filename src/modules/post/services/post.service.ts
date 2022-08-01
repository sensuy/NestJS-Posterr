import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import ICreatePostDTO from 'modules/post/dtos/ICreatePostDTO';
import Post from "../repositories/typeorm/entities/Post";
import IPostRepository from "../repositories/IPostRepository";
import IUserRepository from "modules/user/repositories/IUserRepository";
import { UpdateResult } from "typeorm";


@Injectable()
class PostService {

	constructor(
		@Inject('IPostRepository') private postRepository: IPostRepository,
		@Inject('IUserRepository') private userRepository: IUserRepository
	) { }

	async createPost(payload: ICreatePostDTO): Promise<Post> {

		let post = this.postRepository.create(payload);
		console.log(new Date());
		
		try {
			[post,] = await Promise.all([
				this.postRepository.save(post),
				this.userRepository.incrementInteractions(payload.fkUserId)
			]);
		} catch (error) {
			throw new HttpException('Post creation failed', HttpStatus.SERVICE_UNAVAILABLE);
		}

		return post;
	}

}

export default PostService;