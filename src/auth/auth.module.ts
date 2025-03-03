import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt-strategy';
import { PassportModule } from '@nestjs/passport';
import { ArtistModule } from '../artists/artists.module'; 
import { ApiKeyStrategy } from './api-key-strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [UsersModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
      secret: configService.get<string>('secret'),
      signOptions: {
      expiresIn: '1d',
      },
      }),
      inject: [ConfigService],
      }),
  ArtistModule,
],
  providers: [AuthService, JwtModule, JwtStrategy, ApiKeyStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
