import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity'; // Import User entity
import { UserService } from './user.service';
import { UserController } from './user.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User])], // Daftarkan User entity
  controllers: [UserController],
  providers: [UserService],
  exports: [TypeOrmModule.forFeature([User])], // Ekspor UserRepository
})
export class UserModule {}