import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import ISeedUsersDTO from "../dtos/ISeedUsersDTO";
import IUserRepository from "../repositories/IUserRepository";
import { InsertResult } from "typeorm";


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

}

export default UserService;