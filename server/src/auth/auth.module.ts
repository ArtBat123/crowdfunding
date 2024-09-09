import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RefreshSession } from './refresh-session.entity';

@Module({
    providers: [AuthService],
    controllers: [AuthController],
    imports: [
        ConfigModule.forRoot({ envFilePath: '.env' }),
        UsersModule,
        JwtModule,
        TypeOrmModule.forFeature([RefreshSession]),
    ],
    exports: [AuthService, JwtModule],
})
export class AuthModule {}
