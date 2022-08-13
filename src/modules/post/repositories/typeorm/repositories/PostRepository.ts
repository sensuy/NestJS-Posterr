import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, MoreThan, QueryBuilder, Repository } from 'typeorm';
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
		return this.postRepository.findOneBy({ postid });
	}

	listLatestPosts(limit: number, offset: number): Promise<Post[]> {
		return this.postRepository.find({
			take: limit,
			skip: offset,
			order: { createdAt: 'DESC' },
			relations: {
				reposts: true,
				quotes: true,
			},
		});
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