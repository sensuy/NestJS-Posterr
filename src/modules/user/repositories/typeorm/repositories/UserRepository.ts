import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InsertResult, Repository, UpdateResult } from 'typeorm';
import IUserRepository from '../../IUserRepository';
import User from '../entities/User';
import ISeedUsersDTO from 'modules/user/dtos/ISeedUsersDTO';

@Injectable()
class UserRepository implements IUserRepository {

	constructor(
		@InjectRepository(User)
		private userRepository: Repository<User>
	) { }

	public seed(data: ISeedUsersDTO[]): Promise<InsertResult> {
		const users = this.userRepository.create(data);
		return this.userRepository.insert(users);
	}

	public listByName(userName: string): Promise<User | null> {
		return this.userRepository.findOne({where: {userName}});
	}
	
	public listById(userid: string): Promise<User | null> {
		return this.userRepository.findOne({where: {userid}});
	}

	public incrementInteractions(userid: string): Promise<UpdateResult> {
		return this.userRepository.increment({userid}, 'interactions', 1);
	}
}

export default UserRepository;