import { ApiProperty } from "@nestjs/swagger";

class ISeedUsersDTO {
	@ApiProperty({
		description: 'Name of user',
		type: 'string',
		maxLength: 14,
		example: 'Reviewer'
	})
	userName: string;
}

export default ISeedUsersDTO;