import { ApiProperty } from "@nestjs/swagger";


export class IUserId {
	@ApiProperty({
		name: 'userid',
		description: 'Id of the user',
		required: false,
		type: 'uuid',
		example: 'b3dac166-4006-455f-a9c3-9e2a69568b6d'
	})
	userid: string;
}