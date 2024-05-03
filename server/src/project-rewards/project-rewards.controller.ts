import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ProjectRewardsService } from './project-rewards.service';
import { CreateProjectRewardDto } from './dto/create-project-reward.dto';

@Controller('project-rewards')
export class ProjectRewardsController {
    constructor(private projectRewardsService: ProjectRewardsService) {}

    @Get()
    getRewardsByProjectId(@Query('projectId') projectId: number) {
        return this.projectRewardsService.getRewardsByProjectId(projectId);
    }

    @Post()
    create(@Body() dto: CreateProjectRewardDto) {
        return this.projectRewardsService.create(dto);
    }
}
