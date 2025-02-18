import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @UseGuards(LocalAuthGuard) // Gunakan LocalAuthGuard untuk autentikasi
    @Post('login')
    async login(@Request() req) {
        return this.authService.login(req.user); // Kirim user yang sudah divalidasi
    }
}