import { ApiProperty } from "@nestjs/swagger";

class ICreateQuoteDTO {
	@ApiProperty({
		description: 'User\'s id',
		type: 'uuid',
		example: 'f0a0a0a0-a0a0-0a0a-0a0a-0a0a0a0a0a0a'
	})
	userid: string;
	@ApiProperty({
		description: 'Id of the post/Repost',
		type: 'uuid',
		example: 'f0a0a0a0-a0a0-0a0a-0a0a-0a0a0a0a0a0a'
	})
	postid: string;
	@ApiProperty({
		description: 'Content of the quote',
		type: 'string',
		example: "I love this post!"
	})
	content: string;
}

export default ICreateQuoteDTO;