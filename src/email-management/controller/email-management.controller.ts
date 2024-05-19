import { Controller, HttpStatus, Post, RawBodyRequest, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { map, of, switchMap } from 'rxjs';

import { EmailListManagementService } from '../service/email-list-management.service';
import { EmailDto } from '../../shared/model/email-dto';

@Controller()
export class EmailManagementController {

    constructor(
        private readonly emailListManagementService: EmailListManagementService,
    ) {}

    @Post('subscribe')
    public subscribeNewEmail(@Req() request: RawBodyRequest<Request>, @Res() response: Response): void {
        of(request.body)
            .pipe(map((data: EmailDto) => data.email))
            .pipe(switchMap(email => this.emailListManagementService.addEmail(email)))
            .subscribe(alreadyExists => response.status(alreadyExists ? HttpStatus.CONFLICT : HttpStatus.OK).send());
    }
}
