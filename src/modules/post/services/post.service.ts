import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import ICreatePostDTO from 'modules/post/dtos/ICreatePostDTO';
import IPostRepository from "../repositories/IPostRepository";
import IUserRepository from "modules/user/repositories/IUserRepository";
import DateFormatService from "shared/utils/date-format.service";
import Post from "../repositories/typeorm/entities/Post";
import ICreateRepostDTO from "../dtos/ICreateRepostDTO";


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

		const count = await this.postRepository.countUserPostByDate(payload.fkUserId, initDate, finalDate);

		if (count >= 5) {
			throw new HttpException('You have reached the limit of posts per day', HttpStatus.FORBIDDEN);
		}

		let post = this.postRepository.create(payload);
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

	async repost(payload: ICreateRepostDTO): Promise<Post> {
		const user = await this.userRepository.listById(payload.userid);
		if (!user) {
			throw new HttpException('User does not exist.', HttpStatus.NOT_FOUND);
		}


		const result = await this.postRepository.verifyPostId(payload.postid);
		console.log({ result });

		const post = await this.postRepository.listById(payload.postid);

		if (post.fkUserId === payload.userid) {
			throw new HttpException('You cannot repost your own post', HttpStatus.FORBIDDEN);
		}
			

		if (!post) {
			throw new HttpException('Post does not exist.', HttpStatus.NOT_FOUND);
		}

		const [initDate, finalDate] = this.dateFormatService.datesToFilterTimestampByDate(new Date());

		const count = await this.postRepository.countUserPostByDate(payload.userid, initDate, finalDate);

		if (count >= 5) {
			throw new HttpException('You have reached the limit of posts per day', HttpStatus.FORBIDDEN);
		}

		const repostPayload: ICreatePostDTO = {
			fkUserId: payload.userid,
			content: ''
		};

		let repost = this.postRepository.create(repostPayload);
		repost.reposts = [post];

		try {
			[repost,] = await Promise.all([
				this.postRepository.save(repost),
				this.userRepository.incrementInteractions(payload.userid)
			]);
		} catch (error) {
			throw new HttpException('Post creation failed', HttpStatus.SERVICE_UNAVAILABLE);
		}

		return result;

	}


}

export default PostService;