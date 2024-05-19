import { DataSource } from 'typeorm';
import * as process from 'process';

export const databaseProviders = [
    {
        provide: 'DATA_SOURCE',
        useFactory: async () => {
            const dataSource = new DataSource({
                type: 'postgres',
                host: process.env.POSTGRES_HOST,
                port: parseInt(process.env.POSTGRES_LOCAL_PORT as string),
                username: process.env.POSTGRES_USER,
                password: process.env.POSTGRES_PASSWORD,
                database: process.env.POSTGRES_DATABASE,
                migrations: ['dist/database/migration/*.ts'],
                migrationsRun: true,
                logging: true,
                entities: [
                    __dirname + '/../**/*.entity{.ts,.js}',
                ],
            });

            return dataSource.initialize();
        },
    },
];
