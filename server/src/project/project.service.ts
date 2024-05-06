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
        const project = this.projectRepository.create(dto);
        return this.projectRepository.save(project);
    }

    async getAll() {
        return this.projectRepository.find();
    }

    async get(id) {
        return this.projectRepository.findOneBy({ id });
    }

    async getWithFilters(query) {
        let queryBuilder = this.projectRepository.createQueryBuilder('t');

        if (query.subcategoryId)
            queryBuilder = queryBuilder.where(
                't.subcategoryId in (:...subcategoryId)',
                { subcategoryId: query.subcategoryId },
            );

        if (query.search)
            queryBuilder = queryBuilder.andWhere(`t.title like :title`, {
                title: `%${query.search}%`,
            });

        return await queryBuilder.getMany();
    }

    async updateStory(dto) {
        await this.projectRepository.save({
            id: dto.projectId,
            story: dto.story,
        });
    }
}
