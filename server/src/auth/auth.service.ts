import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs';
import { User } from 'src/users/users.entity';
import LoginUserDto from './dto/login-user.dto';
import RegistrationUserDto from './dto/registration-user.dto';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ) {}

    async login(loginUserDto: LoginUserDto) {
        const user = await this.usersService.getUserByEmail(loginUserDto.email);
        if (!user) {
            throw new UnauthorizedException({ message: 'Пользователя не существует' });
        }

        const isPasswordsEqual = await bcrypt.compare(loginUserDto.password, user.password);
        if (!isPasswordsEqual) {
            throw new UnauthorizedException({ message: 'Неверный email или пароль' });
        }

        return { accessToken: this.generateToken(user) };
    }

    async registration(registrationUserDto: RegistrationUserDto) {
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

        return { accessToken: this.generateToken(user) };
    }

    private generateToken(user: User) {
        const payload = {
            id: user.id,
            email: user.email,
            nickname: user.nickname,
            roles: user.roles,
        };
        return this.jwtService.sign(payload);
    }
}
