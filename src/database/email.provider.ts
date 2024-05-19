import { DataSource } from 'typeorm';

import { Email } from '../email-management/entity/email.entity';

export const emailProviders = [
    {
        provide: 'EMAIL_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(Email),
        inject: ['DATA_SOURCE'],
    },
];
