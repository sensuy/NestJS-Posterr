import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import IPostRepository from "../repositories/IPostRepository";
import ICreateQuotetDTO from "../dtos/ICreateQuotetDTO";
import Quote from "../repositories/typeorm/entities/Quote";
import IQuoteRepository from "../repositories/IQuoteRepository";
import IUserRepository from "modules/user/repositories/IUserRepository";


@Injectable()
class QuoteService {

	constructor(
	) { }


}

export default QuoteService;