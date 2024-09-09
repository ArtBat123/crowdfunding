import { Controller, HttpStatus, Post, Req, Res } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { Request, Response } from 'express';
import LoginUserDto from './dto/login-user.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('/login')
    async login(@Res() response: Response, @Req() request: Request) {
        const loginUserDto: LoginUserDto = request.body;
        const { ip, headers } = request;

        const { accessToken, refreshToken, user } = await this.authService.login(loginUserDto, {
            fingerprint: 'test',
            ip,
            userAgent: headers['user-agent'],
        });
        this.authService.setCookiesRefreshToken(response, refreshToken);

        response.status(HttpStatus.OK).json({ accessToken, user });
    }

    @Post('/registration')
    async registration(@Res() response: Response, @Req() request: Request) {
        const createUserDto: CreateUserDto = request.body;
        const { ip, headers } = request;

        const { accessToken, refreshToken, user } = await this.authService.registration(
            createUserDto,
            {
                fingerprint: 'test',
                ip,
                userAgent: headers['user-agent'],
            },
        );

        this.authService.setCookiesRefreshToken(response, refreshToken);
        response.status(HttpStatus.OK).json({ accessToken, user });
    }

    @Post('/logout')
    async logout(@Res() response: Response, @Req() request: Request) {
        const refreshToken = request.cookies.refreshToken;
        await this.authService.logout(refreshToken);
        response.clearCookie('refreshToken');

        response.status(HttpStatus.OK).send();
    }

    @Post('/refresh')
    async refresh(@Res() response: Response, @Req() request: Request) {
        const { ip, headers } = request;
        const { accessToken, refreshToken, user } = await this.authService.refresh(
            request.cookies.refreshToken,
            {
                fingerprint: 'test',
                ip,
                userAgent: headers['user-agent'],
            },
        );

        this.authService.setCookiesRefreshToken(response, refreshToken);
        response.status(HttpStatus.OK).json({ accessToken, user });
    }

    @Post('/check')
    async checkAuth(@Req() request: Request) {
        const { ip, headers } = request;

        const isAuth = await this.authService.checkAuth(request.cookies.refreshToken, {
            fingerprint: 'test',
            ip,
            userAgent: headers['user-agent'],
        });

        return { isAuth };
    }
}
