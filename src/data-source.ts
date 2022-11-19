import 'dotenv/config'
import 'reflect-metadata'
import { DataSource } from 'typeorm'

const port = process.env.DB_PORT as number | undefined

export const AppDataSource = new DataSource({
	type: 'postgres',
	host: 'localhost',
	port: 5433,
	username: 'postgres',
	password: 'docker',
	database: 'postgres',
	entities: [`${__dirname}/**/entities/*.{ts,js}`],
	migrations: [`${__dirname}/**/migrations/*.{ts,js}`],
})
