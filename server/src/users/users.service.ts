import { Injectable } from '@nestjs/common';
import { User } from './users.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
    ) {}

    async createUser(dto: CreateUserDto) {
        const user = this.userRepository.create(dto);
        return this.userRepository.save(user);
    }

    async getUserByEmail(email: string) {
        const user = await this.userRepository.findOneBy({ email });
        return user;
    }

    async getUserById(id: number) {
        const user = await this.userRepository.findOneBy({ id });
        return user;
    }
}
