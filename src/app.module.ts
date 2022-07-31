import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from 'configs/typeorm.service';
import { PostModule } from 'modules/post/post.module';
import { UtilsModule } from 'shared/utils/utils.module';

@Module({
	imports: [
		ConfigModule.forRoot({ isGlobal: true }),
		TypeOrmModule.forRootAsync({ useClass: TypeOrmConfigService }),
		PostModule,
		UtilsModule
	],
	controllers: [],
	providers: [],
})
export class AppModule {}
