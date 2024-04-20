import { Controller, Get } from '@nestjs/common';
import { ProjectCategoryService } from './project-category.service';

@Controller('project-categories')
export class ProjectCategoryController {
    constructor(private projectCategoryService: ProjectCategoryService) {}

    @Get()
    getCategories() {
        return this.projectCategoryService.getCategories();
    }
}
