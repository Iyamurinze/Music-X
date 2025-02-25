import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/user/user.service';
import { LoginDTO } from './dto/login.dto';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { ArtistsService } from 'src/artists/artists.service';
import { Enable2FAType, PayloadType } from './types';
import * as speakeasy from 'speakeasy';
import { UpdateResult } from 'typeorm';

@Injectable()
export class AuthService {
    constructor(
        private userService: UsersService,
        private jwtService: JwtService,
        private artistsService: ArtistsService) {}
    async login(loginDTO: LoginDTO): Promise<{ accessToken: string }> {
        const user = await this.userService.findOne(loginDTO); // 1. 

        const passwordMatched = await bcrypt.compare(
            loginDTO.password,
      user.password
      ); 

      if (passwordMatched) {
        
        delete user.password; 
        const payload: PayloadType = { email: user.email, userId: user.id };
        const artist = await this.artistsService.findArtist(user.id); 
        if (artist) {
          
            payload.artistId = artist.id;
          }
      return {
        accessToken: this.jwtService.sign(payload),
};
        } else {
        throw new UnauthorizedException("Password does not match"); 
        }
}
async enable2FA(userId: number) : Promise<Enable2FAType> {

    const user = await this.userService.findById(userId); 
    if (user.enable2FA) { 
    return { secret: user.twoFASecret };
    }
    
    const secret = speakeasy.generateSecret(); 
    console.log(secret);
    user.twoFASecret = secret.base32; 
    await this.userService.updateSecretKey(user.id, user.twoFASecret); 
    return { secret: user.twoFASecret }; 
    }
    async validate2FAToken(
        userId: number,
        token: string,
        ): Promise<{ verified: boolean }> {
        try {
        // find the user on the based on id
        const user = await this.userService.findById(userId);
        // extract his 2FA secret
        // verify the secret with a token by calling the speakeasy verify method
        const verified = speakeasy.totp.verify({
        secret: user.twoFASecret,
        token: token,
        encoding: 'base32',
        });
        // if validated then sends the json web token in the response
        if (verified) {
        return { verified: true };
        } else {
        return { verified: false };
        }
        } catch (err) {
        throw new UnauthorizedException('Error verifying token');
        }
        }
        async disable2FA(userId: number): Promise<UpdateResult> {
            return this.userService.disable2FA(userId);
            }
            
}
