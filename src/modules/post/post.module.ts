import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import Post from './repositories/typeorm/entities/Post';

@Module({
	imports: [TypeOrmModule.forFeature([Post])],
	exports: [],
})
export class PostModule {}
