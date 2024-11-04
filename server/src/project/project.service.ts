import {
    ConflictException,
    ForbiddenException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { Project } from './project.entity';
import { SaveProjectDto } from './dto/create-project.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { SmartContractService } from 'src/smart-contract/smart-contract.service';
import { UserJWTPayload } from 'src/auth/types';
import { CreateProjectCommentDto } from './dto/create-project-comment.dto';
import { UpdateProjectCommentDto } from './dto/update-project-comment.dto';
import { ProjectComment } from './project-comment.entity';

@Injectable()
export class ProjectService {
    constructor(
        @InjectRepository(Project)
        private projectRepository: Repository<Project>,
        @InjectRepository(ProjectComment)
        private projectCommentRepository: Repository<ProjectComment>,
        private smartContractService: SmartContractService,
    ) {}

    async create(dto: SaveProjectDto, user: UserJWTPayload) {
        const project = await this.projectRepository.findOneBy({ id: dto.id });
        if (project) throw new ConflictException('Проект с таким ID уже существует');

        const newProject = this.projectRepository.create({ ...dto, userId: user.userId });
        return this.projectRepository.save(newProject);
    }

    async update(dto: SaveProjectDto, user: UserJWTPayload) {
        const project = await this.projectRepository.findOneBy({ id: dto.id });
        if (!project) throw new NotFoundException('Проект не найден');
        if (project.userId !== user.userId)
            throw new ForbiddenException('Нет доступа на редактирование данного проекта');

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

    async getNextId() {
        const result = await this.projectRepository.manager.query(
            `select nextval('seq_project_id') as value`,
        );

        return { value: Number(result[0].value) };
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
            queryBuilder = queryBuilder.andWhere(`lower(t.title) like :title`, {
                title: `%${query.search.toLowerCase()}%`,
            });

        if (!query.visibleFinishedProject)
            queryBuilder = queryBuilder.andWhere(`t.finished = :visibleFinishedProject`, {
                visibleFinishedProject: false,
            });

        // Если нужна не первая страница, находим данные для следующей
        if (query.startKey)
            queryBuilder = queryBuilder.andWhere(`t.id < :startKey`, { startKey: query.startKey });

        const projectList = await queryBuilder.orderBy('t.id', 'DESC').limit(query.limit).getMany();

        const projectIdList = projectList.map((item) => item.id);
        const fundsRaisedList =
            await this.smartContractService.getProjectsFundsRaised(projectIdList);

        return {
            data: projectList.map((item, index) => ({
                ...item,
                fundsRaised: fundsRaisedList[index].toString(),
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

    async getComments(projectId: number) {
        return this.projectCommentRepository.find({
            select: { user: { id: true, nickname: true } },
            where: { projectId },
            relations: { user: true },
            order: { createdDate: 'ASC' },
        });
    }

    async createComment(projectId: number, dto: CreateProjectCommentDto, user: UserJWTPayload) {
        const newComment = this.projectCommentRepository.create({
            ...dto,
            user: { id: user.userId },
            projectId,
        });

        return this.projectCommentRepository.save(newComment);
    }

    async updateComment(dto: UpdateProjectCommentDto, user: UserJWTPayload) {
        const comment = await this.projectCommentRepository.findOneBy({ id: dto.id });

        if (!comment) throw new NotFoundException('Комментарий не найден');
        if (comment.user.id !== user.userId)
            throw new ForbiddenException('Нет доступа на редактирование данного комментария');

        this.projectCommentRepository.update({ id: dto.id }, { text: dto.text });
    }
}
