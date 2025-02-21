import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserService } from './user.service';
import { UserController } from './user.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User])], // Daftarkan User entity
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService], // Ekspor UserService agar bisa digunakan di modul lain
})
export class UserModule { }