import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service'; // Mengimpor UserService

// Mock UserService
const mockUserService = {
  findOneByEmail: jest.fn(), // Menambahkan metode yang digunakan di AuthService
  create: jest.fn(),
};

// Mock JwtService
const mockJwtService = {
  sign: jest.fn(), // Tambahkan metode yang diperlukan dari JwtService
};

// Mock UserRepository
const mockUserRepository = {
  findOne: jest.fn(), // Tambahkan metode yang digunakan dalam AuthService
};

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UserService, useValue: mockUserService }, // Menyediakan mock UserService
        { provide: JwtService, useValue: mockJwtService }, // Menyediakan mock JwtService
        { provide: 'UserRepository', useValue: mockUserRepository }, // Mendapatkan mock UserRepository
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // Tambahkan lebih banyak tes sesuai kebutuhan
});