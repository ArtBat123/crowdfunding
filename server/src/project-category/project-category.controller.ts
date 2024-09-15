import { Controller, Get } from '@nestjs/common';
import { ProjectCategoryService } from './project-category.service';

@Controller()
export class ProjectCategoryController {
    constructor(private projectCategoryService: ProjectCategoryService) {}

    @Get('project-categories')
    getCategories() {
        return this.projectCategoryService.getCategories();
    }

    @Get('project-subcategories')
    getSubcategories() {
        return this.projectCategoryService.getSubcategories();
    }
}
