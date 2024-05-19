import { Injectable, Logger } from '@nestjs/common';
import { ISendMailOptions, MailerService } from '@nestjs-modules/mailer';
import { catchError, from, map, Observable, of, tap } from 'rxjs';
import process from 'process';

@Injectable()
export class SendEmailService {

    private readonly logger: Logger = new Logger(SendEmailService.name);

    constructor(
        private readonly mailService: MailerService,
    ) {}

    public sendEmail(recipientsEmail: string, messageTopic: string, messageBody: string): Observable<void> {
        return of(recipientsEmail)
            .pipe(tap(email => from(this.mailService.sendMail(this.configForSendingEmails(email, messageTopic, messageBody)))))
            .pipe(map(() => {}))
            .pipe(catchError(error => {
                this.logger.error(error);
                throw error;
            }));
    }

    private configForSendingEmails(email: string, messageTopic: string, messageBody: string): ISendMailOptions {
        return {
            to: email,
            from: process.env.SEND_EMAIL_FROM,
            sender: process.env.SEND_EMAIL_FROM,
            subject: messageTopic,
            text: messageBody,
            date: new Date()
        };
    }
}
