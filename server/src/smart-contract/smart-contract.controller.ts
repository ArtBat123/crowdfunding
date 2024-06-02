import { Controller, Get } from '@nestjs/common';
import { SmartContractService } from './smart-contract.service';

@Controller('smart-contract')
export class SmartContractController {
    constructor(private smartContractService: SmartContractService) {}

    @Get('address')
    getAddress() {
        return this.smartContractService.getAddress();
    }
}
