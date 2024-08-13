import { Module } from '@nestjs/common';
import { ProjectRewardsService } from './project-rewards.service';
import { ProjectRewardsController } from './project-rewards.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from 'src/project/project.entity';
import { ProjectRewards } from './project-rewards.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
    providers: [ProjectRewardsService],
    controllers: [ProjectRewardsController],
    imports: [TypeOrmModule.forFeature([Project, ProjectRewards]), AuthModule],
})
export class ProjectRewardsModule {}
