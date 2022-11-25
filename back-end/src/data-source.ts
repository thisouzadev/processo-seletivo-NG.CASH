import 'dotenv/config'
import 'reflect-metadata'
import { DataSource } from 'typeorm'

const port = process.env.DB_PORT as number | undefined

export const AppDataSource = new DataSource({
	type: 'postgres',
	host:  process.env.DB_HOST || 'localhost',
	port: Number(process.env.DB_PORT) || 5433,
	username: process.env.DB_USER ||'postgres',
	password: process.env.DB_PASS|| 'docker',
	database: process.env.DB || 'db',
	entities: [`${__dirname}/**/entities/*.{ts,js}`],
	migrations: [`${__dirname}/**/migrations/*.{ts,js}`],
})
