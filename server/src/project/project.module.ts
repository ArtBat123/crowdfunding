import { Module } from '@nestjs/common';
import { ProjectController } from './project.controller';
import { ProjectService } from './project.service';
import { Project } from './project.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectCategory } from 'src/project-category/project-category.entity';
import { ProjectSubcategory } from 'src/project-category/project-subcategory.entity';
import { SmartContractModule } from 'src/smart-contract/smart-contract.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
    controllers: [ProjectController],
    providers: [ProjectService],
    imports: [
        TypeOrmModule.forFeature([Project, ProjectCategory, ProjectSubcategory]),
        SmartContractModule,
        AuthModule,
    ],
})
export class ProjectModule {}
