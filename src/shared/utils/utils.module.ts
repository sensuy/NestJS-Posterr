import { Global, Module } from '@nestjs/common';
import DateFormatService from './date-format.service';

@Global()
@Module({
	imports: [],
	providers:[DateFormatService],
	exports: [DateFormatService]
})
export class UtilsModule {}
