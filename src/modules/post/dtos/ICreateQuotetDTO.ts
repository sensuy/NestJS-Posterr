import { ApiProperty } from "@nestjs/swagger";

class ICreateQuotetDTO {
	@ApiProperty({
		description: 'Id of the user',
		type: 'uuid',
		example: 'f0a0a0a0-a0a0-0a0a-0a0a-0a0a0a0a0a0a'
	})
	fkUserId: string;
	@ApiProperty({
		description: 'Id of the post',
		type: 'uuid',
		example: 'f0a0a0a0-a0a0-0a0a-0a0a-0a0a0a0a0a0a'
	})
	fkPostId: string;
	@ApiProperty({
		description: 'Content of the quote',
		type: 'string',
		example: "I love this post!"
	})
	content: string;
}

export default ICreateQuotetDTO;