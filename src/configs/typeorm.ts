import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm';

@Injectable()
export class TypeOrmConfig implements TypeOrmOptionsFactory {
	constructor(private config: ConfigService) {}

	public createTypeOrmOptions(): TypeOrmModuleOptions {
		return {
			type: 'postgres',
			host: this.config.get<string>('DATABASE_HOST'),
			port: this.config.get<number>('DATABASE_PORT'),
			database: this.config.get<string>('DATABASE_NAME'),
			username: this.config.get<string>('DATABASE_USER'),
			password: this.config.get<string>('DATABASE_PASSWORD'),
			entities: ['dist/src/modules/**/repositories/typeorm/entities/*{.ts,.js}'],
			migrations: ['dist/src/shared/migrations/*{.ts,.js}'],
			logging: ['error'],
			synchronize: false
		};
	}
}
