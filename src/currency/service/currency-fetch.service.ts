import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { catchError, map, Observable } from 'rxjs';
import { AxiosRequestConfig } from 'axios';
import * as process from 'process';

import { CurrencyRate } from '../model/currency-rate';

@Injectable()
export class CurrencyFetchService {

    private readonly logger: Logger = new Logger(CurrencyFetchService.name);

    constructor(
        private readonly http: HttpService
    ) {}

    public getCurrencyRate(): Observable<CurrencyRate> {
        return this.getCurrencyRateFromCoinbase();
    }

    private getCurrencyRateFromCoinbase(): Observable<CurrencyRate> {
        const httpRequestConfig: AxiosRequestConfig = { headers: { 'Authorization': `Bearer ${process.env.COINBASE_API_KEY}`} };

        return this.http.get<{ data: CurrencyRate }>(`${process.env.COINBASE_API_URL}/${process.env.CURRENCY_FROM_TO}/${process.env.CURRENCY_RATE_ACTION}`, httpRequestConfig)
            .pipe(map(response => response.data))
            .pipe(map(data => data.data))
            .pipe(catchError(error => {
                this.logger.error(error);
                throw error;
            }));
    }
}
