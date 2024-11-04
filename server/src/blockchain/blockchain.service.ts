import { Injectable } from '@nestjs/common';
import { EthExchangeRateDto } from './dto/eth-exchange-rate.dto';
import { Observable, map } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';

const COINGECKO_URL = 'https://api.coingecko.com/api/v3/';

@Injectable()
export class BlockchainService {
    constructor(private readonly httpService: HttpService) {}

    getExchangeRate(
        currency: string,
        vsCurrency: string,
    ): Observable<AxiosResponse<EthExchangeRateDto>> {
        return this.httpService
            .get(`${COINGECKO_URL}simple/price?ids=${currency}&vs_currencies=${vsCurrency}`, {
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    'x-cg-demo-api-key': process.env.COINGECKO_API_KEY,
                },
            })
            .pipe(map((response: AxiosResponse) => response.data));
    }
}
