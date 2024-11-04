import { Body, Controller, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ProjectService } from './project.service';
import { SaveProjectDto } from './dto/create-project.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { User } from 'src/common/decorators/user.decorator';
import { UserJWTPayload } from 'src/auth/types';
import { CreateProjectCommentDto } from './dto/create-project-comment.dto';
import { UpdateProjectCommentDto } from './dto/update-project-comment.dto';

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

    @UseGuards(AuthGuard)
    @Get('my-projects')
    getByUserId(@User() user: UserJWTPayload) {
        return this.projectService.getByUserId(user.userId);
    }

    @Get(':id')
    get(@Param('id') id: number) {
        return this.projectService.get(id);
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

    @Get(':id/comment')
    getComments(@Param('id') projectId: number) {
        return this.projectService.getComments(projectId);
    }

    @UseGuards(AuthGuard)
    @Post(':id/comment')
    createComment(
        @Param('id') projectId: number,
        @Body() dto: CreateProjectCommentDto,
        @User() user: UserJWTPayload,
    ) {
        return this.projectService.createComment(projectId, dto, user);
    }

    @UseGuards(AuthGuard)
    @Put(':id/comment')
    updateComment(
        @Param('id') projectId: number,
        @Body() dto: UpdateProjectCommentDto,
        @User() user: UserJWTPayload,
    ) {
        return this.projectService.updateComment(dto, user);
    }
}
