import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import IPostRepository from "../repositories/IPostRepository";
import IRepostRepository from "../repositories/IRepostRepository";
import ICreateRepostDTO from "../dtos/ICreateRepostDTO";
import Repost from "../repositories/typeorm/entities/Repost";
import IUserRepository from "modules/user/repositories/IUserRepository";

@Injectable()
class RepostService {

	constructor(
		@Inject('IRepostRepository') private repostRepository: IRepostRepository,
		@Inject('IPostRepository') private postRepository: IPostRepository,
		@Inject('IUserRepository') private userRepository: IUserRepository
	) { }


	async createRepost(payload: ICreateRepostDTO) {

		const post = await this.postRepository.listById(payload.postid);

		console.log(post);
		

		console.log({ payload });

	}

}

export default RepostService;