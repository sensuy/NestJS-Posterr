import { ApiProperty } from "@nestjs/swagger";

export class IPagination {
	@ApiProperty({
		description: 'The limit of results per page',
		type: 'number',
		example: 10
	})
	limit: number;
	@ApiProperty({
		description: 'The pages number',
		type: 'number',
		example: 1
	})
	page: number;
}

export class IPaginationByDate extends IPagination {
	@ApiProperty({
		description: 'The start date of the results',
		type: 'string',
		required: false,
		example: '2022-08-08'
	})
	startDate: Date;
	@ApiProperty({
		description: 'The maximum date of the results',
		type: 'string',
		required: false,
		example: '2022-08-13'
	})
	endDate: Date;
}