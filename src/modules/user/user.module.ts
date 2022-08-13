import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import UserService from './services/user.service';
import UserRepository from './repositories/typeorm/repositories/UserRepository';
import User from './repositories/typeorm/entities/User';
import UserController from './controllers/user.controller';

@Module({
	imports: [TypeOrmModule.forFeature([User])],
	controllers: [UserController],
	providers: [
		UserService,
		{
			provide: 'IUserRepository',
			useClass: UserRepository
		}
	],
	exports: [
		{
			provide: 'IUserRepository',
			useClass: UserRepository
		},
		UserService
	],
})
export class UserModule { }