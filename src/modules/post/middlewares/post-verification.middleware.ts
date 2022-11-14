import { HttpException, HttpStatus, Inject, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { UserIdSchema } from 'shared/schemas/users.schema';
import DateFormatService from 'shared/utils/date-format.service';
import IPostRepository from '../repositories/IPostRepository';

@Injectable()
export class PostVerificationMiddleware implements NestMiddleware {
	constructor(
		@Inject('IPostRepository') private postRepository: IPostRepository,
		private dateFormatService: DateFormatService
	) { }

	async use(req: Request, res: Response, next: NextFunction) {
		const { userid } = req.body;
    const { error } = UserIdSchema.validate(userid);
    if (error) {
      throw new HttpException(error.details[0].message, HttpStatus.BAD_REQUEST);
    }
		const initDate = this.dateFormatService.timesTampZeroHour(new Date());
		const finalDate = this.dateFormatService.addDays(initDate, 1);
		
		const count = await this.postRepository.countUserPostByDate(userid, initDate, finalDate);

		if (count >= 5) {
			throw new HttpException('You have reached the limit of posts per day', HttpStatus.FORBIDDEN);
		}
		next();
	}
}
