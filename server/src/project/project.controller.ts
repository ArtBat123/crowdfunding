import { Body, Controller, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ProjectService } from './project.service';
import { SaveProjectDto } from './dto/create-project.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { User } from 'src/common/decorators/user.decorator';
import { UserJWTPayload } from 'src/auth/types';

@Controller('project')
export class ProjectController {
    constructor(private projectService: ProjectService) {}

    @UseGuards(AuthGuard)
    @Post()
    create(@Body() dto: SaveProjectDto, @User() user: UserJWTPayload) {
        return this.projectService.create(dto, user);
    }

    @UseGuards(AuthGuard)
    @Put()
    update(@Body() dto: SaveProjectDto, @User() user: UserJWTPayload) {
        return this.projectService.update(dto, user);
    }

    @UseGuards(AuthGuard)
    @Get('next-id')
    getNextId() {
        return this.projectService.getNextId();
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
