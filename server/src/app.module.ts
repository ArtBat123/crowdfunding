import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ProjectModule } from './project/project.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectCategoryModule } from './project-category/project-category.module';
import { FilesModule } from './files/files.module';
import { ProjectRewardsModule } from './project-rewards/project-rewards.module';
import { BlockchainModule } from './blockchain/blockchain.module';
import { SmartContractModule } from './smart-contract/smart-contract.module';
@Module({
    imports: [
        ConfigModule.forRoot({ envFilePath: '.env' }),
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: process.env.POSTGRES_HOST,
            port: Number(process.env.POSTGRES_PORT),
            username: process.env.POSTGRES_USER,
            password: process.env.POSTGRES_PASSWORD,
            database: process.env.POSTGRES_DB,
            // entities: [User, Project, ProjectSubcategory, ProjectCategory],
            autoLoadEntities: true,
            synchronize: true,
        }),
        AuthModule,
        UsersModule,
        ProjectModule,
        ProjectCategoryModule,
        FilesModule,
        ProjectRewardsModule,
        BlockchainModule,
        SmartContractModule,
    ],
    providers: [],
})
export class AppModule {}
