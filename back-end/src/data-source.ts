import 'dotenv/config'
import 'reflect-metadata'
import { DataSource } from 'typeorm'

const port = process.env.DB_PORT as number | undefined

export const AppDataSource = new DataSource({
type: 'postgres',
host: process.env.PGHOST || 'localhost',
port: Number(process.env.PGPORT) || 5432,
username: process.env.PGUSER || 'postgres',
password: process.env.PGPASSWORD || 'docker',
database: process.env.PGDATABASE || 'postgres',
entities: [`${__dirname}/**/entities/*.{ts,js}`],
migrations: [`${__dirname}/**/migrations/*.{ts,js}`],
})