import { ApiProperty } from "@nestjs/swagger";

class IPagination {
	@ApiProperty({
		description: 'The page limit of the pagination',
		type: 'number',
		example: 10
	})
	limit: number;
	@ApiProperty({
		description: 'The page offset of the pagination',
		type: 'number',
		example: 0
	})
	offset: number;
}

export default IPagination;