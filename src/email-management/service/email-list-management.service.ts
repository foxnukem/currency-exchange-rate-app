import { Inject, Injectable, Logger } from '@nestjs/common';
import { Repository } from 'typeorm';
import { catchError, from, Observable, of, tap } from 'rxjs';

import { Email } from '../entity/email.entity';

@Injectable()
export class EmailListManagementService {

    private readonly logger: Logger = new Logger(EmailListManagementService.name);

    constructor(
        @Inject('EMAIL_REPOSITORY') private emailRepository: Repository<Email>,
    ) {}

    public addEmail(newEmail: string): Observable<boolean> {
        return from(this.emailRepository.exists( { where: { email: newEmail } }))
            .pipe(tap(exists => {
                if (!exists) {
                    const subscriber = new Email();
                    subscriber.email = newEmail;
                    this.emailRepository.save(subscriber)
                        .then(savedSubscriber => {
                            this.logger.log(`Added new subscriber (id=${savedSubscriber.id}, email=${savedSubscriber.email})`);
                        })
                    return of(false);
                }
            }))
            .pipe(catchError(error => {
                this.logger.error(error);
                throw error;
            }));
    }

    public findAll(): Observable<Array<Email>> {
        return from(this.emailRepository.find());
    }
}
