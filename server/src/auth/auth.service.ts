import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs';
import LoginUserDto from './dto/login-user.dto';
import RegistrationUserDto from './dto/registration-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { RefreshSession } from './refresh-session.entity';
import { Repository } from 'typeorm';
import appConfig from 'src/app.config';
import { Response } from 'express';
import { AuthSecurityData, JWTPayload } from './types';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,

        @InjectRepository(RefreshSession)
        private refreshSessionRepository: Repository<RefreshSession>,
    ) {}

    async login(loginUserDto: LoginUserDto, authSecurityData: AuthSecurityData) {
        const user = await this.usersService.getUserByEmail(loginUserDto.email);
        if (!user) {
            throw new BadRequestException({ message: 'Пользователя не существует' });
        }

        const isPasswordsEqual = await bcrypt.compare(loginUserDto.password, user.password);
        if (!isPasswordsEqual) {
            throw new BadRequestException({ message: 'Неверный email или пароль' });
        }
        const refreshToken = this.generateRefreshToken(user.id);
        await this.saveRefreshToken({ ...authSecurityData, userId: user.id, refreshToken });
        const { password, ...userWithoutPassword } = user;
        return {
            accessToken: this.generateAccessToken(user.id),
            refreshToken,
            user: userWithoutPassword,
        };
    }

    async registration(
        registrationUserDto: RegistrationUserDto,
        authSecurityData: AuthSecurityData,
    ) {
        const candidate = await this.usersService.getUserByEmail(registrationUserDto.email);
        if (candidate) {
            throw new BadRequestException({ message: 'Пользователь уже зарегистрирован' });
        }

        const hashPassword = await bcrypt.hash(registrationUserDto.password, 5);
        const user = await this.usersService.createUser({
            email: registrationUserDto.email,
            password: hashPassword,
            nickname: registrationUserDto.nickname,
        });

        const refreshToken = this.generateRefreshToken(user.id);
        await this.saveRefreshToken({ ...authSecurityData, userId: user.id, refreshToken });
        const { password, ...userWithoutPassword } = user;
        return {
            accessToken: this.generateAccessToken(user.id),
            refreshToken,
            user: userWithoutPassword,
        };
    }

    async refresh(refreshToken: string, authSecurityData: AuthSecurityData) {
        const decodedData = await this.verifyRefreshToken(refreshToken, authSecurityData);
        const user = await this.usersService.getUserById(decodedData.userId);
        if (!user) {
            throw new BadRequestException({ message: 'Пользователя не существует' });
        }
        const { password, ...userWithoutPassword } = user;
        return {
            accessToken: this.generateAccessToken(decodedData.userId),
            refreshToken,
            user: userWithoutPassword,
        };
    }

    async logout(refreshToken: string) {
        await this.refreshSessionRepository.delete({ refreshToken });
    }

    async checkAuth(refreshToken: string, authSecurityData: AuthSecurityData) {
        try {
            await this.verifyRefreshToken(refreshToken, authSecurityData);
            return true;
        } catch (e) {
            return false;
        }
    }

    setCookiesRefreshToken(response: Response, refreshToken: string) {
        response.cookie('refreshToken', refreshToken, {
            maxAge: appConfig.REFRESH_TOKEN_EXPIRES_IN,
            httpOnly: true,
            path: '/api/auth',
        });
    }

    private generateAccessToken(userId: number) {
        const payload: JWTPayload = { userId };
        return this.jwtService.sign(payload, {
            secret: process.env.JWT_ACCESS_SECRET,
            expiresIn: appConfig.ACCESS_TOKEN_EXPIRES_IN,
        });
    }

    private generateRefreshToken(userId: number) {
        const payload: JWTPayload = { userId };
        return this.jwtService.sign(payload, {
            secret: process.env.JWT_REFRESH_SECRET,
            expiresIn: appConfig.REFRESH_TOKEN_EXPIRES_IN,
        });
    }

    private async saveRefreshToken(refreshSessionData: Omit<RefreshSession, 'id'>) {
        const refreshSession = await this.refreshSessionRepository.findOneBy({
            userId: refreshSessionData.userId,
        });

        return this.refreshSessionRepository.save({
            id: refreshSession?.id,
            ...refreshSessionData,
        });
    }

    private async verifyRefreshToken(refreshToken: string, authSecurityData: AuthSecurityData) {
        if (!refreshToken) {
            throw new UnauthorizedException({ message: 'Пользователь не авторизован' });
        }

        let decodedData: JWTPayload;
        try {
            decodedData = this.jwtService.verify<JWTPayload>(refreshToken, {
                secret: process.env.JWT_REFRESH_SECRET,
            });
        } catch (e) {
            throw new UnauthorizedException({ message: 'Пользователь не авторизован' });
        }

        const refreshSession = await this.refreshSessionRepository.findOneBy({ refreshToken });
        if (
            refreshSession === null ||
            refreshSession.fingerprint !== authSecurityData.fingerprint ||
            refreshSession.ip !== authSecurityData.ip ||
            refreshSession.userAgent !== authSecurityData.userAgent
        ) {
            throw new UnauthorizedException({ message: 'Пользователь не авторизован' });
        }

        return decodedData;
    }
}
