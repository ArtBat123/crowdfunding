import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProjectCategory } from './project-category.entity';
import { Repository } from 'typeorm';
import { ProjectSubcategory } from './project-subcategory.entity';

@Injectable()
export class ProjectCategoryService {
    constructor(
        @InjectRepository(ProjectCategory)
        private projectCategoryRepository: Repository<ProjectCategory>,
        @InjectRepository(ProjectSubcategory)
        private projectSubcategoryRepository: Repository<ProjectSubcategory>,
    ) {}

    async getCategories() {
        return this.projectCategoryRepository.find({
            relations: { subcategoryList: true },
        });
    }
    async getSubcategories() {
        return this.projectSubcategoryRepository.find();
    }
}
