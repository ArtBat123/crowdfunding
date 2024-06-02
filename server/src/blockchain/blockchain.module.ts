import { Module } from '@nestjs/common';
import { BlockchainService } from './blockchain.service';
import { BlockchainController } from './blockchain.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
    providers: [BlockchainService],
    controllers: [BlockchainController],
    imports: [HttpModule],
})
export class BlockchainModule {}
