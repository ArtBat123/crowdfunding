import { Injectable } from '@nestjs/common';
import { Project } from './project.entity';
import { CreateProjectDto } from './dto/create-project.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { SmartContractService } from 'src/smart-contract/smart-contract.service';

@Injectable()
export class ProjectService {
    constructor(
        @InjectRepository(Project)
        private projectRepository: Repository<Project>,
        private smartContractService: SmartContractService,
    ) {}

    async create(dto: CreateProjectDto) {
        const project = this.projectRepository.create(dto);
        return this.projectRepository.save(project);
    }

    async getAll() {
        return this.projectRepository.find();
    }

    async get(id: number) {
        const fundsRaised =
            await this.smartContractService.getProjectsFundsRaised([id]);
        const countContributions =
            await this.smartContractService.getContributionsToProjectCount(id);

        const project = await this.projectRepository.findOneBy({ id });
        return {
            ...project,
            fundsRaised: fundsRaised.toString(),
            countContributions: Number(countContributions),
        };
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

        const projectList = await queryBuilder.getMany();
        const projectIdList = projectList.map((item) => item.id);

        const fundsRaisedList =
            await this.smartContractService.getProjectsFundsRaised(
                projectIdList,
            );

        return projectList.map((item, index) => ({
            ...item,
            fundsRaised: fundsRaisedList[index].toString(),
        }));
    }

    async updateStory(dto) {
        await this.projectRepository.save({
            id: dto.projectId,
            story: dto.story,
        });
    }

    async updateCreatorEthAddress(dto) {
        await this.projectRepository.save({
            id: dto.projectId,
            creatorEthAddress: dto.creatorEthAddress,
        });
    }
}
