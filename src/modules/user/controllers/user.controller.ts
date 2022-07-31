import { Body, Controller, Post, UsePipes } from "@nestjs/common";
import { ApiBadRequestResponse, ApiBody, ApiCreatedResponse, ApiOperation, ApiServiceUnavailableResponse, ApiTags } from "@nestjs/swagger";
import ICreatePostDTO from 'modules/post/dtos/ICreatePostDTO';

import { JoiValidationPipe } from "shared/utils/JoiValidationPipe";
import ISeedUsersDTO from 'modules/user/dtos/ISeedUsersDTO';
import User from "../repositories/typeorm/entities/User";
import UserService from "../services/user.service";
import { SeedUserSchema, userSchemaResponse } from "../schemas/user.schema";

@ApiTags('User')
@Controller('user')
class UserController {

	constructor(private userService: UserService) { }

	@Post()
	@ApiOperation({ summary: 'Seed the table user' })
	@ApiBody({ type: [ISeedUsersDTO] })
	@ApiCreatedResponse({ description: 'Users sucessfully created.', schema: userSchemaResponse })
	@ApiBadRequestResponse({ description: 'Validation failed.' })
	@ApiServiceUnavailableResponse({ description: 'User creation failed.' })
	@UsePipes(new JoiValidationPipe(SeedUserSchema))
	async seedUsers(@Body() payload: ISeedUsersDTO[]): Promise<Object[]> {
		const users = await this.userService.seedUsersTable(payload);
		return users;
	}
}

export default UserController
