import { Body, Controller, Get, Param, Post, Query, UsePipes } from "@nestjs/common";
import { ApiBadRequestResponse, ApiBody, ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiServiceUnavailableResponse, ApiTags } from "@nestjs/swagger";
import { JoiValidationPipe } from "shared/utils/JoiValidationPipe";
import ISeedUsersDTO from 'modules/user/dtos/ISeedUsersDTO';
import UserService from "../services/user.service";
import { FindUserSchema, SeedUserSchema, userSchemaResponse } from "../schemas/user.schema";
import User from "../repositories/typeorm/entities/User";

@ApiTags('User')
@Controller('user')
class UserController {

	constructor(private userService: UserService) { }

	@Post()
	@ApiOperation({
		summary: 'Seed the table user',
		description: 'Insert as many register do you want to test this api'
	})
	@ApiBody({ type: [ISeedUsersDTO] })
	@ApiCreatedResponse({
		description: 'Users sucessfully created.',
		schema: userSchemaResponse
	})
	@ApiBadRequestResponse({ description: 'Validation failed.' })
	@ApiServiceUnavailableResponse({ description: 'User creation failed.' })
	@UsePipes(new JoiValidationPipe(SeedUserSchema))
	async seedUsers(@Body() payload: ISeedUsersDTO[]): Promise<Object[]> {
		const users = await this.userService.seedUsersTable(payload);
		return users;
	}

	@Get(':name')
	@ApiOperation({summary: 'List user by Name'})
	@ApiParam({ 
		name: 'name', 
		description: 'Name of the user', 
		required: true, 
		type: 'string',
		example: 'Reviewer' 
	})
	@ApiOkResponse({ description: 'User sucessfully found.', type: [User] })
	@ApiBadRequestResponse({ description: 'Name invalid' })
	@ApiNotFoundResponse({ description: 'User not found.' })
	@UsePipes(new JoiValidationPipe(FindUserSchema))
	async listByName(@Param('name') name: string): Promise<User> {
		const users = await this.userService.findUser(name);
		return users;
	}
}

export default UserController
