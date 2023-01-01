import { HttpException, HttpStatus, Inject, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import IUserRepository from 'modules/user/repositories/IUserRepository';
import { UserIdSchema } from 'shared/schemas/users.schema';

@Injectable()
export class UserVerificationMiddleware implements NestMiddleware {
  constructor(
    @Inject('IUserRepository') private userRepository: IUserRepository
  ) { }
  async use(req: Request, res: Response, next: NextFunction) {
    const { userid } = req.body;
    const { error } = UserIdSchema.validate(userid);
    
    if (error) {
      throw new HttpException(error.details[0].message, HttpStatus.BAD_REQUEST);
    }
    const user = await this.userRepository.listById(userid);
    if (!user) {
      throw new HttpException('User does not exist.', HttpStatus.NOT_FOUND);
    }
    next();
  }
}