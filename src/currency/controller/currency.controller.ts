import { Controller, Get } from '@nestjs/common';
import { Observable } from 'rxjs';

import { CurrencyFetchService } from '../service/currency-fetch.service';
import { CurrencyRate } from '../model/currency-rate';

@Controller()
export class CurrencyController {

    constructor(
        private readonly currencyFetchService: CurrencyFetchService,
    ) {}

    @Get('rate')
    public getCurrency(): Observable<CurrencyRate> {
        return this.currencyFetchService.getCurrencyRate();
    }
}
