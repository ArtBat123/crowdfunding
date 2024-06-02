import { Controller, Get, Param, Query } from '@nestjs/common';
import { BlockchainService } from './blockchain.service';

@Controller('blockchain')
export class BlockchainController {
    constructor(private projectService: BlockchainService) {}

    @Get('coins/price/:currency')
    getExchangeRate(
        @Param('currency') currency,
        @Query('refundable-currency') refundableCurrency,
    ) {
        return this.projectService.getExchangeRate(
            currency,
            refundableCurrency,
        );
    }
}
