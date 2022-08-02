import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import ICreatePostDTO from 'modules/post/dtos/ICreatePostDTO';
import Post from "../repositories/typeorm/entities/Post";
import IPostRepository from "../repositories/IPostRepository";
import IUserRepository from "modules/user/repositories/IUserRepository";
import DateFormatService from "shared/utils/date-format.service";


@Injectable()
class PostService {

	constructor(
		@Inject('IPostRepository') private postRepository: IPostRepository,
		@Inject('IUserRepository') private userRepository: IUserRepository,
		private dateFormatService: DateFormatService
	) { }

	async createPost(payload: ICreatePostDTO): Promise<Post> {

		const user = await this.userRepository.listById(payload.fkUserId);
		if (!user) {
			throw new HttpException('User does not exist.', HttpStatus.NOT_FOUND);
		}

		const [initDate, finalDate] = this.dateFormatService.datesToFilterTimestampByDate(new Date());

		let post = this.postRepository.create(payload);
		const count = await this.postRepository.countUserPostByDate(payload.fkUserId, initDate, finalDate);

		if (count >= 5) {
			throw new HttpException('You have reached the limit of posts per day', HttpStatus.FORBIDDEN);
		}

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