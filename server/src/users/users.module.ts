import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './users.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from './roles.entity';

@Module({
    controllers: [UsersController],
    providers: [UsersService],
    imports: [TypeOrmModule.forFeature([User, Role])],
    exports: [UsersService],
})
export class UsersModule {}
