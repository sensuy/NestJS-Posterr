import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostModule } from 'modules/post/post.module';
import { UserModule } from './modules/user/user.module';
import { UtilsModule } from 'shared/utils/utils.module';
import { TypeOrmConfig } from 'configs/typeorm';

@Module({
	imports: [
		ConfigModule.forRoot({ isGlobal: true }),
		TypeOrmModule.forRootAsync({ useClass: TypeOrmConfig }),
		UserModule,
		PostModule,
		UtilsModule
	],
	controllers: [],
	providers: [],
})
export class AppModule {}
