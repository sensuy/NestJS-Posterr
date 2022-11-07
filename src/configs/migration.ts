import { DataSource } from "typeorm";
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';

config();

const configService = new ConfigService();

export const migrationConfig = new DataSource({
	migrationsTableName: 'migrations',
	type: 'postgres',
	host: configService.get<string>('DATABASE_HOST'),
	port: configService.get<number>('DATABASE_PORT'),
	username: configService.get<string>('DATABASE_USER'),
	password: configService.get<string>('DATABASE_PASSWORD'),
	database: configService.get<string>('DATABASE_NAME'),
	logging: false,
	synchronize: false,
	name: 'default',
	entities: ['src/modules/**/repositories/typeorm/entities/*.ts'],
	migrations: ['src/shared/migrations/*.ts']
});