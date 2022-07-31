import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import ISeedUsersDTO from "../dtos/ISeedUsersDTO";
import IUserRepository from "../repositories/IUserRepository";
import { InsertResult } from "typeorm";
import User from "../repositories/typeorm/entities/User";


@Injectable()
class UserService {

	constructor(
		@Inject('IUserRepository') private userRepository: IUserRepository
	) { }


	async seedUsersTable(payload: ISeedUsersDTO[]): Promise<Object[]> {
		let usersCreated: InsertResult;
		try {
			usersCreated = await this.userRepository.seed(payload);
		} catch (error) {
			throw new HttpException('User creation failed.', HttpStatus.SERVICE_UNAVAILABLE);
		}

		const { raw } = usersCreated;
		return raw;
	}

	async findUser(name: string): Promise<User> {
		let user: User;
		try {
			user = await this.userRepository.listByName(name);
		} catch (error) {
			throw new HttpException('User creation failed.', HttpStatus.SERVICE_UNAVAILABLE);
		}

		if (!user) {
			throw new HttpException('User not found.', HttpStatus.NOT_FOUND);
		}

		const [,month, day, year] = new Date(user.createdAt).toDateString().split(' ');
		console.log(`${user.userName} was created on ${month} ${day}, ${year}.`);
		console.log(new Date(user.createdAt).toDateString());
		Object.assign(user, { createdAt: `${month} ${day}, ${year}` });

		return user;
	}

}

export default UserService;