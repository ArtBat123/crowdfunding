import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BridgeModule } from './bridge/bridge.module';

@Module({
    imports: [ConfigModule.forRoot({ envFilePath: '.env' }), BridgeModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
