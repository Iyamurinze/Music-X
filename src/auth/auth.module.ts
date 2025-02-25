import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { authConstants } from './auth.constants';
import { JwtStrategy } from './jwt-strategy';
import { PassportModule } from '@nestjs/passport';
import { ArtistModule } from '../artists/artists.module'; 

@Module({
  imports: [UsersModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({ 
    secret: authConstants.secret, 
    signOptions: { expiresIn: '1d' } 
  }),
  ArtistModule,
],
  providers: [AuthService, JwtModule, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
