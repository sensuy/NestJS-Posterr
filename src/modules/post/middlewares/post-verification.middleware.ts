import { HttpException, HttpStatus, Inject, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import DateFormatService from 'shared/utils/date-format.service';
import IPostRepository from '../repositories/IPostRepository';

@Injectable()
export class PostVerificationMiddleware implements NestMiddleware {
	constructor(
		@Inject('IPostRepository') private postRepository: IPostRepository,
		private dateFormatService: DateFormatService
	) { }

	async use(req: Request, res: Response, next: NextFunction) {
		const {userid} = req.body;
		const [initDate, finalDate] = this.dateFormatService.datesToFilterTimestampByDate(new Date());

		const count = await this.postRepository.countUserPostByDate(userid, initDate, finalDate);

		if (count >= 5) {
			throw new HttpException('You have reached the limit of posts per day', HttpStatus.FORBIDDEN);
		}
		next();
	}
}
