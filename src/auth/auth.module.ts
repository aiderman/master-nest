import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/user.entity';
import { JwtStrategy } from './jwt.strategy';
import { UserModule } from '../user/user.module'; // Pastikan ini diimpor

@Module({
  imports: [
    TypeOrmModule.forFeature([User]), // Pastikan untuk mengekspor UserRepository
    UserModule, // Pastikan UserModule diimpor
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWT_SECRET, // Ganti dengan secret dari .env
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService, JwtModule],
})
export class AuthModule { }