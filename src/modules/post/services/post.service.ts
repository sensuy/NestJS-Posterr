import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import ICreatePostDTO from 'modules/post/dtos/ICreatePostDTO';
import IPostRepository from "../repositories/IPostRepository";
import IUserRepository from "modules/user/repositories/IUserRepository";
import Post from "../repositories/typeorm/entities/Post";
import ICreateRepostDTO from "../dtos/ICreateRepostDTO";
import ICreateQuoteDTO from "../dtos/ICreateQuoteDTO";
import { IPaginationByDate } from "shared/interfaces/IPagination";


@Injectable()
class PostService {

	constructor(
		@Inject('IPostRepository') private postRepository: IPostRepository,
		@Inject('IUserRepository') private userRepository: IUserRepository,
	) { }

	
	async listUserPosts(userid: string, qureryParams: IPaginationByDate): Promise<Post[]> {
		let posts: Post[];
		try {
			posts = await this.postRepository.listPostsByUserId(userid, qureryParams);
		} catch (error) {
			console.log(error);
			throw new HttpException('List users posts failed.', HttpStatus.SERVICE_UNAVAILABLE);
		}

		return posts;
	}

	async listLatestPosts(qureryParams: IPaginationByDate): Promise<Post[]> {
		let posts: Post[];
		try {
			posts = await this.postRepository.listLatestPosts(qureryParams);
		} catch (error) {
			console.log(error);
			
			throw new HttpException('List posts failed.', HttpStatus.SERVICE_UNAVAILABLE);
		}

		return posts;
	}

	async createPost(payload: ICreatePostDTO): Promise<Post> {
		let post = this.postRepository.create(payload);
		try {
			[post,] = await Promise.all([
				this.postRepository.save(post),
				this.userRepository.incrementInteractions(payload.userid)
			]);
		} catch (error) {
			throw new HttpException('Post creation failed', HttpStatus.SERVICE_UNAVAILABLE);
		}

		return post;
	}

	async creatRepost(payload: ICreateRepostDTO): Promise<Post> {
		const post = await this.postRepository.verifyRepostById(payload.postid);

		if (!post) {
			throw new HttpException('Post does not exist.', HttpStatus.NOT_FOUND);
		}

		if (post.reposts.length >= 1) {
			throw new HttpException('You can not repost a repost', HttpStatus.FORBIDDEN);
		}

		if (post.userid === payload.userid) {
			throw new HttpException('You cannot repost your own post', HttpStatus.FORBIDDEN);
		}

		const repostPayload: ICreatePostDTO = {
			userid: payload.userid,
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
			throw new HttpException('Repost creation failed', HttpStatus.SERVICE_UNAVAILABLE);
		}

		return repost;
	}

	async createQuote(payload: ICreateQuoteDTO): Promise<Post> {
		const post = await this.postRepository.verifyQuoteById(payload.postid);

		if (!post) {
			throw new HttpException('Post does not exist.', HttpStatus.NOT_FOUND);
		}

		if (post.quotes.length >= 1) {
			throw new HttpException('You can not quote a quote', HttpStatus.FORBIDDEN);
		}

		if (post.userid === payload.userid) {
			throw new HttpException('You cannot quote your own post', HttpStatus.FORBIDDEN);
		}

		const quotePayload: ICreatePostDTO = {
			userid: payload.userid,
			content: payload.content
		};

		let quote = this.postRepository.create(quotePayload);
		quote.quotes = [post];

		try {
			[quote,] = await Promise.all([
				this.postRepository.save(quote),
				this.userRepository.incrementInteractions(payload.userid)
			]);
		} catch (error) {
			throw new HttpException('Quote creation failed', HttpStatus.SERVICE_UNAVAILABLE);
		}
		return quote;
	}


}

export default PostService;