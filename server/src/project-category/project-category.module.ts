import { Module } from '@nestjs/common';
import { ProjectCategoryController } from './project-category.controller';
import { ProjectCategoryService } from './project-category.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectCategory } from './project-category.entity';
import { ProjectSubcategory } from './project-subcategory.entity';

@Module({
    controllers: [ProjectCategoryController],
    providers: [ProjectCategoryService],
    imports: [TypeOrmModule.forFeature([ProjectCategory, ProjectSubcategory])],
})
export class ProjectCategoryModule {}
