import { ApiProperty } from "@nestjs/swagger";

class ICreatePostDTO {
	@ApiProperty({
		description: 'Id of the user',
		type: 'uuid',
		example: 'f0a0a0a0-a0a0-0a0a-0a0a-0a0a0a0a0a0a'
	})
	fkIdUser: string;
	@ApiProperty({
		description: 'Content of the post',
		type: 'string',
		example: "It's a beautiful day!"
	})
	content: string;
}

export default ICreatePostDTO;