import { ApiProperty } from "@nestjs/swagger";

class ICreateRepostDTO {
	@ApiProperty({
		description: 'The post that will be reposted',
		type: 'uuid',
		example: 'f0a0a0a0-a0a0-0a0a-0a0a-0a0a0a0a0a0a'
	})
	postid: string;
	@ApiProperty({
		description: 'The user that will do repost',
		type: 'uuid',
		example: 'f0a0a0a0-a0a0-0a0a-0a0a-0a0a0a0a0a0a'
	})
	userid: string;
}

export default ICreateRepostDTO;