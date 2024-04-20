import {
    HttpException,
    HttpStatus,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs';
import { User } from 'src/users/users.entity';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ) {}

    async login(userDto: CreateUserDto) {
        const user = await this.validateUser(userDto);
        return this.generateToken(user);
    }

    async registration(userDto: CreateUserDto) {
        const candidate = await this.usersService.getUserByEmail(userDto.email);
        if (candidate) {
            throw new HttpException(
                'Пользователь уже зарегистрирован',
                HttpStatus.BAD_REQUEST,
            );
        }

        const hashPassword = await bcrypt.hash(userDto.password, 5);
        const user = await this.usersService.createUser({
            email: userDto.email,
            password: hashPassword,
        });
        return this.generateToken(user);
    }

    private async generateToken(user: User) {
        const payload = { id: user.id, email: user.email };
        return { token: this.jwtService.sign(payload) };
    }

    private async validateUser(userDto: CreateUserDto) {
        const user = await this.usersService.getUserByEmail(userDto.email);

        if (!user) {
            throw new UnauthorizedException({
                message: 'Пользователя не существует',
            });
        }

        const isPasswordsEqual = await bcrypt.compare(
            userDto.password,
            user.password,
        );

        if (isPasswordsEqual) return user;

        throw new UnauthorizedException({
            message: 'Неверный email или пароль',
        });
    }
}
