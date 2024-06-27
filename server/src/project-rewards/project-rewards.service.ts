import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProjectRewards } from './project-rewards.entity';
import { Repository } from 'typeorm';
import { CreateProjectRewardDto } from './dto/create-project-reward.dto';

@Injectable()
export class ProjectRewardsService {
    constructor(
        @InjectRepository(ProjectRewards)
        private projectRewardsRepository: Repository<ProjectRewards>,
    ) {}

    getRewardsByProjectId(projectId: number) {
        return this.projectRewardsRepository.findBy({ projectId });
    }

    create(dto: CreateProjectRewardDto) {
        const projectReward = this.projectRewardsRepository.create(dto);
        return this.projectRewardsRepository.save(projectReward);
    }

    async delete(rewardId: number) {
        await this.projectRewardsRepository.delete({ id: rewardId });
        return rewardId;
    }
}
