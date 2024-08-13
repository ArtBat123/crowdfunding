import { Body, Controller, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('project')
export class ProjectController {
    constructor(private projectService: ProjectService) {}

    @UseGuards(AuthGuard)
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

    @UseGuards(AuthGuard)
    @Put()
    updateStory(@Body() dto) {
        return this.projectService.updateStory(dto);
    }

    @UseGuards(AuthGuard)
    @Put('creator-eth-address')
    updateCreatorEthAddress(@Body() dto) {
        return this.projectService.updateCreatorEthAddress(dto);
    }
}
