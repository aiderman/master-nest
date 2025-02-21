import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/user.entity'; // Import User entity
import { UserModule } from './user/user.module'; // Import UserModule
import { AuthModule } from './auth/auth.module'; // Import AuthModule

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('DB_HOST'),
        port: +configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        entities: [User], // Daftarkan User entity
        synchronize: false, // Hanya untuk development
      }),
      inject: [ConfigService],
    }),
    UserModule, // Daftarkan UserModule
    AuthModule, // Tambahkan AuthModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }