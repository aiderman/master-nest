import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/user.entity'; // Import User entity
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) // Menyuntikkan repository
    private userRepository: Repository<User>, // Ini adalah UserRepository yang akan disuntikkan
    private jwtService: JwtService,
  ) { }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userRepository.findOne({ where: { email } });
    if (user && user.password === password) {
      const { password, ...result } = user; // Menghapus password dari result
      return result; // Kembalikan informasi pengguna tanpa password
    }
    return null; // Kembalikan null jika tidak valid
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload), // Mengembalikan token JWT
    };
  }
}