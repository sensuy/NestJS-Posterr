import { ApiProperty } from "@nestjs/swagger";

class ICreateRepostDTO {
	@ApiProperty({
		description: 'Id of the post',
		type: 'uuid',
		example: 'f0a0a0a0-a0a0-0a0a-0a0a-0a0a0a0a0a0a'
	})
	postFk: string;
	@ApiProperty({
		description: 'Id of the repost',
		type: 'uuid',
		example: 'f0a0a0a0-a0a0-0a0a-0a0a-0a0a0a0a0a0a'
	})
	repostFk: string;
}

export default ICreateRepostDTO;