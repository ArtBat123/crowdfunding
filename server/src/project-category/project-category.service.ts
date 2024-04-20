import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProjectCategory } from './project-category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProjectCategoryService {
    constructor(
        @InjectRepository(ProjectCategory)
        private projectCategoryRepository: Repository<ProjectCategory>,
    ) {}

    async getCategories() {
        return this.projectCategoryRepository.find({
            relations: { subcategoryList: true },
        });
    }
}
