import { DataSource } from "typeorm";

export const connectionSource = new DataSource({
	migrationsTableName: 'migrations',
	type: 'postgres',
	host: process.env.DATABASE_HOST,
	port: parseInt(process.env.DATABASE_PORT),
	username: 'postgres',
	password: 'postgres',
	database: process.env.DATABASE_NAME,
	logging: false,
	synchronize: false,
	name: 'default',
	entities: ['src/modules/**/repositories/typeorm/entities/*.ts'],
	migrations: ['src/shared/migrations/*.ts']
});