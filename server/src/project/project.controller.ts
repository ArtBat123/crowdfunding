import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';

@Controller('project')
export class ProjectController {
    constructor(private projectService: ProjectService) {}

    @Post()
    create(@Body() dto: CreateProjectDto) {
        return this.projectService.create(dto);
    }

    @Get()
    getAll() {
        return this.projectService.getAll();
    }

    @Get(':id')
    get(@Param('id') id: number) {
        return this.projectService.get(id);
    }

    @Put()
    updateStory(@Body() dto) {
        return this.projectService.updateStory(dto);
    }
}
