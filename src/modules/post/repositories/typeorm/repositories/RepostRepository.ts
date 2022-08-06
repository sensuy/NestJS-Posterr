
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import IRepostRepository from '../../IRepostRepository';
import Repost from '../entities/Repost';
import ICreateRepostDTO from 'modules/post/dtos/ICreateRepostDTO';

@Injectable()
class RepostRepository implements IRepostRepository {
	
	constructor(
		@InjectRepository(Repost)
		private repostRepository: Repository<Repost>
	) { }

	public save(post: Repost): Promise<Repost> {
		return this.repostRepository.save(post);
	}
}

export default RepostRepository;