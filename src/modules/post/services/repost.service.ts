import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import PostRepository from "../repositories/typeorm/repositories/PostRepository";
import ICreatePostDTO from 'modules/post/dtos/ICreatePostDTO';
import Post from "../repositories/typeorm/entities/Post";
import IPostRepository from "../repositories/IPostRepository";
import IRepostRepository from "../repositories/IRepostRepository";
import ICreateRepostDTO from "../dtos/ICreateRepostDTO";
import Repost from "../repositories/typeorm/entities/Repost";


@Injectable()
class RepostService {

	constructor(
		@Inject('IRepostRepository') private repostRepository: IRepostRepository,
		@Inject('IPostRepository') private postRepository: IPostRepository
	) { }


	async createRepost(payload: ICreateRepostDTO): Promise<Repost> {
		const post = await this.postRepository.listById(payload.fkPostId);

		if (!post) {
			throw new HttpException('Original Post not found', HttpStatus.NOT_FOUND);
		}

		let repost = this.repostRepository.create(payload);

		try {
			repost = await this.repostRepository.save(repost);
		} catch (error) {
			throw new HttpException('Post creation failed', HttpStatus.SERVICE_UNAVAILABLE);
		}

		return repost;
	}

}

export default RepostService;