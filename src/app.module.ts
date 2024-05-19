import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';
import { ScheduleModule } from '@nestjs/schedule';

import { emailProviders } from './database/email.provider';

import { SendEmailService } from './email-communication/service/send-email.service';
import { EmailListManagementService } from './email-management/service/email-list-management.service';
import { EmailManagementController } from './email-management/controller/email-management.controller';
import { CurrencyController } from './currency/controller/currency.controller';
import { CurrencyFetchService } from './currency/service/currency-fetch.service';
import { DatabaseModule } from './database/database.module';
import { ScheduledEmailSendingService } from './email-communication/service/scheduled-email-sending.service';

@Module({
  imports: [
      HttpModule,
      ConfigModule.forRoot({ isGlobal: true }),
      MailerModule.forRoot({
          transport: {
              host: process.env.SEND_EMAIL_HOST,
              port: parseInt(process.env.SEND_EMAIL_PORT as string, 10) || 2525,
              auth: {
                  user: process.env.SEND_EMAIL_AUTH_USER,
                  pass: process.env.SEND_EMAIL_AUTH_PASSWORD,
              },
          },
      }),
      DatabaseModule,
      ScheduleModule.forRoot(),
  ],
  controllers: [
      EmailManagementController,
      CurrencyController,
  ],
  providers: [
      SendEmailService,
      ...emailProviders,
      EmailListManagementService,
      CurrencyFetchService,
      ScheduledEmailSendingService,
  ],
})
export class AppModule {}
