import { ApiProperty } from "@nestjs/swagger";

class ISeedUsersDTO {
	@ApiProperty({
		description: 'Name of user',
		type: 'string',
		maxLength: 14,
		example: 'Reviewer'
	})
	userName: string;
	@ApiProperty({
		description: 'The sum of the user\'s posts, reposts and quotes',
		type: 'number',
		example: 0
	})
	interactions: number;
}

export default ISeedUsersDTO;