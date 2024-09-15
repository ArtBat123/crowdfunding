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
        return this.projectRepository.save(dto);
    }

    async getAll() {
        return this.projectRepository.find();
    }

    async get(id: number) {
        const fundsRaised = await this.smartContractService.getProjectsFundsRaised([id]);
        const countContributions =
            await this.smartContractService.getContributionsToProjectCount(id);

        const project = await this.projectRepository.findOneBy({ id });
        return {
            ...project,
            fundsRaised: fundsRaised.toString(),
            countContributions: Number(countContributions),
        };
    }
    async getByUserId(userId: number) {
        const projectList = await this.projectRepository.findBy({ userId });
        const projectIdList = projectList.map((item) => item.id);

        const fundsRaisedList =
            await this.smartContractService.getProjectsFundsRaised(projectIdList);

        return projectList.map((item, index) => ({
            ...item,
            fundsRaised: fundsRaisedList[index].toString(),
        }));
    }

    async getWithFilters(query: {
        subcategoriesId?: string[];
        categoriesId?: string[];
        search?: string;
        visibleFinishedProject?: string;
        limit: number;
        startKey?: number;
    }) {
        let queryBuilder = this.projectRepository.createQueryBuilder('t');

        if (query.subcategoriesId)
            queryBuilder = queryBuilder.where('t.subcategoryId in (:...subcategoriesId)', {
                subcategoriesId: query.subcategoriesId,
            });

        if (query.categoriesId)
            queryBuilder = queryBuilder.where('t.categoryId in (:...categoriesId)', {
                categoriesId: query.categoriesId,
            });

        if (query.search)
            queryBuilder = queryBuilder.andWhere(`t.title like :title`, {
                title: `%${query.search}%`,
            });

        if (!query.visibleFinishedProject)
            queryBuilder = queryBuilder.andWhere(`t.finished = :visibleFinishedProject`, {
                visibleFinishedProject: false,
            });

        // Если нужна не первая страница, находим данные для следующей
        if (query.startKey)
            queryBuilder = queryBuilder.andWhere(`t.id < :startKey`, { startKey: query.startKey });

        const projectList = await queryBuilder.orderBy('t.id', 'DESC').limit(query.limit).getMany();

        // const projectIdList = projectList.map((item) => item.id);
        // const fundsRaisedList =
        //     await this.smartContractService.getProjectsFundsRaised(projectIdList);

        return {
            data: projectList.map((item) => ({
                ...item,
                fundsRaised: /*fundsRaisedList[index].toString()*/ '1000',
            })),
            endKey: projectList.at(-1)?.id,
            isLastPage: projectList.length < query.limit,
        };
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
