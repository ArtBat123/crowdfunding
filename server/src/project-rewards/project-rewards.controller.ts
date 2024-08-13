import { Body, Controller, Delete, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { ProjectRewardsService } from './project-rewards.service';
import { CreateProjectRewardDto } from './dto/create-project-reward.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('project-rewards')
export class ProjectRewardsController {
    constructor(private projectRewardsService: ProjectRewardsService) {}

    @Get()
    getRewardsByProjectId(@Query('projectId') projectId: number) {
        return this.projectRewardsService.getRewardsByProjectId(projectId);
    }

    @UseGuards(AuthGuard)
    @Post()
    create(@Body() dto: CreateProjectRewardDto) {
        return this.projectRewardsService.create(dto);
    }

    @UseGuards(AuthGuard)
    @Delete('/:id')
    delete(@Param('id') id: number) {
        return this.projectRewardsService.delete(id);
    }
}
