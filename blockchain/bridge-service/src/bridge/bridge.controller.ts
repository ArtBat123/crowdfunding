import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { BridgeService } from './bridge.service';

@Controller('bridge')
export class BridgeController {
    constructor(private readonly bridgeService: BridgeService) {}
}
