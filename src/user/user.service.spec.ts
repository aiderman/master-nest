import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserService } from './user.service';
import { Repository } from 'typeorm';

describe('UserService', () => {
  let service: UserService;
  let userRepository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User), // Mock TypeORM repository
          useValue: {
            findOne: jest.fn(),
            find: jest.fn(),
            create: jest.fn(),
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return a user by email', async () => {
    const mockUser: User = {
      id: 1, // Gantilah dengan ID pengguna sesuai kebutuhan.
      email: 'user@example.com', // Gantilah dengan email pengguna sesuai kebutuhan.
      password: 'yourPassword', // Gantilah dengan password yang sesuai.
      name: 'John Doe' // Pastikan menambahkan properti 'name'.
    };
    jest.spyOn(userRepository, 'findOne').mockResolvedValue(mockUser);

    const result = await service.findOneByEmail('test@example.com');
    expect(result).toEqual(mockUser);
    expect(userRepository.findOne).toHaveBeenCalledWith({ where: { email: 'test@example.com' } });
  });

  it('should return null if user not found', async () => {
    jest.spyOn(userRepository, 'findOne').mockResolvedValue(null);

    const result = await service.findOneByEmail('test@example.com');
    expect(result).toBeNull();
    expect(userRepository.findOne).toHaveBeenCalledWith({ where: { email: 'test@example.com' } });
  });
});