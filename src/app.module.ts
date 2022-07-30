import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmConfigService } from './configs/typeorm.service';
import { PostModule } from './modules/post/post.module';
import { DataSource } from 'typeorm';

@Module({
	imports: [
		ConfigModule.forRoot({ isGlobal: true }),
		TypeOrmModule.forRootAsync({ useClass: TypeOrmConfigService }),
		PostModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
