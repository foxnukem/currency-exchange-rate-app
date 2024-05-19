import { DataSourceOptions, DataSource } from 'typeorm';

import dotenv from 'dotenv';
dotenv.config()

import process from 'process';

export const dataSourceOptions: DataSourceOptions = {
    type: 'postgres',
    host: process.env.POSTGRES_HOST,
    port: parseInt(process.env.POSTGRES_LOCAL_PORT as string),
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DATABASE,
    migrations: ['dist/database/migration/*.{js,ts}'],
    synchronize: false,
    logging: true,
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    migrationsRun: true,
};

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;
