import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, MoreThan, QueryBuilder, Repository, SelectQueryBuilder } from 'typeorm';
import ICreatePostDTO from 'modules/post/dtos/ICreatePostDTO';
import IPostRepository from '../../IPostRepository';
import Post from '../entities/Post';
import { IPaginationByDate } from 'shared/interfaces/IPagination';

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
		return this.postRepository.findOneBy({ postid });
	}


	listLatestPosts(queryParams: IPaginationByDate): Promise<Post[]> {
		console.log({ queryParams });

		const { limit, page, startDate, endDate } = queryParams;
		let query = this.postRepository.createQueryBuilder('post')
			.leftJoinAndSelect('post.reposts', 'repost')
			.leftJoinAndSelect('post.quotes', 'quote')
			.offset((page - 1) * limit)
			.limit(limit)
			.addOrderBy('post.created_at', 'DESC')
		if (startDate) {
			query.andWhere('post.created_at >= :startDate', { startDate });
		}
		if (endDate) {
			query.andWhere('post.created_at <= :endDate', { endDate });
		}
		return query.getMany();
	}

	listPostsByUserId(userid: string, queryParams: IPaginationByDate): Promise<Post[]> {
		const { limit, page, startDate, endDate } = queryParams;
		let query = this.postRepository.createQueryBuilder('post')
			.leftJoinAndSelect('post.reposts', 'repost')
			.leftJoinAndSelect('post.quotes', 'quote')
			.skip((page - 1) * limit)
			.take(limit)
			.where('post.fk_userid = :userid', { userid })
			.addOrderBy('post.createdAt', 'DESC')
		if (startDate) {
			query.andWhere('post.created_at >= :startDate', { startDate });
		}
		if (endDate) {
			query.andWhere('post.created_at <= :endDate', { endDate });
		}
		return query.getMany();
	}

	countUserPostByDate(fkUserId: string, init: Date, final: Date): Promise<number> {
		return this.postRepository
			.createQueryBuilder()
			.where('fk_userid = :fkUserId', { fkUserId })
			.andWhere('created_at BETWEEN :init AND :final', { init, final })
			.getCount();
	}

	verifyRepostById(postid: string): Promise<Post> {
		return this.postRepository.findOne({
			where: { postid },
			relations: {
				reposts: true
			}
		});
	}

	verifyQuoteById(postid: string): Promise<Post> {
		return this.postRepository.findOne({
			where: { postid },
			relations: {
				quotes: true
			}
		});
	}
}

export default PostRepository;