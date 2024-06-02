import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';

@Controller('project')
export class ProjectController {
    constructor(private projectService: ProjectService) {}

    @Post()
    create(@Body() dto: CreateProjectDto) {
        return this.projectService.create(dto);
    }

    @Get(':id')
    get(@Param('id') id: number) {
        return this.projectService.get(id);
    }

    @Get('user/:userId')
    getByUserId(@Param('userId') userId: number) {
        return this.projectService.getByUserId(userId);
    }

    @Get()
    getWithFilters(@Query() query) {
        return this.projectService.getWithFilters(query);
    }

    @Put()
    updateStory(@Body() dto) {
        return this.projectService.updateStory(dto);
    }

    @Put('creator-eth-address')
    updateCreatorEthAddress(@Body() dto) {
        return this.projectService.updateCreatorEthAddress(dto);
    }
}
