import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Controller('users')
export class UserController {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) { }

    @UseGuards(AuthGuard('jwt'))
    @Get()
    async findAll() {
        return this.userRepository.find();
    }
}