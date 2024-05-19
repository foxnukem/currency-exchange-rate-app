import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { forkJoin, map, Observable, tap } from 'rxjs';
import process from 'process';

import { SendEmailService } from './send-email.service';
import { CurrencyFetchService } from '../../currency/service/currency-fetch.service';
import { CurrencyRate } from '../../currency/model/currency-rate';
import { EmailListManagementService } from '../../email-management/service/email-list-management.service';
import { Email } from '../../email-management/entity/email.entity';

@Injectable()
export class ScheduledEmailSendingService {

    private readonly logger: Logger = new Logger(SendEmailService.name);

    constructor(
        private readonly currencyService: CurrencyFetchService,
        private readonly emailListManagementService: EmailListManagementService,
        private readonly sendEmailService: SendEmailService,
    ) {}

    @Cron(CronExpression.EVERY_DAY_AT_9AM)
    public sendEmailAboutCurrency(): Observable<void> {
        return forkJoin({ currency: this.currencyService.getCurrencyRate(), emailRecipients: this.emailListManagementService.findAll() })
            .pipe(tap((data: { currency: CurrencyRate, emailRecipients: Email[]} ) => {
                data.emailRecipients.forEach(
                    email => {
                        this.sendEmailService.sendEmail(email.email, this.messageTopicForDailyCurrencyEmail(), this.messageBodyForDailyCurrencyEmail(data.currency))
                            .subscribe(() => {
                                this.logger.log(`Sent email to the ${email.email}`)
                            })
                    }
                )}))
            .pipe(map(() => {}));
    }

    private messageTopicForDailyCurrencyEmail(): string {
        return `Currency rate for ${process.env.CURRENCY_FROM_TO} on ${new Date().toISOString().slice(0, 10)}`;
    }

    private messageBodyForDailyCurrencyEmail(currency: CurrencyRate): string {
        return `Today's currency rate for ${currency.base}-${currency.currency} is ${currency.amount}`;
    }
}
