import { Injectable } from '@nestjs/common';
import { Project } from './project.entity';
import { CreateProjectDto } from './dto/create-project.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProjectService {
    constructor(
        @InjectRepository(Project)
        private projectRepository: Repository<Project>,
    ) {}

    async create(dto: CreateProjectDto) {
        const project = this.projectRepository.create({
            ...dto,
            category: { id: dto.categoryId },
            subcategory: { id: dto.subcategoryId },
        });
        return this.projectRepository.save(project);
    }

    async getAll() {
        return this.projectRepository.find();
    }

    async get(id) {
        return this.projectRepository.findOneBy({ id });
    }

    async updateStory(dto) {
        await this.projectRepository.save({
            id: dto.projectId,
            story: dto.story,
        });
    }
}
